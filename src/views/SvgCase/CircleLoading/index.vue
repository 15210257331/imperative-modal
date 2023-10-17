<template>
  <svg class="container" height="100" width="100" viewBox="-50 -50 100 100">
    <!--灰色的背景圆环-->
    <circle cx="0" cy="0" r="40" stroke-width="5" fill="none" stroke="rgba(209, 211, 215, 0.5)" />
    <!--蓝色的动态圆环-->
    <circle
      class="progress"
      cx="0"
      cy="0"
      r="40"
      stroke-width="5"
      stroke-linecap="round"
      stroke-dasharray="251"
      fill="none"
    />
  </svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.progress {
  stroke: #f7c223;
  animation: move 2s linear infinite, color-change 2s linear infinite;
}
.container {
  animation: container 2s linear infinite;
}
//给外框也加上旋转动画，两个旋转叠加，效果更自然
@keyframes container {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes move {
  //在改变stroke-dashoffset的同时也让圆环旋转
  0% {
    stroke-dashoffset: 251px;
  }
  50% {
    stroke-dashoffset: calc(251px * 0.2);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 251px;
    transform: rotate(450deg);
  }
}
@keyframes color-change {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}
</style>
