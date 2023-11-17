<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import SliceUpload from './SliceUpload/index.vue'
import WorldMap from './WorldMap/index.vue'
import GlobeLine from './GlobeLine/index.vue'

const caseList = ref([
  {
    title: '大文件切片上传',
    component: markRaw(SliceUpload),
    path: ['VueCase/SliceUpload/index']
  },
  // {
  //   title: 'echarts 世界地图',
  //   component: markRaw(WorldMap),
  //   path: ['VueCase/WorldMap/index']
  // },
  // {
  //   title: 'echarts 攻击线地球',
  //   component: markRaw(GlobeLine),
  //   path: ['VueCase/GlobeLine/index']
  // }
])
</script>

<style lang="scss" scoped></style>
