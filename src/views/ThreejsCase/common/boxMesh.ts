import * as THREE from 'three'

// 创建立方体
export default function createBox() {
  // const texLoader = new THREE.TextureLoader()
  // const texture = texLoader.load(demoTexture)
  // const material = new THREE.MeshLambertMaterial({
  //   // 设置纹理贴图：Texture对象作为材质map属性的属性值
  //   map: texture //map表示材质的颜色贴图属性
  // })
  const geometry = new THREE.BoxGeometry(20, 20, 20)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffcc44,
    transparent: false, //开启透明
    opacity: 1, //设置透明度
    wireframe: false
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
