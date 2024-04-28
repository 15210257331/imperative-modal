import * as THREE from 'three'

// 样条曲线
export default function curve3() {
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
  return line
}
