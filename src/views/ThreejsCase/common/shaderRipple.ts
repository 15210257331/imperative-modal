import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

interface OptionInterface {
  position: Array<number>
  normal?: boolean // 是否垂直于和圆点的连接线
  color?: string // 颜色
  width?: number // 整体宽高/直径
  segments?: number // 细分数
  opacity?: number // 透明度
  range?: number // 扩散圆环的宽度
  speed?: number // 扩散速度
  seg?: number // 显示圆环数量
  data?: any // 携带的业务数据
}

/**
 * 使用着色器创建的涟漪
 */
export default class ShaderRippleManager {
  rippleGroup: THREE.Group
  constructor() {
    this.rippleGroup = new THREE.Group()
  }

  addRipples(dataList: Array<any>) {
    const ripples = dataList.map((item: OptionInterface) => this.createRipple(item))
    this.rippleGroup.add(...ripples)
  }

  removeAll() {
    this.rippleGroup.children.forEach((item: any) => {
      if (item.type === 'Mesh') {
        this.rippleGroup.remove(item)
        item.geometry.dispose() // 释放几何体的内存
        item.material.dispose() // 释放材质的内存
      }
    })
  }

  createRipple(data: OptionInterface) {
    const { position, normal, color, width, segments, opacity, range, speed, seg } = data
    const geometry = new THREE.PlaneBufferGeometry(width || 6, width || 6, segments || 8, segments || 8)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color || '#ff91c2') },
        uOpacity: { value: opacity || 1 },
        uRange: { value: range || 0.6 }, // 圆环的宽度
        uSpeed: { value: speed || 0.3 }, // 扩散的速度
        uSge: { value: seg || 3 }, // 圆环个数
        uRadius: { value: (width || 6) / 2 },
        time: { value: 0 }
      },
      // opacity:0.5,
      transparent: true,
      side: THREE.DoubleSide,
      // 顶点着色器
      vertexShader: `  
          varying vec2 vUv;
          void main() { 
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
      // 片元着色器
      fragmentShader: `
          varying vec2 vUv;
          // 下面是传进来的变量
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uRange;
          uniform float uSpeed; 
          uniform float uSge;
          uniform float time;
          float PI = 3.14159265;
          float drawCircle(float index, float range) {
              float opacity = 1.0;
              if (index >= 1.0 - range) {
                  opacity = 1.0 - (index - (1.0 - range)) / range;
              } else if(index <= range) {
                  opacity = index / range;
              } 
              return opacity;
          }
          void main() { 
              float iTime = -time * uSpeed;
              float opacity = 0.0;
              float len = distance(vec2(0.5, 0.5), vec2(vUv.x, vUv.y)); 
      
              float size = 1.0 / uSge;
              float rSize = uRange / 2.0;
              vec2 range = vec2(0.7 - rSize, 0.7 + rSize);
              float index = mod(iTime + len, size); 
              // 中心圆 
              vec2 cRadius = vec2(0.06, 0.12); 
              
              if (index < size && len <= 0.5) {   
                  float i = sin(index / size * PI); 
      
                  // 处理边缘锯齿
                  if (i >= range.x && i <= range.y){
                      // 归一
                      float t = (i - range.x) / (range.y - range.x);
                      // 边缘锯齿范围
                      float r = 0.3;
                      opacity = drawCircle(t, r);
                      
                  }
                  // 渐变
                  opacity *=  1.0 - len / 0.5;
              }; 
              
              gl_FragColor = vec4(uColor, uOpacity * opacity);
          }` // 片元着色器
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position[0], position[1], position[2])
    if (normal && normal === true) {
      // 球面法线方向(球心和球面坐标构成的方向向量)
      var coordVec3 = new THREE.Vector3(position[0], position[1], position[2]).normalize()
      // mesh默认在XOY平面上，法线方向沿着z轴
      var meshNormal = new THREE.Vector3(0, 0, 1)
      mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3)
    }
    let tween = new TWEEN.Tween({ index: 0 })
      .to({ index: 10 }, 10000)
      .onUpdate(function (t) {
        let time = Math.ceil(t.index)
        material.uniforms.time.value += 0.01
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
