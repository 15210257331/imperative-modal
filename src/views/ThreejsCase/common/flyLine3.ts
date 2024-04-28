import {
  Vector3,
  Group,
  BufferGeometry,
  LineBasicMaterial,
  Line,
  Points,
  PointsMaterial,
  Color,
  BufferAttribute,
  QuadraticBezierCurve3
} from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { getFunctionExpression } from './helper'
/**
 * 攻击线 样式3  小蝌蚪在一条曲线上运动
 * 使用方式
 *  const data = [{ sourcePoint: new THREE.Vector3(0, 0, 0), targetPoint: new THREE.Vector3(100, 1, - 50) }]
    const flyLine = new FlyLine3(data)
    flyLine.createMesh()
    scene.add(flyLine.group)

    TODO: controlPoint 的计算方式有问题 待优化
 */

export default class FlyLine3 {
  data: Array<any>
  group: THREE.Group
  constructor(data: Array<any>) {
    this.data = data
    this.group = new Group()
  }

  createMesh() {
    this.data.map(item => {
      const { sourcePoint, targetPoint } = item
      const controlPoint = getFunctionExpression(sourcePoint, targetPoint)
      const curve = new QuadraticBezierCurve3(sourcePoint, controlPoint, targetPoint)
      const points = curve.getSpacedPoints(200)
      const pathLine = this.createPathLine(points)

      const tadpoleSize = 40
      const tadpolePointsMesh = this.createShader(points, tadpoleSize)

      this.group.add(pathLine, tadpolePointsMesh)
      this.group.name = 'flyLine'

      let tween = new TWEEN.Tween({ index: 0 })
        .to({ index: points.length - tadpoleSize }, 2000)
        .onUpdate(function (params: any) {
          tadpolePointsMesh.geometry.setFromPoints(points.slice(params.index, params.index + tadpoleSize))
        })
        .repeat(Infinity)
      tween.start()

      return this.group
    })
  }
  createPathLine = (points: Vector3[]) => {
    const geometry = new BufferGeometry().setFromPoints(points)
    const material = new LineBasicMaterial({
      color: '#cd79ff'
    })
    const pathLine = new Line(geometry, material)
    pathLine.name = 'pathLine'
    return pathLine
  }
  createShader = (points: Vector3[], tadpoleSize: number) => {
    // Create the final object to add to the scene
    const geometry = new BufferGeometry()
    const newPoints = points.slice(0, tadpoleSize) //获取更多的点数
    const percentArr = [] //attributes.percent的数据
    for (let i = 0; i < newPoints.length; i++) {
      percentArr.push(i / newPoints.length)
    }
    const colorArr = []
    const color1 = new Color('#fff000') //尾拖线颜色
    const color2 = new Color('#000fff') //飞线蝌蚪头颜色
    for (let i = 0; i < newPoints.length; i++) {
      const color = color1.lerp(color2, i / newPoints.length)
      colorArr.push(color.r, color.g, color.b)
    }
    geometry.setFromPoints(newPoints)
    geometry.attributes.percent = new BufferAttribute(new Float32Array(percentArr), 1)
    geometry.attributes.color = new BufferAttribute(new Float32Array(colorArr), 3)
    const material = new PointsMaterial({
      vertexColors: true, //使用顶点颜色渲染
      size: 3.0 //点大小
    })
    const tadpolePointsMesh = new Points(geometry, material)
    material.onBeforeCompile = function (shader) {
      // 顶点着色器中声明一个attribute变量:百分比
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        [
          'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
          'void main() {'
        ].join('\n') // .join()把数组元素合成字符串
      )
      // 调整点渲染大小计算方式
      shader.vertexShader = shader.vertexShader.replace(
        'gl_PointSize = size;',
        ['gl_PointSize = percent * size;'].join('\n') // .join()把数组元素合成字符串
      )
    }
    tadpolePointsMesh.name = 'tadpolePointsMesh'
    return tadpolePointsMesh
  }
}
