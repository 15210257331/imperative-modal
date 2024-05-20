import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

// 初始化场景
export const initScene = (bg: THREE.Color | string): THREE.Scene => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(bg)
  return scene
}
// 初始化相机 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 10000：远裁截面
export const initCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(30, width / height, 0.01, 100000)
  return camera
}
// 辅助观察的坐标系
export const initAxesHelper = (length: number = 500) => {
  return new THREE.AxesHelper(length)
}
// 灯光
export const initLight = () => {
  // 半球环境光 天空的反光颜色,地面的反光颜色,光的强度
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3)
  hemiLight.position.set(500, 500, 300)
  // 平行光
  const dirLight = new THREE.DirectionalLight()
  dirLight.position.set(300, 300, 300)
  return { hemiLight, dirLight }
}

// 初始化渲染器
export const initRenderer = (width: number, height: number, el: HTMLElement | undefined) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true }) // 抗锯齿
  renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
  el?.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true // 加载阴影
  return renderer
}

export const initRender2D = (width: number, height: number, el: HTMLElement | undefined) => {
  const renderer2d = new CSS2DRenderer()
  renderer2d.setSize(width, height)
  renderer2d.domElement.style.pointerEvents = 'none';
  renderer2d.domElement.style.position = 'absolute'
  renderer2d.domElement.style.top = '0px'
  renderer2d.domElement.tabIndex = 0
  renderer2d.domElement.className = 'innerRenderer2d'
  el?.appendChild(renderer2d.domElement)
  return renderer2d
}

//  初始化轨道控制器
export const initControls = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  })
  return controls
}
