<template>
  <div class="case-wrap">
    <div class="header">
      <div class="title">{{ data.title }}</div>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        @click="handleClick"
      >
        <path d="M438.4 849.1l222.7-646.7c0.2-0.5 0.3-1.1 0.4-1.6L438.4 849.1z" opacity=".224" p-id="8247"></path>
        <path
          d="M661.2 168.7h-67.5c-3.4 0-6.5 2.2-7.6 5.4L354.7 846c-0.3 0.8-0.4 1.7-0.4 2.6 0 4.4 3.6 8 8 8h67.8c3.4 0 6.5-2.2 7.6-5.4l0.7-2.1 223.1-648.3 7.4-21.4c0.3-0.8 0.4-1.7 0.4-2.6-0.1-4.5-3.6-8.1-8.1-8.1zM954.6 502.1c-0.8-1-1.7-1.9-2.7-2.7l-219-171.3c-3.5-2.7-8.5-2.1-11.2 1.4-1.1 1.4-1.7 3.1-1.7 4.9v81.3c0 2.5 1.1 4.8 3.1 6.3l115 90-115 90c-1.9 1.5-3.1 3.8-3.1 6.3v81.3c0 4.4 3.6 8 8 8 1.8 0 3.5-0.6 4.9-1.7l219-171.3c6.9-5.4 8.2-15.5 2.7-22.5zM291.1 328.1l-219 171.3c-1 0.8-1.9 1.7-2.7 2.7-5.4 7-4.2 17 2.7 22.5l219 171.3c1.4 1.1 3.1 1.7 4.9 1.7 4.4 0 8-3.6 8-8v-81.3c0-2.5-1.1-4.8-3.1-6.3l-115-90 115-90c1.9-1.5 3.1-3.8 3.1-6.3v-81.3c0-1.8-0.6-3.5-1.7-4.9-2.7-3.5-7.7-4.1-11.2-1.4z"
        ></path>
      </svg>
    </div>
    <div class="content">
      <component :is="data.component" v-bind="data.props"></component>
    </div>
    <el-dialog v-model="dialogVisible" title="代码展示" width="70%" append-to-body>
      <CodePreview :comp-name="data.path"> </CodePreview>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import CodePreview from './CodePreview.vue'
import { Burger } from '@element-plus/icons-vue'
import { ref } from 'vue'

interface Props {
  data?: any
}
const props = defineProps<Props>()

interface Emits {
  (e: 'showCode', val: boolean): void
}
const emits = defineEmits<Emits>()

const dialogVisible = ref<boolean>(false)

function handleClick() {
  // emits('showCode', true)
  dialogVisible.value = !dialogVisible.value
}
</script>

<style lang="scss" scoped>
.case-wrap {
  height: auto;
  margin: 0 20px 20px 0;
  padding: 12px;
  display: inline-block;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #ededed;
  background-color: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0 0 6px #ccc;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    .title {
      flex: 1;
      text-align: left;
      font-size: 23px;
      font-weight: 500;
      color: #0da9aeaa;
    }
  }
  .content {
    min-width: 320px;
  }
}
</style>
