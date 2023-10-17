import { Ref, type Component } from 'vue'

export const InjectionKey = Symbol('DialogContext')

export interface DialogOptions {
  component?: Component
  type?: string
  // 是否显示遮罩层
  mask?: boolean
  // 标题
  title?: string
  // 宽度
  width?: number
  // 输入属性
  props: {
    [key: string]: any
  }
}

export type DialogReactive = {
  readonly id: string
  pointerX: number
  pointerY: number
} & any

export interface ProvideContext {
  dialogReactiveList: Ref<DialogReactive[]>
  createDialog: (options: DialogOptions) => void
  disposeDialog: () => void
}

//   export const modalContext = () =>
//     inject<Partial<ModalState>>(ModalStateToken, {});
