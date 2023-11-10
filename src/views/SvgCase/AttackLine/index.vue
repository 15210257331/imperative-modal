<template>
  <p>
    蒙版形状的颜色定义使用蒙版的形状的不透明度。蒙版形状的颜色越接近#ffffff（白色），使用蒙版的形状将越不透明。蒙版形状的颜色越接近#000000（黑色），使用蒙版的形状将越透明。
  </p>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="Gradient">
        <stop offset="0" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="white" stop-opacity="1" />
      </linearGradient>
      <mask id="Mask">
        <circle cx="100" cy="100" r="50" fill="url(#Gradient)" />
      </mask>
    </defs>
    <rect x="0" y="0" width="200" height="200" fill="red" stroke="black" mask="url(#Mask)" />
  </svg>
  <div>this is detail</div>
  <svg width="500" height="120">
    <defs>
      <mask id="mask1" x="0" y="0" width="100" height="100">
        <rect x="0" y="0" width="100" height="50" style="stroke: none; fill: #ffffff" />
      </mask>
    </defs>
    <rect x="1" y="1" width="100" height="100" style="stroke: none; fill: #0000ff; mask: url(#mask1)" />
  </svg>
  <svg>
    <defs>
      <mask id="mask2" x="0" y="0" width="100" height="100">
        <circle cx="25" cy="25" r="25" style="stroke: none; fill: #ffffff" />
      </mask>
    </defs>

    <rect x="1" y="1" width="100" height="100" style="stroke: none; fill: #0000ff; mask: url(#mask2)" />
  </svg>

  <svg width="500" height="500" viewBox="-100 -100 500 500">
    <defs>
      <radialGradient id="gradientColor" fx="90%" fy="50%" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="red" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="red" stop-opacity="0"></stop>
      </radialGradient>
    </defs>
    <path id="path" d="M 0 0 C 0 300 300 300 300 0" fill="transparent" stroke="#66ABFF" stroke-width="2"></path>
    <rect x="-15" y="-2" width="30" height="4" fill="url(#gradientColor)">
      <animateMotion
        dur="30s"
        path="M 0 0 C 0 300 300 300 300 0"
        rotate="auto"
        repeatCount="indefinite"
      ></animateMotion>
    </rect>
    <rect x="-16" y="-2" width="30" height="4" fill="url(#gradientColor)"></rect>
  </svg>

  <div class="attack-wrap">
    <svg width="400" height="300" class="svg-box">
      <defs>
        <path :id="'attackLinePath' + attackId" class="attack-path" :d="attackPath" fill="transparent"></path>
        <radialGradient :id="'attackLineGradient' + attackId" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ccc" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#ccc" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="'attackLineMask' + attackId">
          <circle cx="0" cy="0" r="50" :fill="'url(#attackLineGradient' + attackId + ')'">
            <animateMotion
              :dur="svgConfig.lightDuration"
              :path="attackPath"
              rotate="auto"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>
      </defs>
      <use :stroke-width="svgConfig.border" :xlink:href="'#attackLinePath' + attackId" :stroke="svgConfig.color"></use>
      <use
        :stroke="svgConfig.lightColor"
        :stroke-width="svgConfig.lightBorder"
        :xlink:href="'#attackLinePath' + attackId"
        :mask="'url(#attackLineMask' + attackId + ')'"
      ></use>
    </svg>
    <div class="attack-point to" :style="attackPoint.to">
      <div v-for="item in 3" :key="item" class="light-ripple">
        <div class="light-ripple__top" />
      </div>
      <div class="halo-panel">
        <div class="halo-items">
          <div class="attack-halo flash"></div>
          <div class="attack-halo default"></div>
        </div>
      </div>
    </div>
    <!-- 扩展 -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '攻击线'
  },
  attackId: {
    type: [Number, String], // 攻击线唯一标识
    default: Date.now()
  },
  from: {
    type: Object, // 起点坐标 x,y
    default: () => {}
  },
  to: {
    type: Object, // 终点坐标 x,y
    default: () => {}
  },
  offset: {
    type: Number, // 曲线偏移量
    default: 20
  },
  options: {
    type: Object, // 配置：线宽 border，线颜色 color，流光颜色 lightColor，流光持续时间 lightDuration
    default: () => {}
  }
})

const attackFrom = computed(() => {
  return { x: props.from?.x ?? 20, y: props.from?.y ?? 120 }
})
const attackTo = computed(() => {
  return { x: props.to?.x ?? 360, y: props.to?.y ?? 180 }
})

const attackPath = computed(() => {
  const bezier = `${attackTo.value.x / 2 - props.offset} -${attackTo.value.y / 2 + props.offset}` // 曲线控制点
  return `M${attackFrom.value.x},${attackFrom.value.y} Q${bezier}, ${attackTo.value.x},${attackTo.value.y}` // 二次贝塞尔曲线: M起点 Q控制点 终点
})

const svgConfig = computed(() => {
  return {
    border: props.options?.border || 2, // 线宽
    color: props.options?.color || '#235fa7', // 线颜色
    lightColor: props.options?.lightColor || '#4fd2dd', // 流光颜色
    lightBorder: props.options?.lightBorder || 3, // 流光宽
    lightDuration: props.options?.lightDuration || '3s' // 流光持续时间
  }
})

const attackPoint = computed(() => {
  return {
    from: `left: ${attackFrom.value.x}px; top: ${attackFrom.value.y}px;`,
    to: `left: ${attackTo.value.x}px; top: ${attackTo.value.y}px;`
  }
})
</script>

<style lang="scss" scoped>
.attack-wrap {
  width: 500px;
  height: 300px;
  position: relative;
}
.svg-box {
  width: 100%;
  height: 100%;
  // pointer-events: none;
  position: relative;
}
.attack-path {
  // fill: none;
  // stroke: #ccc;
  // stroke-width: 2;
  // stroke-linecap: round;
  // stroke-dasharray: 0, 1600;
  animation: drawPath 2s 1s ease-in-out both;
}
@keyframes drawPath {
  0% {
    stroke-dasharray: 0, 1600;
  }
  100% {
    stroke-dasharray: 1600, 0;
  }
}
</style>
