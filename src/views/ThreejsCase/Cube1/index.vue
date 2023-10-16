<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted, ref } from 'vue'

const container = ref()

const size = {
  width: 800,
  height: 600
}

// 场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xa0a0a0)

// 辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3)
hemiLight.position.set(500, 500, 300)
scene.add(hemiLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(0, 20, 10)
directionalLight.castShadow = true
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
scene.add(directionalLight)

// ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(400, 400),
  new THREE.MeshPhongMaterial({ color: 0xbbbbbb, depthWrite: false })
)
ground.rotation.x = -Math.PI / 2
ground.receiveShadow = true
scene.add(ground)

const grid = new THREE.GridHelper(400, 20, 0x000000, 0x000000)
grid.material.opacity = 0.2
grid.material.transparent = true
scene.add(grid)

// mesh
const geometry = new THREE.BoxGeometry(40,40,40)
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
mesh.castShadow = true
mesh.position.set(30, 30, 30)
scene.add(mesh)

// 相机
const camera = new THREE.PerspectiveCamera(45, 800 / 500, 1, 2000)
camera.position.set(340, 340, 340)
camera.lookAt(mesh.position)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 500)

function render() {
  if (container.value) {
    container.value.appendChild(renderer.domElement)
  }
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set( 0, 0.5, 0 );
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    // renderer.render(scene, camera); //执行渲染操作
  }) //监听鼠标、键盘事件
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(() => {
  render()
})
</script>

<style lang="scss" scoped></style>
