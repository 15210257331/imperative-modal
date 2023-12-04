import {
  PerspectiveCamera,
  DirectionalLight,
  PointLight,
  HemisphereLight,
  AmbientLight,
  Scene,
  WebGLRenderer,
  PCFShadowMap
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
// 经纬度转换成球面坐标
export const lon2xyz = (radius: number, longitude: number, latitude: number) => {
  var lon = (longitude * Math.PI) / 180 //转弧度值
  var lat = (latitude * Math.PI) / 180 //转弧度值
  lon = -lon // three.js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  var x = radius * Math.cos(lat) * Math.cos(lon)
  var y = radius * Math.sin(lat)
  var z = radius * Math.cos(lat) * Math.sin(lon)
  // 返回球面坐标
  return {
    x: x,
    y: y,
    z: z
  }
}

// 初始化渲染器
export const initRender = (width: number, height: number) => {
  let renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.shadowMap.enabled = false
  renderer.shadowMap.type = PCFShadowMap
  renderer.setSize(width, height)
  return renderer
}

// 初始化 CSS2DRenderer
export const initRender3D = (width: number, height: number) => {
  const renderer2d = new CSS3DRenderer()
  renderer2d.setSize(width, height)
  renderer2d.domElement.style.position = 'absolute'
  renderer2d.domElement.style.top = '0px'
  renderer2d.domElement.tabIndex = 0
  renderer2d.domElement.className = 'coreInnerRenderer2d'
  return renderer2d
}

// 相机初始化
export const initCamera = (width: number, height: number) => {
  let aspect = width / height
  let camera = new PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.set(30, 26, 10)
  return camera
}

// 灯光初始化
export const initLight = (scene: Scene) => {
  // 平行光1
  var directionalLight = new DirectionalLight(0x80b5ff, 1)
  directionalLight.position.set(-250, 250, 100)
  scene.add(directionalLight)
  var directionalLight = new DirectionalLight(0x80d4ff, 1)
  directionalLight.position.set(-250, 250, 100)
  scene.add(directionalLight)
  var directionalLight = new DirectionalLight(0x80b5ff, 1)
  directionalLight.position.set(-250, 250, 100)
  scene.add(directionalLight)
  var directionalLight = new DirectionalLight(0xc2ffff, 1)
  directionalLight.position.set(-250, 250, 100)
  scene.add(directionalLight)
  // 点光1
  var pointLight = new PointLight(0x80d4ff, 1)
  pointLight.position.set(-250, 250, 100)
  scene.add(pointLight)
  // 半球光1
  var hemisphereLight = new HemisphereLight(0xffffff, 0x3d6399, 1)
  hemisphereLight.position.set(-250, 250, 100)
  scene.add(hemisphereLight)
  var hemisphereLight = new HemisphereLight(0xffffff, 0x3d6399, 1)
  hemisphereLight.position.set(-250, 250, 100)
  scene.add(hemisphereLight)
  //环境光
  var ambient = new AmbientLight(0x002bff, 0.8)
  scene.add(ambient)
}

// 初始化控制器
export const initOrbitControl = (camera: any, render: any) => {
  const orbitControl = new OrbitControls(camera, render.domElement)
  orbitControl.minZoom = 0.5
  orbitControl.maxZoom = 2
  orbitControl.minPolarAngle = 0
  orbitControl.maxPolarAngle = Math.PI / 2
  orbitControl.enableRotate = true
  orbitControl.enableZoom = true
  orbitControl.zoomSpeed = 0.3
  orbitControl.update()
  // orbitControl.addEventListener('change', function () {
  //   // console.log(camera.position)
  //   render.render(scene, camera) //执行渲染操作
  // })
  return orbitControl
}
