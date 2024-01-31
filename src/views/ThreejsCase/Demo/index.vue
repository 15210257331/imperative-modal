<template>
  <div class="demo" ref="demoRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { InitFlyLine } from '../Earth/AttackEarth/tools/flyLine'
import pointPng from '../Earth/AttackEarth/img/point.png'
import FlyLine from './FlyLine'
import TWEEN from '@tweenjs/tween.js'

const demoRef = ref<HTMLElement>()

var scene: any,
  camera: any,
  renderer: any,
  controls: any,
  manager: any = null
var material: any
const width = 1000
const height = 700

onMounted(() => {
  init()
})
function init() {
  initScene()
  initCamera()
  initRenderer()
  initControls()
  initAxesHelper()
  // ripple()
  // line2Ellipse()
  // shaderEllipse()
  // createFlyLine()
  
  animate()
}
// 场景
function initScene() {
  scene = new THREE.Scene()
}
// 相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(100, 100, 100)
  camera.lookAt(0, 0, 0)
}
// 创建渲染器
function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  demoRef.value?.appendChild(renderer.domElement)
}
// 轨道控制器
function initControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  })
}
// 辅助坐标系
function initAxesHelper() {
  const axesHelper = new THREE.AxesHelper(300)
  scene.add(axesHelper)
}

// 球体
function initSphere() {
  const geometry = new THREE.SphereGeometry(30, 24, 24)
  const material = new THREE.MeshBasicMaterial({ color: 0xffdd00, wireframe: false })
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)
}
// 样条曲线
function curve3() {
  // p1、p3轨迹线起始点坐标
  const p1 = new THREE.Vector3(-100, 0, -100)
  const p3 = new THREE.Vector3(100, 0, 100)
  // 计算p1和p3的中点坐标
  const x2 = (p1.x + p3.x) / 2
  const z2 = (p1.z + p3.z) / 2
  const h = 50
  const p2 = new THREE.Vector3(x2, h, z2)
  const arr = [p1, p2, p3]
  // 三维样条曲线
  const curve = new THREE.CatmullRomCurve3(arr)
  const pointsArr = curve.getPoints(100) //曲线上获取点
  const geometry1 = new THREE.BufferGeometry()
  geometry1.setFromPoints(pointsArr) //读取坐标数据赋值给几何体顶点
  const material1 = new THREE.LineBasicMaterial({ color: 0x00fffff })
  const line = new THREE.Line(geometry1, material1)
  scene.add(line)
}
// 使用line2 实现一个椭圆
function line2Ellipse() {
  var geometry = new LineGeometry()
  var curve = new THREE.CubicBezierCurve(
    new THREE.Vector2(0, 30),
    new THREE.Vector2(30, -30),
    new THREE.Vector2(-30, -30),
    new THREE.Vector2(0, 30)
  )
  // 创建水滴轮廓的几何体
  var points = curve.getPoints(50)
  const positions = []
  for (var j = 0; j < points.length; j++) {
    positions.push(points[j].x, points[j].y, 0)
  }
  // console.log(positions)
  geometry.setPositions(positions)
  var material = new LineMaterial({
    color: 0xfff000,
    linewidth: 10,
    resolution: new THREE.Vector2(width, height)
  })
  // material.resolution.set(window.innerWidth, window.innerHeight)
  var line = new Line2(geometry, material)
  line.computeLineDistances()
  scene.add(line)
}
// 使用着色器创建涟漪
function ripple() {
  // 顶点着色器代码
  const vertexShader = `  
    varying vec2 vUv;
    void main() { 
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`
  // 片元着色器代码
  const fragmentShader = `
  varying vec2 vUv;
  // 下面是传进来的变量
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uRange;
  uniform float uSpeed; 
  uniform float uSge;
  uniform float time;
  float PI = 3.14159265;
  float drawCircle(float index, float range) {
      float opacity = 1.0;
      if (index >= 1.0 - range) {
          opacity = 1.0 - (index - (1.0 - range)) / range;
      } else if(index <= range) {
          opacity = index / range;
      } 
      return opacity;
  }
  void main() { 
      float iTime = -time * uSpeed;
      float opacity = 0.0;
      float len = distance(vec2(0.5, 0.5), vec2(vUv.x, vUv.y)); 

      float size = 1.0 / uSge;
      float rSize = uRange / 2.0;
      vec2 range = vec2(0.7 - rSize, 0.7 + rSize);
      float index = mod(iTime + len, size); 
      // 中心圆 
      vec2 cRadius = vec2(0.06, 0.12); 
      
      if (index < size && len <= 0.5) {   
          float i = sin(index / size * PI); 

          // 处理边缘锯齿
          if (i >= range.x && i <= range.y){
              // 归一
              float t = (i - range.x) / (range.y - range.x);
              // 边缘锯齿范围
              float r = 0.3;
              opacity = drawCircle(t, r);
              
          }
          // 渐变
          opacity *=  1.0 - len / 0.5;
      }; 
      
      gl_FragColor = vec4(uColor, uOpacity * opacity);
  }`
  // 相关的配置参数
  const config = {
    width: 8,
    widthSegments: 8,
    color: 0xff91c2,
    opacity: 1,
    range: 0.5,
    speed: 0.1,
    seg: 3
  }
  const geometry = new THREE.PlaneBufferGeometry(config.width, config.width, config.widthSegments, config.widthSegments)
  // 使用自定义着色器构建材质
  material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(config.color) },
      uOpacity: { value: config.opacity },
      uRange: { value: config.range }, // 圆环的大小
      uSpeed: { value: config.speed }, // 扩散的速度
      uSge: { value: config.seg }, // 圆环个数
      uRadius: { value: config.width / 2 },
      time: { value: 0 }
    },
    // opacity:0.5,
    transparent: true,
    vertexShader: vertexShader, // 顶点着色器
    fragmentShader: fragmentShader, // 片元着色器
    side: THREE.DoubleSide
  })
  // 将材质绘制到一个平面上
  const model1 = new THREE.Mesh(geometry, material)
  model1.position.set(30, 50, 0)
  const model2 = new THREE.Mesh(geometry, material)
  model2.position.set(20, 70, 0)
  scene.add(model1, model2)
}
//  三维字体
function font() {
  // 加载字体文件
  const fontLoader = new FontLoader()
  fontLoader.load('/YouSheBiaoTiHei_Regular.json', function (font) {
    // 创建文本几何体
    const textGeometry = new TextGeometry('张三', {
      font: font,
      size: 4,
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
    textMesh.position.set(30, 30, 30) // 文字放置在球体边缘
    // scene.add(textMesh) // 将文字网格添加到球体上
  })
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
  var points = curve.getPoints(500)
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

function createFlyLine() {
  const data = [
    { begin: [0, 0], end: [10, 0], height: 10 },
    { begin: [0, 0], end: [-20, 0], height: 10 },
    { begin: [0, 0], end: [15, 15], height: 10 }
  ]
  const flyLine = new FlyLine(scene, data)
  scene.add(flyLine.ThreeGroup)
  flyLine.draw()
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  // material.uniforms['time'].value += 0.02
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
../AttackEarth/tools/flyLine
