<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import Demo from './Demo/index.vue'

const caseList = ref([
  {
    title: 'Cesium',
    component: markRaw(Demo),
    path: ['CesiumCase/Demo/index']
  }
])
</script>

<style lang="scss" scoped></style>
