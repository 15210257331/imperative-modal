import {
  TextureLoader,
  SphereGeometry,
  MeshLambertMaterial,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  LineLoop,
  Group,
  Color,
  MeshBasicMaterial,
} from 'three'
// import { createEarthCloudImageMesh } from "./cloud";
import { earthGlow } from './glow'
import type { City, FlyData } from './types/index'
import worldJson from './data/world.json'
import chinaJson from './data/china.json'
import earthTexture from './img/earth.png'
import { lon2xyz } from './tools'

export const createEarthGroup = (radius: number) => {
  var group = new Group()
  // 贴图地球
  let earthMesh = createGlobe(radius)
  group.add(earthMesh)
  // 各个国家轮廓
  let countryOutline = drawBoundary(radius, worldJson, '#00aaaa')
  group.add(countryOutline)
  // 中国轮廓边界线
  let chinaOutline = drawBoundary(radius + 0.02, chinaJson, '#0000ff')
  group.add(chinaOutline)
  // 大气层效果
  // let glow = earthGlow(radius, earthGlowPng, 3.05)
  // let glowLight = earthGlow(radius, earthGlowLightPng, 3.15)
  // object3D.add(glow)
  // object3D.add(glowLight)
  // 添加城市标注点和飞线
  return group
}

//添加地球贴图的Mesh到场景中
export const createGlobe = (radius: number) => {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new TextureLoader()
  //加载纹理贴图
  var texture = textureLoader.load(earthTexture)
  //创建一个球体几何对象
  var geometry = new SphereGeometry(radius, 96, 96)
  //材质对象Material
  // MeshLambertMaterial  MeshBasicMaterial
  var material = new MeshLambertMaterial({
    map: texture //设置地球0颜色贴图map
  })
  var mesh = new Mesh(geometry, material) //网格模型对象Mesh
  return mesh
}

// pointArr：边界坐标
function line(pointArr: Array<any>, color: string) {
  var geometry = new BufferGeometry() //创建一个Buffer类型几何体对象
  var vertices = new Float32Array(pointArr) //创建顶点数据
  //BufferAttribute这个类用于存储与BufferGeometry相关联的 attribute（例如顶点位置向量，面片索引，法向量，颜色值，UV坐标以及任何自定义 attribute ）。 利用 BufferAttribute，可以更高效的向GPU传递数据。
  var attribue = new BufferAttribute(vertices, 3) //表示一个顶点的xyz坐标
  geometry.attributes.position = attribue // 设置几何体attributes属性的位置属性
  var material = new LineBasicMaterial({
    color: new Color(color),
    linewidth: 3
  })
  var line = new LineLoop(geometry, material) //线条模型对象，首尾顶点连线
  return line
}

// 绘制边界线
function drawBoundary(R, json: any, color: string) {
  var group = new Group()
  json.features.forEach(function (country) {
    if (country.geometry.type === 'Polygon') {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      country.geometry.coordinates = [country.geometry.coordinates]
    }
    country.geometry.coordinates.forEach(polygon => {
      var pointArr: any = [] //边界线顶点坐标
      if (polygon.length > 0) {
        polygon[0].forEach((item: any) => {
          // 经纬度转球面坐标
          var { x, y, z } = lon2xyz(R, item[0], item[1])
          pointArr.push(x, y, z)
        })
      }
      group.add(line(pointArr, color))
    })
  })
  return group
}
