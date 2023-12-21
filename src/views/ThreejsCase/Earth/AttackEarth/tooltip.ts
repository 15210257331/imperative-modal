import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer"

export const tag = (name: string) => {
    var div = document.createElement('div')
    div.innerHTML = name
    div.style.padding = '4px 10px'
    div.style.color = '#fff'
    div.style.fontSize = '16px'
    div.style.position = 'absolute'
    div.style.backgroundColor = 'rgba(25,25,25,0.5)'
    div.style.borderRadius = '5px'
    //div元素包装为CSS2模型对象CSS2DObject
    var label = new CSS3DObject(div)
    div.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
    div.style.backfaceVisibility = 'hidden'
    // 设置HTML元素标签在three.js世界坐标中位置
    // label.position.set(x, y, z);
    return label //返回CSS2模型标签
  }
  