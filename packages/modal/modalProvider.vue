<template>
  <slot></slot>
  <ModalWrap v-for="item in modalInstanceList" :key="item.id" v-bind="item.options">
    <template #default v-if="item.options.type === 'default'">
      <component :is="item.component" v-bind="item.props" />
    </template>
  </ModalWrap>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, ref, toRaw } from 'vue'
import { createId } from 'seemly'
import ModalWrap from './modalWrap.vue'
import { FullModalOptions, ModalReactive, InjectionKey, ProvideContext } from './types'

let zIndex: number = 999
let timeout: any = null
const modalReactiveList = ref<ModalReactive[]>([])

const modalInstanceList = computed(() => {
  return modalReactiveList.value.map(item => {
    const { component, props, ...options } = item
    return {
      id: options.id,
      options,
      props,
      component: toRaw(component)
    }
  })
})

function createModal(options: FullModalOptions): void {
  console.log(options)
  if (timeout) {
    clearTimeout(timeout)
  }
  const dialogId = createId()
  let modalResolve!: (args?: unknown) => void
  let modalReject!: (args?: unknown) => void
  const promise = new Promise((resolve, reject) => {
    modalResolve = resolve
    modalReject = reject
  })
  const modalReactive = {
    ...options,
    id: dialogId,
    visible: false,
    zIndex: zIndex++,
    promise,
    resolve: modalResolve,
    reject: modalReject
  }
  modalReactiveList.value.push(modalReactive)
  console.log(modalReactiveList)
  nextTick(() => {
    const index = modalReactiveList.value.findIndex(item => item.id == dialogId)
    modalReactiveList.value[index].visible = true
  })
}

function destroyModal() {
  const index = modalReactiveList.value.length - 1
  if (index > -1) {
    modalReactiveList.value[index].visible = false
    timeout = setTimeout(() => {
      handleAfterLeave(index)
    }, 300)
  }
}

function handleAfterLeave(index: number): void {
  modalReactiveList.value.splice(index, 1)
}

// 获取显示的最上层的弹窗的key
// function getDialogKey(): string | null {
//   const visibleDialog = dialogReactiveList.value.filter(item => item.visible)
//   return visibleDialog.length > 0 ? visibleDialog[visibleDialog.length - 1] : null
// }

provide<ProvideContext>(InjectionKey, { modalReactiveList, createModal, destroyModal })
</script>
