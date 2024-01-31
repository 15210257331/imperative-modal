import * as THREE from 'three'

interface flyLineBegin2End {
  begin: number[]
  end: number[]
  height: number
}

export default abstract class FlyBase {
  abstract data: Array<flyLineBegin2End> // 传入的数据
  abstract ThreeGroup: THREE.Group // 存放实体

  // 实现的方法
  abstract draw(): THREE.Group // 添加场景
  abstract remove(): void // 移除实体
  abstract animate(): void // 开启动画
}
