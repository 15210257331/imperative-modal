<template>
  <div id="app">
    <div>
      <input type="file" :disabled="status !== Status.wait" @change="handleFileChange" />
      <el-button @click="handleUpload" :disabled="uploadDisabled">upload</el-button>
      <el-button @click="handleResume" v-if="status === Status.pause">resume</el-button>
      <el-button v-else :disabled="status !== Status.uploading || !container.hash" @click="handlePause"
        >pause</el-button
      >
      <el-button @click="handleDelete">delete</el-button>
    </div>
    <div>
      <div>
        <div>calculate chunk hash</div>
        <el-progress :percentage="hashPercentage"></el-progress>
      </div>
      <div>
        <div>percentage</div>
        <el-progress :percentage="fakeUploadPercentage"></el-progress>
      </div>
    </div>
    <el-table :data="data">
      <el-table-column prop="hash" label="chunk hash" align="center"></el-table-column>
      <el-table-column label="size(KB)" align="center" width="120">
        <template v-slot="{ row }">
          {{ row.size | transformByte }}
        </template>
      </el-table-column>
      <el-table-column label="percentage" align="center">
        <template v-slot="{ row }">
          <el-progress :percentage="row.percentage" color="#909399"></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// 切片大小
// chunk size
const SIZE = 10 * 1024 * 1024

const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading'
}
const container = ref({
  file: null,
  hash: '',
  worker: null
})
const hashPercentage = ref(0)
const data = ref([])
const requestList = ref([])
const status = ref(Status.wait)
// 当暂停时会取消 xhr 导致进度条后退
// 为了避免这种情况，需要定义一个假的进度条
// use fake progress to avoid progress backwards when upload is paused
const fakeUploadPercentage = ref<number>(0)

const transformByte = val => {
  return Number((val / 1024).toFixed(0))
}

const uploadDisabled = computed(() => {
  return !container.value.file || [Status.pause, Status.uploading].includes(status.value)
})

const uploadPercentage = computed(() => {
  if (!container.value.file || !data.value.length) return 0
  const loaded = data.value.map(item => item.size * item.percentage).reduce((acc, cur) => acc + cur)
  return parseInt((loaded / container.value.file.size).toFixed(2))
})

watch(
  () => uploadPercentage.value,
  (newValue, oldValue) => {
    if (newValue > fakeUploadPercentage.value) {
      fakeUploadPercentage.value = newValue
    }
  }
)

async function handleDelete() {
  const { data } = await request({ url: 'http://localhost:3000/delete' })
  if (JSON.parse(data).code === 0) {
    $message.success('delete success')
  }
}
function handlePause() {
  status.value = Status.pause
  resetData()
}
function resetData() {
  requestList.value.forEach(xhr => xhr?.abort())
  requestList.value = []
  if (container.value.worker) {
    container.value.worker.onmessage = null
  }
}
async function handleResume() {
  status.value = Status.uploading
  const { uploadedList } = await verifyUpload(container.value.file.name, container.value.hash)
  await uploadChunks(uploadedList)
}
// xhr
function request({ url, method = 'post', data, headers = {}, onProgress = e => e, requestList }) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProgress
    xhr.open(method, url)
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    xhr.send(data)
    xhr.onload = e => {
      // 将请求成功的 xhr 从列表中删除
      // remove xhr which status is success
      if (requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr)
        requestList.splice(xhrIndex, 1)
      }
      resolve({
        data: e.target.response
      })
    }
    // 暴露当前 xhr 给外部
    // export xhr
    requestList?.push(xhr)
  })
}
// 生成文件切片
// create file chunk
function createFileChunk(file, size = SIZE) {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}
// 生成文件 hash（web-worker）
// use web-worker to calculate hash
function calculateHash(fileChunkList) {
  return new Promise(resolve => {
    container.worker = new Worker('/hash.js')
    container.worker.postMessage({ fileChunkList })
    container.worker.onmessage = e => {
      const { percentage, hash } = e.data
      hashPercentage = percentage
      if (hash) {
        resolve(hash)
      }
    }
  })
}
function handleFileChange(e) {
  const [file] = e.target.files
  if (!file) return
  resetData()
  Object.assign($data, $options.data())
  container.file = file
}
async function handleUpload() {
  if (!container.file) return
  status = Status.uploading
  const fileChunkList = createFileChunk(container.file)
  container.hash = await calculateHash(fileChunkList)

  const { shouldUpload, uploadedList } = await verifyUpload(container.file.name, container.hash)
  if (!shouldUpload) {
    $message.success('skip upload：file upload success, check /target directory')
    status = Status.wait
    return
  }

  data = fileChunkList.map(({ file }, index) => ({
    fileHash: container.hash,
    index,
    hash: container.hash + '-' + index,
    chunk: file,
    size: file.size,
    percentage: uploadedList.includes(index) ? 100 : 0
  }))

  await uploadChunks(uploadedList)
}
// 上传切片，同时过滤已上传的切片
// upload chunks and filter uploaded chunks
async function uploadChunks(uploadedList = []) {
  const requestList = data
    .filter(({ hash }) => !uploadedList.includes(hash))
    .map(({ chunk, hash, index }) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', container.file.name)
      formData.append('fileHash', container.hash)
      return { formData, index }
    })
    .map(({ formData, index }) =>
      request({
        url: 'http://localhost:3000',
        data: formData,
        onProgress: createProgressHandler(data[index]),
        requestList: requestList
      })
    )
  await Promise.all(requestList)
  // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时合并切片
  // merge chunks when the number of chunks uploaded before and
  // the number of chunks uploaded this time
  // are equal to the number of all chunks
  if (uploadedList.length + requestList.length === data.length) {
    await mergeRequest()
  }
}
// 通知服务端合并切片
// notify server to merge chunks
async function mergeRequest() {
  await request({
    url: 'http://localhost:3000/merge',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      size: SIZE,
      fileHash: container.hash,
      filename: container.file.name
    })
  })
  $message.success('upload success, check /target directory')
  status = Status.wait
}
// 根据 hash 验证文件是否曾经已经被上传过
// 没有才进行上传
// verify that the file has been uploaded based on the hash
// skip if uploaded
async function verifyUpload(filename, fileHash) {
  const { data } = await request({
    url: 'http://localhost:3000/verify',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      filename,
      fileHash
    })
  })
  return JSON.parse(data)
}
// 用闭包保存每个 chunk 的进度数据
// use closures to save progress data for each chunk
function createProgressHandler(item) {
  return e => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100))
  }
}
</script>
