<template>
  <svg viewBox="0 0 700 400" width="700" height="400" @click="isFold = !isFold">
    <title>svg clip-path 实现图片展开动画效果</title>
    <defs>
      <clipPath id="cd-image-1">
        <circle id="cd-circle-1" cx="80" cy="160" :r="isFold ? 30 : 1364"></circle>
      </clipPath>
    </defs>
    <image
      height="400px"
      width="700px"
      clip-path="url(#cd-image-1)"
      xlink:href="https://t7.baidu.com/it/u=825057118,3516313570&fm=193&f=GIF"
    ></image>
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isFold = ref<boolean>(true)
</script>

<style lang="scss" scoped>
#cd-image-1 circle {
  transition: all 1s linear;
}
</style>
