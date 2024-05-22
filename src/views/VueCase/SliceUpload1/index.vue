<template>
  <div style="width: 1200px">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <input type="file" @change="handleFileChange" />
      <el-button-group>
        <el-button type="primary" @click="handleUpload">开始上传</el-button>
        <el-button type="primary" @click="handlePause">暂停上传</el-button>
        <el-button type="primary" @click="handleResume">继续上传</el-button>
      </el-button-group>
    </div>
    <h3>文件切分为{{ chunkList.length }}段，每段上传进度如下：</h3>
    <el-table :data="chunkList" stripe style="width: 100%">
      <el-table-column type="index" label="切片序号" width="100" align="center" />
      <el-table-column type="index" label="切片hash" width="600" align="center">
        <template #default="{ row }">
          <span>{{ row.hash }}</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="切片大小" width="200" align="center">
        <template #default="{ row }">
          <span>{{ formatSizeUnits(row.chunk.size / 1024) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="进度" align="center">
        <template #default="{ row }">
          <el-progress :percentage="row.progress" status="success"></el-progress>
        </template>
      </el-table-column>
    </el-table>
    <h3 style="text-align: right">总进度:{{ sumProgress.toFixed(2) }}%</h3>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { formatSizeUnits } from 'handy-helper'

const CHUNK_SIZE = 1 * 1024 * 1024 // 1M
const chunkList = ref<any[]>([])
const file = ref<any>()
const fileName = ref<string>('')
const fileHash = ref<string>('')
let requestList: any[] = []

const sumProgress = computed(() => {
  if (chunkList.value.length === 0) return 0
  return (chunkList.value.reduce((pre, cur, sum) => pre + cur.progress / 100, 0) * 100) / chunkList.value.length
})

// 选择文件
const handleFileChange = (e: any) => {
  const { files } = e.target
  if (files.length === 0) return
  file.value = files[0]
  fileName.value = files[0].name
  const chunks = splitFile(files[0])
  chunkList.value = chunks
}

// 上传文件
const handleUpload = async e => {
  if (!fileName.value) {
    alert('请先选择文件')
    return
  }
  if (chunkList.value.length === 0) {
    alert('文件拆分中，请稍后...')
    return
  }
  const hash = await calculateFileHash(file.value)
  fileHash.value = hash as string
  const { shouldUpload, uploadedChunkList } = await verifyFileIsExist(hash, getFileSuffix(fileName.value))
  console.log(shouldUpload)
  if (!shouldUpload) {
    return ElMessage({
      message: '文件已存在，无需重复上传',
      type: 'warning'
    })
  }
  let uploadedChunkIndexList = []
  if (uploadedChunkList && uploadedChunkList.length > 0) {
    uploadedChunkIndexList = uploadedChunkList.map((item: any) => {
      const arr = item.split('-')
      return parseInt(arr[arr.length - 1])
    })
    console.log(uploadedChunkIndexList)
    ElMessage({
      message: '已上传的区块号：' + uploadedChunkIndexList.toString(),
      type: 'info'
    })
  }
  const chunksData = chunkList.value
    .map(({ chunk }, index) => ({
      chunk: chunk,
      hash: hash + '-' + index,
      progress: 0
    }))
    .filter(item2 => {
      // 过滤掉已上传的块
      const arr = item2.hash.split('-')
      return uploadedChunkIndexList.indexOf(parseInt(arr[arr.length - 1])) === -1
    })
  console.log(chunksData)
  // 保存分片数据
  chunkList.value = chunksData
  // 开始上传分片
  uploadChunks(chunksData, hash as string)
}

// 暂停上传
const handlePause = () => {
  requestList.map((xhr, index) => {
    xhr?.abort()
    chunkList.value[index].progress = 0
  })
  requestList = []
}

// 恢复上传
const handleResume = () => {
  handleUpload(null)
}

// 上传分片
const uploadChunks = async (chunksData: any, hash: string) => {
  const formDataList = chunksData.map(({ chunk, hash }) => {
    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('hash', hash)
    formData.append('suffix', getFileSuffix(fileName.value))
    return formData
  })

  const requestList = formDataList.map((formData, index) => {
    return request({
      url: 'http://localhost:3001/upload',
      data: formData,
      onprogress: e => {
        let list = [...chunksData]
        list[index].progress = parseInt(String((e.loaded / e.total) * 100))
        chunkList.value = list
      }
    })
  })
  // 上传文件
  Promise.all(requestList).then(() => {
    // 延迟发送合并请求，方便观察服务器合并文件的步骤
    setTimeout(() => {
      mergeRequest(hash)
    }, 1000)
  })
}

// 发送合并请求
const mergeRequest = (hash: string) => {
  const data = {
    // 服务器存储的文件名：hash+文件后缀名
    fileHash: hash,
    suffix: getFileSuffix(fileName.value),
    // 用于服务器合并文件
    size: CHUNK_SIZE
  }
  request({
    url: 'http://localhost:3001/merge',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    onprogress: () => {},
    data: JSON.stringify(data)
  }).then((res: any) => {
    const data = JSON.parse(res.data)
    if (data.message === 'success') {
      ElMessage({
        message: '文件上传成功',
        type: 'success'
      })
    }
  })
}

// 秒传：验证文件是否存在服务器
const verifyFileIsExist = async (fileHash: string, suffix: string) => {
  const { data } = await request({
    url: 'http://localhost:3001/verFileIsExist',
    headers: {
      'content-type': 'application/json'
    },
    onprogress: () => {},
    data: JSON.stringify({
      fileHash: fileHash,
      suffix: suffix
    })
  })
  return JSON.parse(data)
}

const request = ({ url, method = 'post', data, headers = {}, onprogress }) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    xhr.upload.onprogress = onprogress
    xhr.send(data)
    xhr.onload = e => {
      // 提出上传完成的请求
      if (requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr)
        requestList.splice(xhrIndex, 1)
      }
      resolve({
        data: e.target.response
      })
    }
    requestList.push(xhr)
  })
}
// 计算文件hash
function calculateFileHash(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      const fileBuffer = reader.result
      crypto.subtle
        .digest('SHA-256', fileBuffer as ArrayBuffer)
        .then(hashBuffer => {
          const hashArray = Array.from(new Uint8Array(hashBuffer))
          const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
          resolve(hashHex)
        })
        .catch(error => {
          reject(error)
        })
    }
    reader.onerror = function () {
      reject(reader.error)
    }
    reader.readAsArrayBuffer(file)
  })
}

// 获取文件后缀名
const getFileSuffix = (fileName: string) => {
  let arr = fileName.split('.')
  if (arr.length > 0) {
    return arr[arr.length - 1]
  }
  return ''
}

// 文件分片
const splitFile = (file: File, size: number = CHUNK_SIZE) => {
  const chunks = []
  let index = 0
  while (index <= file.size) {
    const chunk = file.slice(index, index + size)
    chunks.push({ chunk: chunk })
    index += size
  }
  return chunks
}
</script>

<style lang="scss" scoped></style>
