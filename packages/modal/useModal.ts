import { inject, type Component, computed } from 'vue'
import { useMouse } from '@vueuse/core'
import { ModalType, ModalOptions, InjectionKey, ProvideContext } from './types'

export function useModal() {
  const { x, y } = useMouse()

  // 使用可选链检查，确保 inject 的安全性，避免 undefined 情况
  const provideContext = inject<ProvideContext>(InjectionKey)

  if (!provideContext) {
    throw new Error('ProvideContext 未提供，请确保在应用中已提供相应的 ProvideContext！')
  }

  const { modalReactiveList, createModal, destroyModal } = provideContext

  const modalRef = computed(() => {
    const index = modalReactiveList.value.length - 1
    return modalReactiveList.value[index]
  })

  function createTypedModal(type: ModalType, options) {
    createModal({ ...options, type, pointerX: x.value, pointerY: y.value })
    return modalRef.value?.promise
  }
  /**
   * 基于type创建不同类型的modal
   * @param options 弹窗配置
   * @returns  Promise
   */
  const create = (options: ModalOptions) => createTypedModal('default', options)
  const success = (options: ModalOptions) => createTypedModal('success', options)
  const warning = (options: ModalOptions) => createTypedModal('warning', options)
  const error = (options: ModalOptions) => createTypedModal('error', options)
  const info = (options: ModalOptions) => createTypedModal('info', options)

  /**
   * 销毁modal
   * @param data 向外传递的数据
   */
  function destroy(data?: any): void {
    if (data) {
      modalRef?.value?.resolve(data)
    } else {
      modalRef?.value?.reject('取消')
    }
    destroyModal()
  }

  return { create, info, success, warning, error, destroy }
}
