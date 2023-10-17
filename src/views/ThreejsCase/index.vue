<template>
  <CaseWrap v-for="item in resultCaseList" :key="item.title" :data="item" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CaseWrap from '@/components/CaseWrap.vue'
import Cube from './Cube/index.vue'
import Cube1 from './Cube1/index.vue'

const route = useRoute()

const caseList = ref([
  {
    title: '旋转立方体',
    component: markRaw(Cube),
    path: ['ThreejsCase/Cube/index']
  }
])

const resultCaseList = computed(() => {
  const { keywords } = route.query
  if (keywords) {
    return caseList.value.filter(item => item.title.includes(keywords))
  }
  return caseList.value
})
</script>

<style lang="scss" scoped></style>
