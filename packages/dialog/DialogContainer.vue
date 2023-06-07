<template>
  <div class="dialog-mask" :style="maskStyle" @click="handleOverlayClick">
    <div role="dialog" tabindex="-1" class="dialog" :style="dialogStyle">
      <div class="dialog-header">
        <p class="title">{{ title }}</p>
        <i class="close-icon" @click="close"><Close /> </i>
      </div>
      <div class="dialog-body">
        <slot></slot>
        <slot name="confirm"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { InjectionKey } from './types'
import Info from '../icons/Info'
import Close from '../icons/Close'

const { dialogReactiveList, disposeDialog } = inject<any>(InjectionKey)

const iconRenderMap = {
  info: () => Info,
  success: () => Info,
  warning: () => Info,
  error: () => Info
}

const props = defineProps({
  // 弹窗ID
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'default'
  },
  title: {
    type: String,
    default: 'dialog'
  },
  mask: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 640
  },
  pointerX: {
    type: Number
  },
  pointerY: {
    type: Number
  }
})

const dialogRef = computed(() => {
  return dialogReactiveList.value.find((item: any) => item.id == props.id)
})

const visible = computed(() => {
  return dialogRef.value?.visible
})

const maskStyle = computed(() => {
  return {
    opacity: visible.value ? '1' : '0',
    zIndex: dialogRef.value?.zIndex
  }
})

const dialogStyle = computed(() => {
  const dialogLeft = (document.documentElement.clientWidth - props.width) / 2
  const x = props.pointerX ? props.pointerX - dialogLeft + 'px' : '0px'
  const y = props.pointerY ? props.pointerY - 100 + 'px' : '0px'
  // console.log(x, y);
  return {
    width: `${props.width}px`,
    marginLeft: `-${props.width / 2}px`,
    transform: `scale(${visible.value ? '1' : '0'})`,
    transformOrigin: `${x} ${y} 0px`
  }
})

function handleOverlayClick(event: any) {
  const target = event.target.className
  if (target === 'dialog-overlay') {
    close()
  }
}

function close() {
  dialogRef.value.reject('取消')
  disposeDialog()
}
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  transition: all 0.2s linear;
}

.dialog {
  position: absolute;
  left: 50%;
  top: 100px;
  width: 640px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  transition: all 0.2s linear;
}

.dialog-header {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dialog-header .title {
  font-weight: 500;
  font-size: 18px;
  margin: 0;
  color: #333;
}
.close-icon {
  height: 26px;
  width: 26px;
  border-radius: 50%;
  background-color: #ededed;
  cursor: pointer;
}
.dialog-body {
  padding: 0 10px;
  overflow: hidden;
}
</style>
