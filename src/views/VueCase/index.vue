<template>
  <CaseWrap v-for="item in resultCaseList" :key="item.title" :data="item" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CaseWrap from '@/components/CaseWrap.vue'
import SliceUpload from './SliceUpload/index.vue'
import GlobeLine from './GlobeLine/index.vue'
import WorldMap from './WorldMap/index.vue'

const route = useRoute()

const caseList = ref([
  {
    title: '大文件切片上传',
    component: markRaw(SliceUpload),
    path: ['VueCase/SliceUpload/index']
  },
  {
    title: 'echarts 世界地图',
    component: markRaw(WorldMap),
    path: ['VueCase/WorldMap/index']
  },
  {
    title: 'echarts 攻击线地球',
    component: markRaw(GlobeLine),
    path: ['VueCase/GlobeLine/index']
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
