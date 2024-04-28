import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

//  三维字体
export default function font() {
  // 加载字体文件
  const fontLoader = new FontLoader()
  fontLoader.load('/YouSheBiaoTiHei_Regular.json', function (font) {
    // 创建文本几何体
    const textGeometry = new TextGeometry('张三', {
      font: font,
      size: 4,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5
    })
    // 创建文字材质
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // 创建文字网格对象
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.set(30, 30, 30) // 文字放置在球体边缘
    return textMesh
  })
}
