<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import CaseList from '@/components/CaseList.vue'
import AttackLine from './AttackLine/index.vue'
import SvgClipPath from './SvgClipPath/index.vue'
import Mask from './Mask/index.vue'
import CircleProgressBar from './CircleProgressBar/index.vue'
import LiveBroadcastIcon from './LiveBroadcastIcon/index.vue'
import CircleLoading from './CircleLoading/index.vue'
import TextStroke from './TextStroke/index.vue'

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
</script>

<style lang="scss" scoped></style>
