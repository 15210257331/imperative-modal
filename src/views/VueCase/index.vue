<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import SliceUpload from './SliceUpload/index.vue'

const caseList = ref([
  {
    title: '大文件切片上传',
    component: markRaw(SliceUpload),
    path: ['VueCase/SliceUpload/index']
  }
])
</script>

<style lang="scss" scoped></style>
