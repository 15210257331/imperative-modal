<template>
  <div class="page" ref="chinaMap"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import * as D3 from 'd3'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import io from 'socket.io-client'
import ShaderRippleManager from '../common/shaderRipple'
import FlyLineManager from '../common/flyLineManager'
import {
  initScene,
  initCamera,
  initAxesHelper,
  initLight,
  initRenderer,
  initRender2D,
  initControls
} from '../common/base'
//引入世界地图的JSON数据
import WorldJSON from '@/assets/json/world.json'
import ChinaJSON from '@/assets/json/china.json'
import HebeiJSON from '@/assets/json/hebei.json'

const socket = io('ws://localhost:4000')
const messages = ref<any>([])
// 监听消息事件
socket.on('notification', message => {
  console.log('推送的数据', message)
  messages.value.push(message)
  createRipple(message)
  createFlyLine1(message)
  createTag(message)
})

const chinaMap = ref<HTMLElement>()
var scene: THREE.Scene
var camera: any
var render: any
var render2D: any
var controls: any
const width = 1200
const height = 800
// d3投影转换函数
const handleProj = D3.geoMercator().center([0, 0]).translate([0, 0])
// 存储地图Object3D对象
const mapContainer = new THREE.Object3D()
// 上次选中的省份
const lastPickedProvince = ref(null)

const rippleManager = new ShaderRippleManager()
const flyLineManager = new FlyLineManager()

onMounted(() => {
  init()
  renderScene()
  createExtrudeMap(WorldJSON, '#4964FD', 12)
  bindEvent()
})

onBeforeUnmount(() => {
  socket.close()
})

function init() {
  scene = initScene('#000000')

  camera = initCamera(width, height)
  camera.position.set(60, -400, 1200)
  camera.lookAt(0, 0, 0)

  render = initRenderer(width, height, chinaMap.value)
  render2D = initRender2D(width, height, chinaMap.value)

  controls = initControls(scene, camera, render)

  const { hemiLight, dirLight } = initLight()
  scene.add(hemiLight, dirLight)

  const axesHelper = initAxesHelper()
  scene.add(axesHelper)
}

function bindEvent() {
  window.addEventListener(
    'mousemove',
    event => {
      const pointer = new THREE.Vector2()
      // 像素坐标=>规范化设备坐标系 [-1,1]
      pointer.x = (event.offsetX / width) * 2 - 1
      pointer.y = -(event.offsetY / height) * 2 + 1
      // 获取鼠标点击的位置生成射线
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(pointer, camera)
      // 获取射线相交的物体集合
      // debugger
      const intersects = raycaster.intersectObjects(mapContainer.children, true)
      if (intersects.length) {
        const pcickedProvice = intersects[0].object
        // 选中了新的省份
        if (lastPickedProvince.value?.properties !== pcickedProvice.properties) {
          // 上次选中的恢复半透明
          if (lastPickedProvince.value) {
            lastPickedProvince.value.material.opacity = 0.5
          }
          pcickedProvice.material.opacity = 1 // 新选中的设置为不透明
          lastPickedProvince.value = pcickedProvice
        }
      } else {
        // 鼠标移开地图，之前选中的省份回复半透明
        if (lastPickedProvince.value) {
          lastPickedProvince.value.material.opacity = 0.5
        }
        lastPickedProvince.value = null
      }
    },
    false
  )
}

function createRipple(data: any[]) {
  const result: any[] = []
  data.forEach(item => {
    const [from_x, from_y] = handleProj(item.from)
    result.push({
      position: [from_x, -from_y, 15],
      color: '#ff0000',
      width: 20,
      ...item
    })
    const [to_x, to_y] = handleProj(item.to)
    result.push({
      position: [to_x, -to_y, 15],
      color: '#fff000',
      width: 20,
      ...item
    })
  })
  rippleManager.removeAll()
  rippleManager.addRipples(result)
  scene.add(rippleManager.rippleGroup)
}

function createFlyLine1(data: any[]) {
  const result = data.map(item => {
    const [from_x, from_y] = handleProj(item.from)
    const [to_x, to_y] = handleProj(item.to)
    return {
      ...item,
      from: [from_x, -from_y, 15],
      to: [to_x, -to_y, 15],
      height: 40
    }
  })
  flyLineManager.removeAll()
  flyLineManager.addLines(result)
  scene.add(flyLineManager.lineGroup)
}

function createExtrudeMap(json: any, color: string, height: number) {
  const featureList = json.features
  featureList.forEach((feature: any) => {
    const province = new THREE.Object3D()
    province.name = feature.properties.name // 省份名称
    const coordinates = feature.geometry.coordinates // 省份坐标信息
    if (feature.geometry.type === 'MultiPolygon') {
      coordinates.forEach((coord: any) => {
        coord.forEach((coordinate: any) => {
          const group = createDepthPolygon(coordinate, color, height)
          const line = createOutLine(coordinate, color, height)
          province.add(group, line)
        })
      })
    }
    if (feature.geometry.type === 'Polygon') {
      coordinates.forEach((coordinate: any) => {
        const group = createDepthPolygon(coordinate, color, height)
        const line = createOutLine(coordinate, color, height)
        province.add(group, line)
      })
    }
    mapContainer.add(province)
  })
  scene.add(mapContainer)
}

function createDepthPolygon(coordinate: any, color: string, height: number) {
  const shape = new THREE.Shape()
  coordinate.forEach((item: any, index: number) => {
    const [x, y] = handleProj(item)
    if (index === 0) {
      shape.moveTo(x, -y)
    } else {
      shape.lineTo(x, -y)
    }
  })
  const geometry = new THREE.ExtrudeBufferGeometry(shape, { depth: height, bevelEnabled: false })
  const material1 = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#43ad7f')
  })
  const material2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#BBCBFE'), // 每个省随机赋色
    transparent: false,
    opacity: 0.9
  })
  const extrudeMesh = new THREE.Mesh(geometry, [material1, material2])
  var group = new THREE.Group()
  group.add(extrudeMesh)
  return group
}

function createOutLine(coordinate: any, color: string, height: number) {
  const points: any[] = []
  coordinate.forEach((item: any) => {
    const [x, y] = handleProj(item)
    points.push(new THREE.Vector3(x, -y, 0))
  })
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
  const line = new THREE.Line(lineGeometry, lineMaterial)
  line.position.z = height + 0.3
  return line
}

function createTag(data: any[]) {
  const result: any[] = []
  data.map(item => {
    var div = document.getElementById('alarm-tooltip')
    sData.value = item.fromName
    var label = new CSS2DObject(div)
    const [from_x, from_y] = handleProj(item.from)
    label.position.set(from_x, -from_y, 50)
    result.push(label)
  })
  scene.add(...result)
}

function renderScene() {
  window.requestAnimationFrame(() => renderScene())
  render.render(scene, camera)
  render2D.render(scene, camera)
}
</script>

<style lang="scss" scoped>
.page {
  width: 1200px;
  height: 800px;
}

</style>
