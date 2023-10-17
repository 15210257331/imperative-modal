<template>
  <slot></slot>
  <DialogContainer v-for="item in dialogList" :key="item.id" v-bind="item.options">
    <template #confirm v-if="item.options.type === 'info'"> 这是确认框的内容 </template>
    <template #default v-else>
      <component :is="item.component" v-bind="item.props" />
    </template>
  </DialogContainer>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, ref, toRaw } from 'vue'
import { createId } from 'seemly'
import DialogContainer from './DialogContainer.vue'
import { DialogOptions, DialogReactive, InjectionKey, ProvideContext } from './types'

let zIndex: number = 999
let timeout: any = null
const dialogReactiveList = ref<DialogReactive[]>([])

function createDialog(options: any): void {
  if (timeout) {
    clearTimeout(timeout)
  }
  const dialogId = createId()
  let dialogResolve!: (args?: unknown) => void
  let dialogReject!: (args?: unknown) => void
  const promise = new Promise((resolve, reject) => {
    dialogResolve = resolve
    dialogReject = reject
  })
  const dialogReactive = {
    ...options,
    id: dialogId,
    visible: false,
    zIndex: zIndex++,
    promise,
    resolve: dialogResolve,
    reject: dialogReject
  }
  dialogReactiveList.value.push(dialogReactive)
  nextTick(() => {
    const index = dialogReactiveList.value.findIndex(item => item.id == dialogId)
    dialogReactiveList.value[index].visible = true
  })
}

function disposeDialog() {
  const index = dialogReactiveList.value.length - 1
  if (index > -1) {
    dialogReactiveList.value[index].visible = false
    timeout = setTimeout(() => {
      handleAfterLeave(index)
    }, 300)
  }
}

function handleAfterLeave(index: number): void {
  dialogReactiveList.value.splice(index, 1)
}

// 获取显示的最上层的弹窗的key
// function getDialogKey(): string | null {
//   const visibleDialog = dialogReactiveList.value.filter(item => item.visible)
//   return visibleDialog.length > 0 ? visibleDialog[visibleDialog.length - 1] : null
// }

provide<ProvideContext>(InjectionKey, { dialogReactiveList, createDialog, disposeDialog })

const dialogList = computed(() => {
  const arr = dialogReactiveList.value.map(item => {
    const { component, props, ...options } = item
    return {
      id: options.id,
      options,
      props,
      component: toRaw(component)
    }
  })
  // console.log(arr)
  return arr
})
</script>
