<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import SliceUpload from './SliceUpload/index.vue'
import SliceUpload1 from './SliceUpload1/index.vue'
import GradientBorder from './GradientBorder/index.vue'
import Calendar from './Calendar/index.vue'

const caseList = ref([
  {
    title: '日历',
    component: markRaw(Calendar),
    path: ['VueCase/Calendar/index']
  },
  {
    title: '渐变边框',
    component: markRaw(GradientBorder),
    path: ['VueCase/GradientBorder/index']
  },
  {
    title: '大文件切片上传',
    component: markRaw(SliceUpload),
    path: ['VueCase/SliceUpload/index']
  },
  {
    title: '大文件切片上传、秒传、断点续传',
    component: markRaw(SliceUpload1),
    path: ['VueCase/SliceUpload1/index']
  }
])
</script>

<style lang="scss" scoped></style>
