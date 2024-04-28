import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 初始化场景
export const initScene = (): THREE.Scene => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  return scene
}
// 初始化相机 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 10000：远裁截面
export const initCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(30, 1000 / 600, 1, 10000)
  camera.position.set(400, 400, 800)
  camera.lookAt(0, 0, 0)
  return camera
}
// 辅助观察的坐标系
export const initAxesHelper = () => {
  return new THREE.AxesHelper(300)
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

//  初始化轨道控制器
export const initControls = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  })
}
