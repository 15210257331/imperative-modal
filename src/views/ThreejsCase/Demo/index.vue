<template>
  <div class="demo" ref="demoRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { InitFlyLine } from '../Earth/AttackEarth/tools/flyLine'
import pointPng from '../Earth/AttackEarth/img/point.png'
import FlyLine1 from '../common/flyLineManager'
import FlyLine3 from '../common/flyLine3'
import TWEEN from '@tweenjs/tween.js'
import { initScene, initCamera, initAxesHelper, initLight, initRenderer, initControls } from '../common/base'
import ShaderRippleManager from '../common/shaderRipple'
import line2Ellipse from '../common/line2Ellipse'
import { createEarthOutLine } from '../common/outLine'

const demoRef = ref<HTMLElement>()
var scene: THREE.Scene
var camera: any
var renderer: any
var manager: any = null
const width = 1000
const height = 700

const shaderRippleManager = new ShaderRippleManager()

onMounted(() => {
  scene = initScene('#000000')

  camera = initCamera(width, height)
  camera.position.set(400, 400, 800)
  camera.lookAt(0, 0, 0)

  renderer = initRenderer(width, height, demoRef.value)

  initControls(scene, camera, renderer)

  const { hemiLight, dirLight } = initLight()
  scene.add(hemiLight, dirLight)

  const axesHelper = initAxesHelper()
  scene.add(axesHelper)

  createLine2Ellipse()
  shaderEllipse()
  createFlyLine1()
  createFlyLine3()
  createRipple()

  const earthOutLine = createEarthOutLine()
  scene.add(earthOutLine)

  animate()
})

function createLine2Ellipse() {
  // 基于line2 的椭圆
  const mesh = line2Ellipse()
  scene.add(mesh)
}

function createRipple() {
  const data = [
    {
      position: [10, 50, 100],
      color: 'yellow',
      width: 100
    },
    {
      position: [100, 70, 100],
      color: '#ff0000',
      width: 50
    }
  ]

  shaderRippleManager.addRipples(data)
  scene.add(shaderRippleManager.rippleGroup)
}

// 着色器椭圆打击线
function shaderEllipse() {
  if (manager === null) {
    manager = new InitFlyLine({
      texture: pointPng
    })
  }
  var curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 30, 0),
      new THREE.Vector3(20, -30, 0),
      new THREE.Vector3(0, -40, 0),
      new THREE.Vector3(-20, -30, 0),
      new THREE.Vector3(0, 30, 0)
    ],
    false
  )
  var points = curve.getPoints(2000)
  var flyMesh = manager.addFly({
    curve: points, // 飞线飞线其实是N个点构成的
    color: 'rgba(25, 147, 0, 1)', // 点的颜色
    width: 2, // 点的半径
    length: Math.ceil((points.length * 3) / 5), // 飞线的长度（点的个数）
    speed: 5 + 10, // 飞线的速度
    repeat: Infinity // 循环次数
  })
  console.log(flyMesh)
  // flyMesh.position.set(50, 50, 50)
  scene.add(flyMesh)
}

function createFlyLine1() {
  const data = [
    { from: [0, 0, 0], to: [80, 30, 0], height: 30 },
    { from: [0, 0, 0], to: [-20, 0, 0], height: 10 },
    { from: [0, 0, 0], to: [15, 15, 0], height: 10 }
  ]
  const flyLine = new FlyLine1(data)
  const lineGroup = flyLine.drawLine()
  scene.add(lineGroup)
}

function createFlyLine3() {
  const data = [{ sourcePoint: new THREE.Vector3(0, 0, 0), targetPoint: new THREE.Vector3(100, 1, -50) }]
  const flyLine = new FlyLine3(data)
  flyLine.createMesh()
  scene.add(flyLine.group)
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  if (manager != null) {
    manager.animation()
  }
  renderer.render(scene, camera)
}
</script>

<style lang="scss" scoped>
.demo {
  width: 1000px;
  height: 700px;
}
</style>
