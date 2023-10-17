<template>
  <svg
    id="object"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 800 800"
    version="1.1"
  >
    <defs>
      <linearGradient id="gradient-1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(0)" x2="800" y2="0">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0" />
        <stop offset="0.25" stop-color="#FFFFFF" stop-opacity="0.25" />
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="1" />
      </linearGradient>
      <linearGradient
        id="gradient"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(0)"
        x1="0"
        x2="100%"
        y1="0"
        y2="0"
      >
        <stop offset="0" stop-color="#000000" stop-opacity="0.5" />
        <stop offset="0.25" stop-color="#FF0000" stop-opacity="0.8" />
        <stop offset="0.5" stop-color="#00ff00" stop-opacity="0.3" />
        <stop offset="0.7" stop-color="#0000FF" stop-opacity="0.8" />
        <stop offset="0.7" stop-color="#0816e4" />
        <stop offset="1" stop-color="#FF5B99" stop-opacity=".5" />
      </linearGradient>
      <mask id="mask-1" maskUnits="userSpaceOnUse">
        <rect width="800" height="300" fill="url(#gradient-1)" />
      </mask>
      <mask id="mask" maskUnits="userSpaceOnUse">
        <rect width="800" height="300" fill="url(#gradient)" />
      </mask>
      <text id="txt" x="400" y="150" font-family="Arial Black" font-size="60" text-anchor="middle">SVG AWESOME</text>
    </defs>
    <!-- 透明度渐变，mask并不改变原图形的颜色 但是可以将透明度应用到元素上 -->
    <use xlink:href="#txt" fill="#FFDD00" mask="url(#mask-1)" />
    <!-- mask未改变图形的颜色 应用了透明度 -->
    <use xlink:href="#txt" y="120" fill="#FFDD00" mask="url(#mask)" />
    <!-- fill颜色填充可以使用url引用渐变等元素，使颜色更加多彩。同时加上了mask的透明度 -->
    <use xlink:href="#txt" y="240" fill="url(#gradient)" mask="url(#mask-1)" />
    <!-- fill颜色填充使用url，使颜色更加多彩。 -->
    <use xlink:href="#txt" y="360" fill="url(#gradient)" />
  </svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  let i = 0
  let gradi_motion = () => {
    //i = i % 90;
    if (i > 200) {
      i = 0
    }
    let gradient = document.getElementById('gradient')
    let gradient1 = document.getElementById('gradient-1')
    gradient1?.setAttribute('gradientTransform', `rotate(-${i})`)
    gradient?.setAttribute('gradientTransform', `translate(${i * 4},0)`)
    i++
    requestAnimationFrame(gradi_motion)
  }
  requestAnimationFrame(gradi_motion)
})
</script>

<style lang="scss" scoped></style>
