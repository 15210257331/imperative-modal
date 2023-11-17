<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import AttackLine from './AttackLine/index.vue'

const caseList = ref([
  {
    title: '飞线',
    component: markRaw(AttackLine),
    path: ['ThreejsCase/AttackLine/index']
  }
])
</script>

<style lang="scss" scoped></style>
