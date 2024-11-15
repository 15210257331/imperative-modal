<template>
  <div style="text-align: left">
    <div style="height: 200px">
      <p style="margin: 20px 0">{{ id }}</p>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="showDialog">打开嵌套的弹窗</el-button>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <el-button type="default" @click="cancel"> 取消</el-button>
      <el-button type="primary" @click="confirm"> 提交</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useModal } from '../../../packages/modal'
import NestDialogDemo from './NestDialogDemo.vue'
import { onBeforeUnmount, onMounted } from 'vue'

const { create, destroy } = useModal()

const props = defineProps({
  id: {
    type: String
  }
})
onMounted(() => {
  console.log('钩子函数 mounted')
})

onBeforeUnmount(() => {
  console.log('钩子函数 unmount')
})

function showDialog() {
  create({ component: NestDialogDemo, width: 300, props: {} })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

function confirm() {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      destroy('这是传出的数据')
    }, 1000)
  })
}

function cancel() {
  destroy()
}
</script>

<style scoped></style>
