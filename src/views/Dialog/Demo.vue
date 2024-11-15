<template>
  <div style="margin-bottom: 20px">
    <h2 class="title">组件示例</h2>
    <el-button type="primary" @click="showDefaultModal">打开一个弹窗</el-button>
    <el-button type="success" @click="showConfirmModal('success')">打开一个success提示框</el-button>
    <el-button type="info" @click="showConfirmModal('info')">打开一个info提示框</el-button>
    <el-button type="warning" @click="showConfirmModal('warning')">打开一个warning提示框</el-button>
    <el-button type="danger" @click="showConfirmModal('error')">打开一个error提示框</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import DemoDialog from './DemoDialog.vue'
import { useModal, type ModalOptions } from '../../../packages/modal'

const modal = useModal()

const options: ModalOptions = {
  component: DemoDialog,
  mask: true,
  title: '这是一个弹窗的标题',
  width: 600,
  props: {
    id: '这是传入的数据'
  }
}

function showConfirmModal(type: string) {
  modal[type]({
    title: '提醒',
    content: '这里是提醒的内容?'
  })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

function showDefaultModal() {
  modal
    .create(options)
    .then(res => {
      console.log(res)
      ElMessage.success(res)
    })
    .catch(err => {
      console.log(err)
      ElMessage.info('弹窗已销毁')
    })
}
</script>

<style scoped></style>
