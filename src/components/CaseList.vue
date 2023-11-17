<template>
  <CaseWrap v-for="item in resultCaseList" :key="item.title" :data="item" />
</template>

<script setup lang="ts">
import CaseWrap from '@/components/CaseWrap.vue'
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Props {
  data: any[]
}
const props = defineProps<Props>()

const resultCaseList = computed(() => {
  const { keywords } = route.query
  if (keywords) {
    return props.data.filter(item => item.title.includes(keywords as string))
  }
  return props.data
})


onMounted(() => {
  // const select_modules = import.meta.globEager('./**/*.vue')
  // Object.keys(select_modules).map(key => {
  //   caseList.value.push({
  //     title: 'alksdjflkajsdf',
  //     component: markRaw(select_modules[key].default),
  //     codePath: formatPath('SvgCase', key)
  //   })
  // })
  // console.log(caseList.value)
})

function formatPath(prefix: string, path: string) {
  const result = path.replace(/\.vue/g, '').replace(/\./g, '')
  return prefix ? prefix + result : result
}

// // 监听当前路由的name变化
// watch(
//   () => route.query,
//   (value: any) => {
//     console.log('query', value)
//     const { keywords } = value
//     if (keywords) {
//       caseList.value = caseList.value.filter(item => item.title.includes(keywords))
//     }
//   },
//   { immediate: true }
// )
</script>

<style lang="scss" scoped></style>
