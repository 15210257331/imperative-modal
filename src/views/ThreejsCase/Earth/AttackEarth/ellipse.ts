import { Vector3, BufferGeometry, LineBasicMaterial, CatmullRomCurve3, Line, Vector2, CubicBezierCurve } from 'three'
import type { City } from './types/index'
import { lon2xyz } from './tools/index'

export const createEllipse = (radius: number, cityList: Record<string, City>) => {
  let ellipseArr = []
  for (const cityName in cityList) {
    var city = cityList[cityName]
    var { x, y, z } = lon2xyz(radius + 3, city.longitude, city.latitude)
    // 球面法线方向(球心和球面坐标构成的方向向量)
    var coordVec3 = new Vector3(x, y, z).normalize()
    // mesh默认在XOY平面上，法线方向沿着z轴
    var meshNormal = new Vector3(0, -1, 0)
    var curve = new CubicBezierCurve(new Vector2(0, 3), new Vector2(3, -3), new Vector2(-3, -3), new Vector2(0, 3))
    // 创建水滴轮廓的几何体
    var points = curve.getPoints(50)
    var geometry = new BufferGeometry().setFromPoints(points)
    // 创建材质和线条对象
    var material = new LineBasicMaterial({ color: 0x00ff00 })
    var waterDropOutline = new Line(geometry, material)

    waterDropOutline.position.set(x, y, z)
    waterDropOutline.quaternion.setFromUnitVectors(meshNormal, coordVec3)
    ellipseArr.push(waterDropOutline)
  }
  return { ellipseArr }
}
