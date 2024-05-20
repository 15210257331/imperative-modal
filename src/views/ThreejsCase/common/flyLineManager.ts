import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

interface flyLineBegin2End {
  from: number[]
  to: number[]
  height: number
}

interface optionsInterface {
  routeColor: string
  flyColor: string
  cycle: number
}
/**
 * 打击线效果1  蝌蚪形状 默认在xy平面上 在z轴正方向
 * 使用方式
 *  import FlyLine1 from '../common/flyLine1'
 *  const data = [
      { begin: [0, 0], end: [80, 30], height: 30 },
      { begin: [0, 0], end: [-20, 0], height: 10 },
      { begin: [0, 0], end: [15, 15], height: 10 }
    ]
    const flyLine = new FlyLine1(data)
    const lineGroup = flyLine.drawLine()
    scene.add(lineGroup)
 */
export default class FlyLineManager {
  cycle: number
  routeColor: string
  flyColor: string
  lineGroup: THREE.Group

  constructor(options?: optionsInterface) {
    this.lineGroup = new THREE.Group()
    this.cycle = options?.cycle || 2000
    this.routeColor = options?.routeColor || '#00FFFF'
    this.flyColor = options?.flyColor || '#FFFF00'
    // this.animate()
  }

  addLines(dataList: Array<flyLineBegin2End>) {
    const lines = dataList.map(item => this.createLine(item))
    this.lineGroup.add(...lines)
  }

  removeAll() {
    this.lineGroup.children.map((item: any) => {
      if (item.type === 'Mesh') {
        this.lineGroup.remove(item)
        item.geometry.dispose() // 释放几何体的内存
        item.material.dispose() // 释放材质的内存
      }
    })
  }

  createLine(data: flyLineBegin2End) {
    const startPoint = data.from // 起始点
    const endPoint = data.to // 终点
    const curveH = data.height // 飞线最大高
    const begin = new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2])
    const center = new THREE.Vector3(
      (startPoint[0] + endPoint[0]) / 2,
      (startPoint[1] + endPoint[1]) / 2,
      (startPoint[2] + endPoint[2]) / 2 + curveH
    )
    const end = new THREE.Vector3(endPoint[0], endPoint[1], endPoint[2])
    const len = begin.distanceTo(end)
    // 创建管道
    const pointInLine = [begin, center, end]
    const lineCurve = new THREE.CatmullRomCurve3(pointInLine)
    const points = lineCurve.getPoints(1000)
    const indexList: number[] = []
    const positionList: number[] = []
    points.forEach((item, index) => {
      indexList.push(index)
    })
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    geometry.setAttribute('aIndex', new THREE.Float32BufferAttribute(indexList, 1))
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new THREE.Color(this.flyColor)
        },
        uTime: {
          value: 0
        },
        uLength: {
          value: points.length
        }
      },
      vertexShader: `
          attribute float aIndex;
          uniform float uTime;
          uniform vec3 uColor;
          varying float vSize;
          void main(){
              vec4 viewPosition = viewMatrix * modelMatrix *vec4(position,1);
              gl_Position = projectionMatrix * viewPosition;

              if(aIndex < uTime + 100.0 && aIndex > uTime - 100.0){
                vSize = (aIndex + 100.0 - uTime) / 60.0;
              } 
              gl_PointSize =vSize;
          }
        `,
      fragmentShader: `
          varying float vSize;
          uniform vec3 uColor;
          void main(){
              if(vSize<=0.0){
                  gl_FragColor = vec4(1,0,0,0);
              }else{
                  gl_FragColor = vec4(uColor,1);
              }
          }
        `,
      transparent: true
    })
    const mesh = new THREE.Points(geometry, material)
    let tween = new TWEEN.Tween({ index: 0 })
      .to({ index: 1000 }, this.cycle)
      .onUpdate(function (t) {
        let id = Math.ceil(t.index)
        material.uniforms.uTime.value = id
      })
      .repeat(Infinity)
    tween.start()
    return mesh
  }

  animate() {
    TWEEN.update()
    requestAnimationFrame(() => {
      this.animate()
    })
  }
}
