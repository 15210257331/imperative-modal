<template>
  <div style="text-align: left">
    <div style="height: 200px">
      <span>这是嵌套的弹窗</span>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <el-button type="default" @click="cancel"> 取消</el-button>
      <el-button type="primary" @click="confirm"> 提交</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDialog } from '../../../packages/dialog'
import { onBeforeUnmount, onMounted } from 'vue'

const { close } = useDialog()

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

function confirm() {
  close('这是传出的数据')
}

function cancel() {
  close()
}
</script>

<style scoped></style>
