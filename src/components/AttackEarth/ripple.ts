// 地球标记点的涟漪效果
import {
  PlaneBufferGeometry,
  TextureLoader,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  Vector3,
  CircleGeometry,
  RingGeometry,
  Group
} from 'three'
import type { City } from './types/index'
import { lon2xyz } from './tools/index'
import { createLabel } from './label'

export const createRipple = async (radius: number, cityList: Record<string, City>) => {
  let pointArr = []
  let circleArr = []
  let labelArr = []
  for (const cityName in cityList) {
    var city = cityList[cityName]
    var { x, y, z } = lon2xyz(radius, city.longitude, city.latitude)
    // 球面法线方向(球心和球面坐标构成的方向向量)
    var coordVec3 = new Vector3(x, y, z).normalize()
    // mesh默认在XOY平面上，法线方向沿着z轴
    var meshNormal = new Vector3(0, 0, 1)
    // 中心圆点
    const point = new Mesh(
      new CircleGeometry(0.15, 200),
      new MeshBasicMaterial({
        color: 0x22ffcc,
        transparent: true, //使用背景透明的png贴图，注意开启透明计算
        opacity: 1.0,
        side: DoubleSide, //双面可见
        depthWrite: false //禁止写入深度缓冲区数据
      })
    )
    point.position.set(x, y, z)
    point.quaternion.setFromUnitVectors(meshNormal, coordVec3)
    point.name = cityName
    // 外面圆环
    const circle = new Mesh(
      new RingGeometry(0.2, 0.25, 50),
      new MeshBasicMaterial({
        color: 0xffc300,
        transparent: true, //使用背景透明的png贴图，注意开启透明计算
        opacity: 1.0,
        side: DoubleSide, //双面可见
        depthWrite: false //禁止写入深度缓冲区数据
      })
    )
    circle.position.set(x, y, z)
    circle.quaternion.setFromUnitVectors(meshNormal, coordVec3)

    const label = await createLabel(cityName)
    label.position.set(x, y, z)
    label.quaternion.setFromUnitVectors(meshNormal, coordVec3)
    label.name = cityName
    label.material.transparent = true //开启透明计算
    label.material.opacity = 0.0 //完全透明

    pointArr.push(point)
    circleArr.push(circle)
    labelArr.push(label)
  }
  return { pointArr, circleArr, labelArr }
}

/**
 * 数据点的涟漪动画效果
 * 所有波动光圈都有自己的透明度和大小状态一个波动光圈透明度变化过程是：0~1~0反复循环
 * @param circleArr
 */
export const rippleAnimate = circleArr => {
  if (circleArr.length > 0) {
    circleArr.forEach(function (item) {
      //  目标 圆环放大 并 透明
      item._s += 0.01
      item.scale.set(1 * item._s, 1 * item._s, 1 * item._s)
      if (item._s <= 2) {
        item.material.opacity = 2 - item._s
      } else {
        item._s = 1
      }
    })
  }
}
