import { inject, type Component, computed } from 'vue'
import { useMouse } from '@vueuse/core'
import { DialogOptions, InjectionKey } from './types'

export function useDialog() {
  const { x, y } = useMouse()

  const { dialogReactiveList, createDialog, disposeDialog } = inject<any>(InjectionKey)

  const dialogInstance = computed(() => {
    const index = dialogReactiveList.value.length - 1
    return dialogReactiveList.value[index]
  })

  /**
   * 显示一个弹窗
   * @param options 弹窗配置
   * @returns  Promise
   */
  function create(options: DialogOptions): Promise<any> {
    createDialog({ ...options, pointerX: x.value, pointerY: y.value })
    return dialogInstance.value?.promise
  }

  /**
   * 成功确提醒
   * @param options
   * @returns
   */
  function success(options: DialogOptions): Promise<any> {
    return create({ type: 'success', ...options })
  }

  /**
   * 警告提醒
   * @param options
   * @returns
   */
  function warning(options: DialogOptions): Promise<any> {
    return create({ type: 'warning', ...options })
  }

  /**
   * 失败提醒
   * @param options
   * @returns
   */
  function error(options: DialogOptions): Promise<any> {
    return create({ type: 'error', ...options })
  }

  /**
   * 消息提醒
   * @param options
   * @returns
   */
  function info(options: DialogOptions): Promise<any> {
    return create({ type: 'info', ...options })
  }

  /**
   * 销毁弹窗
   * @param data 向外传递的数据
   */
  function close(data?: any): void {
    if (data) {
      dialogInstance?.value?.resolve(data)
    } else {
      dialogInstance?.value?.reject('取消')
    }
    disposeDialog()
  }

  return { create, info, success, warning, error, close }
}
