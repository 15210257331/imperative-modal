<template>
  <div class="wrap">
    <Use />
    <Demo />
    <CodePreview :comp-path="['dialog/Demo', 'dialog/DemoDialog']" />
    <h2 class="title">配置项</h2>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="arg" label="参数" />
      <el-table-column prop="des" label="描述" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2 class="title">方法</h2>
    <el-table :data="tableData2" style="width: 100%" border>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="des" label="描述" />
      <el-table-column prop="type" label="类型" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import Demo from './Demo.vue'
import CodePreview from '@/components/CodePreview.vue'
import Use from './Use.md'

const tableData = [
  {
    arg: 'mask',
    des: '是否显示蒙层',
    type: 'boolean',
    default: 'true'
  },
  {
    arg: 'title',
    des: '弹窗标题',
    type: 'string',
    default: '""'
  },
  {
    arg: 'width',
    des: '弹窗宽度',
    type: 'number',
    default: '640'
  },
  {
    arg: 'props',
    des: '输入属性',
    type: 'Object',
    default: '{}'
  }
]

const tableData2 = [
  {
    name: 'create',
    des: '打开一个弹窗, component: 弹窗组件,config: 配置项',
    type: '(config: any) => Promise<any>'
  },
  {
    name: 'destroy',
    des: '关闭一个弹窗',
    type: '(data:any) => void'
  },
  {
    name: 'success',
    des: '打开success确认提示弹窗',
    type: '(config: any) => Promise<any>'
  },
  {
    name: 'info',
    des: '打开info确认提示弹窗',
    type: '(config: any) => Promise<any>'
  },
  {
    name: 'warning',
    des: '打开warning确认提示弹窗',
    type: '(config: any) => Promise<any>'
  },
  {
    name: 'error',
    des: '打开error确认提示弹窗',
    type: '(config: any) => Promise<any>'
  }
]
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  background-color: white;
}

.title {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
