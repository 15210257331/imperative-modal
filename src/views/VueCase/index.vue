<template>
  <CaseWrap v-for="item in resultCaseList" :key="item.title" :data="item" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CaseWrap from '@/components/CaseWrap.vue'
import SliceUpload from './SliceUpload/index.vue'

const route = useRoute()

const caseList = ref([
  {
    title: '大文件切片上传',
    component: markRaw(SliceUpload),
    path: ['VueCase/SliceUpload/index']
  }
])

const resultCaseList = computed(() => {
  const { keywords } = route.query
  if (keywords) {
    return caseList.value.filter(item => item.title.includes(keywords as string))
  }
  return caseList.value
})
</script>

<style lang="scss" scoped></style>
