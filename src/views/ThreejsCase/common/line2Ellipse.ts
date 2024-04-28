import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import * as THREE from 'three'

// 使用line2 实现一个椭圆
export default function line2Ellipse() {
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
    // 线条材质的分辨率，即线条的渲染精度
    resolution: new THREE.Vector2(1000, 1000)
  })
  // material.resolution.set(window.innerWidth, window.innerHeight)
  var line = new Line2(geometry, material)
  line.computeLineDistances()
  return line
}
