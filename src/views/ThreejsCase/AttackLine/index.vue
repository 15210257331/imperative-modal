<template>
  <div class="attackLine" id="attackLine"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { onMounted, ref } from 'vue'
import * as TWEEN from '@tweenjs/tween.js'
import demoTexture from './demo.png'

let scene, camera, renderer, renderer2d, controls

let z = 0

// 圆环网格对象组
const circleYs = []

// 移动物体网格对象组
const moveSpots = []

onMounted(() => {
  initScene()
  initCamera()
  initAxesHelper()
  initLight()
  // createGround()
  initRenderer()
  initControls()
  createBox()
  const line = lineConnect([100, 0, 100], [200, 0, 200])
  scene.add(line)

  // 绑定点击事件
  renderer2d.domElement.addEventListener(
    'click',
    function (event) {
      const px = event.offsetX
      const py = event.offsetY
      //屏幕坐标px、py转WebGL标准设备坐标x、y
      //width、height表示canvas画布宽高度
      const x = (px / 1000) * 2 - 1
      const y = -(py / 600) * 2 + 1
      //创建一个射线投射器`Raycaster`
      const raycaster = new THREE.Raycaster()
      //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
      // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
      //.intersectObjects([mesh1, mesh2, mesh3])对参数中的网格模型对象进行射线交叉计算
      // 未选中对象返回空数组[],选中一个对象，数组1个元素，选中两个对象，数组两个元素
      const intersects = raycaster.intersectObjects(scene.children)
      // intersects.length大于0说明，说明选中了模型
      if (intersects.length > 0) {
        // 选中模型的第一个模型，设置为红色
        // const object = intersects[0].object
        // console.log(object)
        // object.material.color.set(0xffaaaa)
        // var tween = new TWEEN.Tween(object.rotation).to({ x: Math.PI * 2, y: Math.PI * 2 }, 1000).start()
      }
    },
    false
  )

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
  document.getElementById('attackLine')?.appendChild(renderer.domElement)
  renderer.shadowMap.enable = true // 加载阴影

  renderer2d = new CSS2DRenderer()
  renderer2d.setSize(width, height)
  renderer2d.domElement.style.position = 'absolute'
  renderer2d.domElement.style.top = '0px'
  renderer2d.domElement.tabIndex = 0
  renderer2d.domElement.className = 'coreInnerRenderer2d'
  document.getElementById('attackLine')?.appendChild(renderer2d.domElement)
}
// 设置相机控件轨道控制器OrbitControls
function initControls() {
  controls = new OrbitControls(camera, renderer2d.domElement)
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    // renderer.render(scene, camera); //执行渲染操作
  }) //监听鼠标、键盘事件
}
// 创建立方体
function createBox() {
  const texLoader = new THREE.TextureLoader()
  const texture = texLoader.load(demoTexture)
  const material = new THREE.MeshLambertMaterial({
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture //map表示材质的颜色贴图属性
  })
  const geometry = new THREE.BoxGeometry(20, 20, 20)
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0xffcc44,
  //   transparent: false, //开启透明
  //   opacity: 1, //设置透明度
  //   wireframe: true
  // })
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 100; j++) {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.name = 'zhangsan' + i
      mesh.position.x = 50 * i - 200
      mesh.position.y = 10
      mesh.position.z = -50 * j + 200
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

// 创建标签
function createTag(name: string) {
  var div = document.createElement('div')
  div.innerHTML = name
  div.classList.add('tag')
  //div元素包装为CSS2模型对象CSS2DObject
  var label = new CSS2DObject(div)
  div.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  label.position.set(50, 60, 50)
  scene.add(label)
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
  renderer2d.render(scene, camera)
  TWEEN.update()
  camera.position.z -= 1;//相机直线运动动画
  requestAnimationFrame(render)
}
</script>

<style lang="scss" scoped>
.attackLine {
  position: relative;
}
</style>
