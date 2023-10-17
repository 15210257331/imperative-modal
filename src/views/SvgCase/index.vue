<template>
  <CaseWrap v-for="item in resultCaseList" :key="item.title" :data="item" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CaseWrap from '@/components/CaseWrap.vue'
import AttackLine from './AttackLine/index.vue'
import SvgClipPath from './SvgClipPath/index.vue'
import Mask from './Mask/index.vue'
import CircleProgressBar from './CircleProgressBar/index.vue'
import LiveBroadcastIcon from './LiveBroadcastIcon/index.vue'
import CircleLoading from './CircleLoading/index.vue'
import TextStroke from './TextStroke/index.vue'
import CodePreview from '@/components/CodePreview.vue'

const route = useRoute()

const caseList = ref([
  {
    title: 'svg环形进度条',
    component: markRaw(CircleProgressBar),
    path: ['SvgCase/CircleProgressBar/index']
  },
  {
    title: 'svg蒙板实现的文字动效',
    component: markRaw(Mask),
    path: ['SvgCase/Mask/index']
  },
  {
    title: 'svg仿B站直播图标',
    component: markRaw(LiveBroadcastIcon),
    path: ['SvgCase/LiveBroadcastIcon/index']
  },
  {
    title: 'svg实现攻击打击线',
    component: markRaw(AttackLine),
    path: ['SvgCase/AttackLine/index'],
    props: {
      options: {
        color: '#ff3053'
      }
    }
  },
  {
    title: 'svg clipPath 图片动画效果',
    component: markRaw(SvgClipPath),
    path: ['SvgCase/SvgClipPath/index']
  },
  {
    title: '环形加载动画的svg实现',
    component: markRaw(CircleLoading),
    path: ['SvgCase/CircleLoading/index']
  },
  {
    title: '文字描边',
    component: markRaw(TextStroke),
    path: ['SvgCase/TextStroke/index']
  }
])

const resultCaseList = computed(() => {
  const { keywords } = route.query
  if (keywords) {
    return caseList.value.filter(item => item.title.includes(keywords))
  }
  return caseList.value
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
