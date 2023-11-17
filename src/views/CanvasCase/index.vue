<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import Clock from './Clock/index.vue'


const caseList = ref([
  {
    title: 'canvas钟表',
    component: markRaw(Clock),
    path: ['CanvasCase/Clock/index']
  }
])

</script>

<style lang="scss" scoped></style>
