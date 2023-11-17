<template>
  <div class="container" id="scene"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted, ref } from 'vue'

let scene, camera, renderer, controls

// 圆环网格对象组
const circleYs = []

// 移动物体网格对象组
const moveSpots = []

onMounted(() => {
  initScene()
  initCamera()
  initAxesHelper()
  initLight()
  createGround()
  initRenderer()
  initControls()
  createBox()
  const line = lineConnect([100, 0, 100], [200, 0, 200])
  scene.add(line)
  render()
})

// 初始化场景
function initScene() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xa0a0a0)
}
// 初始化相机 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 10000：远裁截面
function initCamera() {
  camera = new THREE.PerspectiveCamera(30, 1000 / 600, 1, 10000)
  camera.position.set(400, 400, 800)
  camera.lookAt(0, 0, 0)
}
// 辅助观察的坐标系
function initAxesHelper() {
  const axesHelper = new THREE.AxesHelper(300)
  scene.add(axesHelper)
}
// 灯光
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

// 初始化渲染器
function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true }) // 抗锯齿
  const width = 1000 //宽度
  const height = 600 //高度
  renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
  document.getElementById('scene')?.appendChild(renderer.domElement)
  renderer.shadowMap.enable = true // 加载阴影
}
// 设置相机控件轨道控制器OrbitControls
function initControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    // renderer.render(scene, camera); //执行渲染操作
  }) //监听鼠标、键盘事件
}
// 创建立方体
function createBox() {
  const geometry = new THREE.BoxGeometry(20, 20, 20)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffcc44,
    transparent: false, //开启透明
    opacity: 1 //设置透明度
  })
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = 50 * i - 200
      mesh.position.y = 10
      mesh.position.z = 50 * j - 200
      scene.add(mesh)
    }
  }
}

// 创建地面
function createGround() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshPhongMaterial({ color: 0xbbbbbb, depthWrite: false })
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const grid = new THREE.GridHelper(800, 10, 0x000000, 0x000000)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  scene.add(grid)
}

/**
 * 两点之间绘制三维贝塞尔曲线
 * */
function lineConnect(posStart, posEnd) {
  const [x0, y0, z0] = posStart
  const [x1, y1, z1] = posEnd
  // 使用QuadraticBezierCurve3() 创建 三维二次贝塞尔曲线
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(x0, y0, z0),
    new THREE.Vector3((x0 + x1) / 2, 60, (z0 + z1) / 2),
    new THREE.Vector3(x1, y1, z1)
  )
  // 绘制 开始位置涟漪
  spotCircle([x0, y0, z0])
  // 绘制 结束位置涟漪
  spotCircle([x1, y1, z1])
  // 绘制移动的小球
  moveSpot(curve)

  const lineGeometry = new THREE.BufferGeometry()
  // 获取曲线 上的50个点
  var points = curve.getPoints(50)
  var positions = []
  var colors = []
  var color = new THREE.Color()
  // 给每个顶点设置演示 实现渐变
  for (var j = 0; j < points.length; j++) {
    color.setHSL(0.81666 + j, 0.88, 0.715 + j * 0.0025) // 粉色
    colors.push(color.r, color.g, color.b)
    positions.push(points[j].x, points[j].y, points[j].z)
  }
  // 放入顶点 和 设置顶点颜色
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3, true))
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3, true))

  const material = new THREE.LineBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })
  const line = new THREE.Line(lineGeometry, material)
  return line
}

/**
 * 生成涟漪
 * */
function spotCircle(spot) {
  // 圆
  const geometry1 = new THREE.CircleGeometry(4, 200)
  // 颜色为红色 双面可见
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
  const circle = new THREE.Mesh(geometry1, material1)
  // 设置位置
  circle.position.set(spot[0], spot[1], spot[2])
  circle.rotateX(Math.PI / 2)
  scene.add(circle)
  // 圆环
  const geometry2 = new THREE.RingGeometry(4, 7, 50)
  // transparent 设置 true 开启透明
  const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true })
  const circleY = new THREE.Mesh(geometry2, material2)
  circleY.position.set(spot[0], spot[1], spot[2])
  circleY.rotateX(Math.PI / 2)
  scene.add(circleY)
  circleYs.push(circleY)
}

/**
 * 线上移动物体
 * */
function moveSpot(curve) {
  // 线上的移动物体
  const aGeo = new THREE.SphereGeometry(4, 4, 4)
  const aMater = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
  const aMesh = new THREE.Mesh(aGeo, aMater)
  // 保存曲线实例
  aMesh.curve = curve
  aMesh._s = 0
  moveSpots.push(aMesh)
  scene.add(aMesh)
}

// 渲染
function render() {
  circleYs.forEach(function (item) {
    //  目标 圆环放大 并 透明
    item._s += 0.01
    item.scale.set(1 * item._s, 1 * item._s, 1 * item._s)
    if (item._s <= 2) {
      item.material.opacity = 2 - item._s
    } else {
      item._s = 1
    }
  })
  moveSpots.forEach(function (item) {
    item._s += 0.006
    let tankPosition = new THREE.Vector3()
    tankPosition = item.curve.getPointAt(item._s % 1)
    item.position.set(tankPosition.x, tankPosition.y, tankPosition.z)
  })
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
</script>

<style lang="scss" scoped></style>
