<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import AttackLine from './AttackLine/index.vue'
import Earth from './Earth/index.vue'
import Demo from './Demo/index.vue'
import ChinaMap from './ChinaMap/index.vue'
const caseList = ref([
  {
    title: '3D中国地图',
    component: markRaw(ChinaMap),
    path: ['ThreejsCase/ChinaMap/index']
  },
  {
    title: '3D文字',
    component: markRaw(Demo),
    path: ['ThreejsCase/Demo/index']
  },
  {
    title: '打击线阵列',
    component: markRaw(AttackLine),
    path: ['ThreejsCase/AttackLine/index']
  },
  {
    title: '打击线地球',
    component: markRaw(Earth),
    path: ['ThreejsCase/Earth/index']
  }
])
</script>

<style lang="scss" scoped></style>
