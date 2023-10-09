<template>
  <Use />
  <h2 class="title">组件示例</h2>
  <CodePreview :comp-name="['dialog/Demo', 'dialog/DemoDialog']">
    <Demo />
  </CodePreview>
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
    name: 'open',
    des: '打开一个弹窗, component: 弹窗组件,config: 配置项',
    type: '(component:Component, config: any) => Promise<any>'
  },
  {
    name: 'close',
    des: '关闭一个弹窗',
    type: '(data:any) => void'
  }
]
</script>

<style lang="scss" scoped>
.title {
  margin-top: 20px;
  margin-bottom:10px;
}
</style>
