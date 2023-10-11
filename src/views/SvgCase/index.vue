<template>
  <CaseWrap title="svg环形进度条">
    <CircleProgressBar />
  </CaseWrap>
  <CaseWrap title="svg 实现攻击打击线">
    <AttackLine :offset="0" :options="{ color: '#ff3053' }" />
  </CaseWrap>
  <CaseWrap title="svg clipPath 图片动画效果">
    <SvgClipPath />
  </CaseWrap>
  <CaseWrap title="svg 蒙板实现的文字动效">
    <Mask />
  </CaseWrap>
</template>

<script setup lang="ts">
import CaseWrap from '@/components/CaseWrap.vue'
import AttackLine from './AttackLine/index.vue'
import SvgClipPath from './SvgClipPath/index.vue'
import Mask from './Mask/index.vue'
import CircleProgressBar from './CircleProgressBar/index.vue'
</script>

<style lang="scss" scoped></style>
