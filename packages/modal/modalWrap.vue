<template>
  <div class="modal_wrap" :style="maskStyle" @click="handleOverlayClick">
    <div role="modal" tabindex="-1" class="modal_content" :style="modalStyle">
      <div class="modal-header">
        <p class="title">{{ title }}</p>
        <i class="close-icon" @click="cancel">
          <Close />
        </i>
      </div>
      <div class="modal_body">
        <slot></slot>
      </div>
      <template v-if="type != 'default'">
        <div class="confirm_text">
          <i class="close-icon">
            <component :is="icon" />
          </i>
          <span class="text"> {{ content }}</span>
        </div>
        <div class="modal_footer">
          <el-button type="default" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { InjectionKey, ProvideContext } from './types'
import Info from '../icons/Info'
import Success from '../icons/Success'
import Warning from '../icons/Warning'
import Error from '../icons/Error'
import Close from '../icons/Close'

const { modalReactiveList, destroyModal } = inject<ProvideContext>(InjectionKey)!

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
    default: '标题'
  },
  content: {
    type: String,
    default: '默认内容'
  },
  mask: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 420
  },
  pointerX: {
    type: Number
  },
  pointerY: {
    type: Number
  }
})

const iconMap = {
  info: Info,
  success: Success,
  warning: Warning,
  error: Error
}
const icon = computed(() => {
  console.log(iconMap[props.type])
  return iconMap[props.type]
})

const modalRef = computed(() => {
  return modalReactiveList.value.find((item: any) => item.id == props.id)
})

const visible = computed(() => {
  return modalRef.value?.visible
})

const maskStyle = computed(() => {
  return {
    opacity: visible.value ? '1' : '0',
    zIndex: modalRef.value?.zIndex
  }
})

const modalStyle = computed(() => {
  const modalLeft = (document.documentElement.clientWidth - props.width) / 2
  const x = props.pointerX ? props.pointerX - modalLeft + 'px' : '0px'
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
  if (target === 'modal_wrap') {
    cancel()
  }
}

function confirm() {
  modalRef.value.resolve('确认')
  destroyModal()
}

function cancel() {
  modalRef.value.reject('取消')
  destroyModal()
}
</script>

<style scoped>
.modal_wrap {
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

.modal_content {
  position: absolute;
  left: 50%;
  top: 100px;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  transition: all 0.2s linear;
}

.modal-header {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header .title {
  font-weight: 500;
  font-size: 16px;
  margin: 0 12px;
  color: #333;
}

.close-icon {
  height: 26px;
  width: 26px;
  border-radius: 50%;
  background-color: #ededed;
  cursor: pointer;
}

.modal_body {
  padding: 0 12px;
  overflow: hidden;
}

.confirm_text {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 12px 0px 20px 12px;

  .text {
    margin-left: 8px;
    font-size: 13px;
    font-weight: 500;
  }
}

.modal_footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
