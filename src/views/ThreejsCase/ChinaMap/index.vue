<template>
  <div class="page" ref="chinaMap"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as D3 from 'd3'
import { ref, onMounted } from 'vue'

import bg from '@/assets/image/bg.png'

//引入世界地图的JSON数据
import WorldJSON from '@/assets/json/world.json'
import ChinaJSON from '@/assets/json/china.json'

const width = 1200
const height = 800

const chinaMap = ref()
const scene = new THREE.Scene() //场景
const camera = new THREE.PerspectiveCamera() //摄像机（透视投影）
const render = new THREE.WebGLRenderer() //渲染器
const controls = new OrbitControls(camera, render.domElement) //创建控件对象

const handleProj = D3.geoMercator().center([50, 34.5]).scale(25).translate([0, 0]) // d3投影转换函数
const mapContainer = new THREE.Object3D() // 存储地图Object3D对象
const lastPickedProvince = ref(null) // 上次选中的省份

onMounted(() => {
  initScene()
  initLight()
  initAxesHelper()

  initGeom({
    json: WorldJSON,
    color: '#00ff00',
    height: 3
  })
  initGeom({
    json: ChinaJSON,
    color: '#00ffff',
    height: 4
  })
  renderScene()
  bindEvent()
})
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

// 初始化场景
function initScene() {
  render.setSize(width, height) // 渲染器设置尺寸
  // 设置背景颜色
  render.setClearColor(new THREE.Color(0x000000)) // 设置背景颜色和透明度
  render.shadowMap.enabled = true // 渲染器允许渲染阴影⭐
  chinaMap.value?.appendChild(render.domElement)
  /**
   * 设置摄像机的属性
   */
  camera.aspect = width / height // 摄像机设置屏幕宽高比
  camera.fov = 45 // 摄像机的视角
  camera.near = 0.01 // 近面距离
  camera.far = 1001 // 远面距离
  camera.position.set(2, 2, 200) // 设置摄像机在threejs坐标系中的位置
  camera.lookAt(0, 0, 0) // 摄像机的指向
  camera.updateProjectionMatrix() // 更新摄像机投影矩阵,在任何参数被改变以后必须被调用
}

// 初始化环境光
function initLight() {
  // 半球环境光 天空的反光颜色,地面的反光颜色,光的强度
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3)
  hemiLight.position.set(500, 500, 300)
  scene.add(hemiLight)
  // 平行光
  const dirLight = new THREE.DirectionalLight()
  dirLight.position.set(300, 300, 300)
  scene.add(dirLight)
}

// 辅助观察的坐标系
function initAxesHelper() {
  const axesHelper = new THREE.AxesHelper(300)
  scene.add(axesHelper)
}

// 创建世界地图
function initGeom({ json, color, height }) {
  const feaureList = json.features
  feaureList.forEach(feature => {
    // 每个feature都代表一个省份
    const province = new THREE.Object3D()
    province.properties = feature.properties.name // 省份名称
    province.name = feature.properties.name // 省份名称
    const coordinates = feature.geometry.coordinates // 省份坐标信息
    if (feature.geometry.type === 'MultiPolygon') {
      coordinates.forEach(coord => {
        coord.forEach(coordinate => {
          const group = creatDepthPolygon(coordinate, color, height)
          // extrudeMesh.properties = feature.properties.name
          province.add(group)
        })
      })
    }
    if (feature.geometry.type === 'Polygon') {
      coordinates.forEach(coordinate => {
        const group = creatDepthPolygon(coordinate, color, height)
        // extrudeMesh.properties = feature.properties.name
        province.add(group)
      })
    }
    mapContainer.add(province)
  })
  scene.add(mapContainer)
}

// 创建三维多边形
function creatDepthPolygon(coordinate, color, height) {
  const shape = new THREE.Shape()
  coordinate.forEach((item, index) => {
    // 每一个item都是MultiPolygon中的一个polygon
    const [x_XYZ, y_XYZ] = handleProj(item)
    if (index === 0) {
      shape.moveTo(x_XYZ, -y_XYZ)
    } else {
      shape.lineTo(x_XYZ, -y_XYZ)
    }
  })
  // 拉伸几何体
  const geometry = new THREE.ExtrudeBufferGeometry(shape, { depth: height, bevelEnabled: false })

  const textureLoader = new THREE.TextureLoader()
  var texture = textureLoader.load(bg) //加载纹理贴图
  //  用于表面的材质
  const material1 = new THREE.MeshBasicMaterial({
    map: texture
  })
  // 用户拉伸截面的材质
  const material2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color), // 每个省随机赋色
    transparent: false,
    opacity: 0.9
  })
  const extrudeMesh = new THREE.Mesh(geometry, [material1, material2])

  // 边界
  const edgesGeometry = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ color: color })
  const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial)
  wireframe.renderOrder = 1 // 设置渲染顺序，确保边缘线在表面上方绘制

  var group = new THREE.Group()
  group.add(extrudeMesh)
  group.add(wireframe)

  return group
}

// 渲染器执行渲染
function renderScene() {
  window.requestAnimationFrame(() => renderScene())
  controls.update()
  render.render(scene, camera)
}
</script>

<style lang="scss" scoped>
.page {
  width: 1200px;
  height: 800px;
}
</style>
