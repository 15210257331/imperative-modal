import { Ref, type Component } from 'vue'

export const InjectionKey = Symbol('ModalContext')

// 使用时的配置项
export interface ModalOptions {
  component?: Component

  // 当为confirm类型的modal时 传入的提示内容
  content?: string
  // 是否显示遮罩层
  mask?: boolean
  // 标题
  title?: string
  // 宽度
  width?: number
  // 输入属性
  props?: {
    [key: string]: any
  }
}

export interface FullModalOptions extends ModalOptions {
  // modal的类型
  type?: ModalType
  pointerX: number
  pointerY: number
}

export type ModalType = 'success' | 'warning' | 'error' | 'info' | 'default'

export type ModalReactive = {
  readonly id: string
  pointerX: number
  pointerY: number
} & any

export interface ProvideContext {
  modalReactiveList: Ref<ModalReactive[]>
  createModal: (options: FullModalOptions) => void
  destroyModal: () => void
}

//   export const modalContext = () =>
//     inject<Partial<ModalState>>(ModalStateToken, {});
