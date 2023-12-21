import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshPhongMaterial } from 'three'

export const createLabel = (name: string): Promise<any> => {
  const loader = new FontLoader()
  return new Promise(resolve => {
    const font = loader.load('/YouSheBiaoTiHei_Regular.json', function (font) {
      const label = new Mesh(
        new TextGeometry(name, {
          font: font,
          size: 0.6, // Float。字体大小，默认值为100。
          height: 0.05, //  Float。挤出文本的厚度。默认值为50。
          curveSegments: 12, // Integer （表示文本的）曲线上点的数量。默认值为12。
          bevelEnabled: true, // Boolean 是否开启斜角，默认为false。
          bevelThickness: 0.01, // Float。文本上斜角的深度，默认值为20。
          bevelSize: 0, // Float。斜角与原始文本轮廓之间的延伸距离。默认值为8。
          bevelSegments: 3 // Integer 斜角的分段数。默认值为3。
        }),
        new MeshBasicMaterial({
          color: 0xffffff
        })
      )
      resolve(label)
    })
  })
}
