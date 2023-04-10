<template>
  <div :style="{height: height+'px', overflow: 'hidden', margin:'0 10px'}">
    <canvas ref="domRef" :width="width" :height="height" style="cursor:pointer" @click="getImgCode"></canvas>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Emits {
  (e: 'update:code', code: string): void;
}
const props = withDefaults(defineProps<{
  code?: string;
  width?: number;
  height?: number;
}>(), {
  code: '',
  width: 150,
  height: 32
})
const emit = defineEmits<Emits>()
const domRef = ref<HTMLCanvasElement>()
const imgCode = ref<string>('')

onMounted(() => {
  getImgCode();
})

function getImgCode() {
  if (!domRef.value) {
    return
  }
  drawImage(domRef.value, props.width, props.height)
}


function randomNum(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min) + min)
  return num
}

function randomColor(min: number, max: number) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

// 使用canvas画验证码图片并且传出验证码的字符串值
function drawImage(dom: HTMLCanvasElement, width: number, height: number) {
  imgCode.value = ''
  const NUMBER_STRING = '0123456789'
  const ctx = dom.getContext('2d')
  if (!ctx) {
    return imgCode.value
  }
  ctx.fillStyle = randomColor(180, 230)
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < 4; i += 1) {
    const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)]
    imgCode.value += text
    const fontSize = randomNum(18, 41)
    const deg = randomNum(-30, 30)
    ctx.font = `${fontSize}px Simhei`
    ctx.textBaseline = 'top'
    ctx.fillStyle = randomColor(80, 150)
    ctx.save()
    ctx.translate(30 * i + 23, 15)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(text, -15 + 5, -15)
    ctx.restore()
  }
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath()
    ctx.moveTo(randomNum(0, width), randomNum(0, height))
    ctx.lineTo(randomNum(0, width), randomNum(0, height))
    ctx.strokeStyle = randomColor(180, 230)
    ctx.closePath()
    ctx.stroke()
  }
  for (let i = 0; i < 41; i += 1) {
    ctx.beginPath()
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = randomColor(150, 200)
    ctx.fill()
  }
  emit('update:code', imgCode.value)
}

function validateCode(value: string) {
  if(!value) {
    return false;
  }
  return value === imgCode.value;
}

defineExpose({ validateCode })
</script>
  
<style lang="scss" scoped></style>
  