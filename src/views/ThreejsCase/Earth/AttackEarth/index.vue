<template>
  <div ref="earthRef" class="earth">
    <div class="tip-container" id="tip-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initRender, initRender3D, initCamera, initLight, initOrbitControl } from './tools'
import { Scene, Color, Group, Object3D, AxesHelper, Raycaster, Vector2 } from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import type { City, FlyData } from './types/index'
import { createRipple, rippleAnimate } from './ripple'
import { createEarthGroup } from './earthGroup'
import { attackLine } from './attackLine'
import { createLabel } from './label'
import { createEllipse } from './ellipse'

interface Props {
  width: number
  height: number
  radius: number
  cityList: Record<string, City>
  lineList: FlyData[]
}
const props = defineProps<Props>()

const earthRef = ref()

let scene, render, render3d, camera, orbitControl, waveMeshArr, manager, earthGroup, circleArray

var object3D = new Object3D()

onMounted(() => {
  init()
})

async function init() {
  scene = new Scene()
  const axesHelper = new AxesHelper(20)
  scene.add(axesHelper)
  scene.background = new Color(0xa0a0a0)
  render = initRender(props.width, props.height)
  // render3d = initRender3D(props.width, props.height)
  earthRef.value.appendChild(render.domElement)
  // earthRef.value.appendChild(render3d.domElement)
  camera = initCamera(props.width, props.height)
  orbitControl = initOrbitControl(camera, render)
  // 地球
  earthGroup = createEarthGroup(props.radius)
  object3D.add(earthGroup)
  // 涟漪效果
  const { pointArr, circleArr, labelArr } = await createRipple(props.radius + 0.06, props.cityList)
  object3D.add(...circleArr)
  object3D.add(...pointArr)
  // object3D.add(...labelArr)
  circleArray = circleArr

  // 椭圆
  const { ellipseArr } = createEllipse(props.radius, props.cityList)
  object3D.add(...ellipseArr)

  // 攻击线
  const { flyManager, group } = attackLine(props.radius, props.lineList, props.cityList)
  object3D.add(group)
  manager = flyManager
  scene.add(object3D)
  console.log(object3D)

  // autoRotateEarth()

  // 事件绑定
  render.domElement.addEventListener('mousemove', event => {
    const px = event.offsetX
    const py = event.offsetY
    const x = (px / props.width) * 2 - 1
    const y = -(py / props.height) * 2 + 1
    const raycaster = new Raycaster()
    raycaster.setFromCamera(new Vector2(x, y), camera)
    const intersects = raycaster.intersectObjects(scene.children)
    let container = document.getElementById('tip-container')
    console.log(px, py)
    //有相交物体时
    if (intersects.length > 0) {
      //其中数组第一个值的 object属性值就是鼠标放在屏幕上离我们最近的模型
      const result = intersects.find(item => item.object.type == 'Mesh' && item.object.name)
      if (result) {
        console.log(result.object)

        container.style.display = 'block'
        container.style.left = event.offsetX + 'px'
        container.style.top = event.offsetY + 'px'
        container.innerHTML = result.object.name
        // const mesh = result.object
        // new TWEEN.Tween({ opacity: mesh.material.opacity })
        //   .to({ opacity: 1.0 }, 100)
        //   .onUpdate(function (obj) {
        //     mesh.material.opacity = obj.opacity
        //   })
        //   .onComplete(function () {
        //     //动画结束：关闭允许透明，恢复到模型原来状态
        //     mesh.material.transparent = false
        //   })
        //   .start()
      }
    } else {
      container.style.display = 'none'
    }
  })
  animate()
}

/**
 * @description: 地球自动旋转
 * @param {*}
 * @return {*}
 */
function autoRotateEarth() {
  const startRotateY = (3.15 * Math.PI) / 2
  const startZoom = -18
  const endRotateY = 3.3 * Math.PI
  const endZoom = 4
  var that = this
  //旋转地球动画
  var rotateEarthStep = new TWEEN.Tween({
    rotateY: startRotateY,
    zoom: startZoom
  })
    .to({ rotateY: endRotateY, zoom: endZoom }, 36000) //.to({rotateY: endRotateY, zoom: endZoom}, 10000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function (object: any) {
      if (object3D) {
        object3D.rotation.set(0, object.rotateY, 0)
      }
      orbitControl.zoom0 = object.zoom < 1 ? 1 : object.zoom
      orbitControl.reset()
    })

  var rotateEarthStepBack = new TWEEN.Tween({
    rotateY: endRotateY,
    zoom: endZoom
  })
    .to({ rotateY: 3.15 * Math.PI * 2, zoom: startZoom }, 36000) //.to({rotateY: endRotateY, zoom: endZoom}, 10000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function (object: any) {
      if (object3D) {
        object3D.rotation.set(0, object.rotateY, 0)
      }
      orbitControl.zoom0 = object.zoom < 1 ? 1 : object.zoom
      orbitControl.reset()
    })
  rotateEarthStep.chain(rotateEarthStepBack)
  rotateEarthStepBack.chain(rotateEarthStep)
  rotateEarthStep.start()
}

/**
 * @description: 帧变化需要做的动画
 * @param {*}
 * @return {*}
 */
function animate() {
  rippleAnimate(circleArray)
  requestAnimationFrame(animate)
  //只是自转，不需要缩放到中国
  //   if (this.earth3dObj) {
  //     if (this.earthConfig.autoRotate && !this.earthConfig.zoomChina) {
  //       this.earth3dObj.rotation.y += 0.01
  //     }
  //   }
  render.render(scene, camera)
  // this.renderer3d.render(this.scene, this.camera)
  TWEEN.update()
  //飞线更新，这句话一定要有
  if (manager != null) {
    manager.animation()
  }
}
</script>

<style lang="scss" scoped>
.earth {
  position: relative;
}

.tip-container {
  width: 90px;
  height: 70px;
  border-radius: 4px;
  border: 1px solid white;
  background-color: rgba(237, 232, 232, 0.617);
  text-align: center;
  position: absolute;
  z-index: 99;
  display: none;
}
</style>
