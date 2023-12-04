<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import WorldMap from './WorldMap/index.vue'
import GlobeLine from './GlobeLine/index.vue'

const caseList = ref([
  {
    title: 'echarts 世界地图',
    component: markRaw(WorldMap),
    path: ['EchartsCase/WorldMap/index']
  },
  {
    title: 'echarts 攻击线地球',
    component: markRaw(GlobeLine),
    path: ['EchartsCase/GlobeLine/index']
  }
])
</script>

<style lang="scss" scoped></style>
