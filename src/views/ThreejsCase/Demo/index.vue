<template>
  <div class="demo" ref="demoRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const demoRef = ref<HTMLElement>()
onMounted(() => {
  const width = 1000
  const height = 700
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  demoRef.value?.appendChild(renderer.domElement)
  const controls = new OrbitControls(camera, renderer.domElement)
  const axesHelper = new THREE.AxesHelper(300)
  scene.add(axesHelper)

  // 创建球体
  const geometry = new THREE.SphereGeometry(2, 24, 24)
  const material = new THREE.MeshBasicMaterial({ color: 0xffdd00, wireframe: true })
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  // 加载字体文件
  const fontLoader = new FontLoader()
  fontLoader.load('/YouSheBiaoTiHei_Regular.json', function (font) {
    // 创建文本几何体
    const textGeometry = new TextGeometry('张三', {
      font: font,
      size: 0.4,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5
    })
    // 创建文字材质
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // 创建文字网格对象
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    // 将文字网格对象放置在球体表面
    // const radius = 2 // 球体半径
    // const circumference = Math.PI * 2 * radius // 球体周长
    // const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x // 文字宽度
    // const angleOffset = (textWidth / circumference) * Math.PI * 2 // 角度偏移量
    // textMesh.rotation.y = -angleOffset // 文字偏移
    // textMesh.position.set(radius, 0, 0) // 文字放置在球体边缘
    scene.add(textMesh) // 将文字网格添加到球体上

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate)
      sphere.rotation.y += 0.01 // 球体旋转
      renderer.render(scene, camera)
    }

    animate() // 开始渲染循环
  })
})
</script>

<style lang="scss" scoped>
.demo {
  width: 1000px;
  height: 700px;
}
</style>
