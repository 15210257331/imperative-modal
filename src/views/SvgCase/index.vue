<template>
  <CaseWrap title="svg 实现攻击打击线">
    <AttackLine :offset="0" :options="{ color: '#ff3053' }" />
  </CaseWrap>
  <CaseWrap title="svg clipPath 图片动画效果">
    <SvgClipPath />
  </CaseWrap>
</template>

<script setup lang="ts">
import CaseWrap from '@/components/CaseWrap.vue'
import AttackLine from './AttackLine/index.vue'
import SvgClipPath from './SvgClipPath/index.vue'
</script>

<style lang="scss" scoped></style>
