<template>
  <div class="dialog-overlay" :id="modalId" :style="{opacity: visible ? '1':'0'}" @click="handleOverlayClick">
    <div role="dialog" tabindex="-1" class="dialog" :style="styleObject">
      <div class="dialog-header">
        <p class="title">{{ title }}</p>
        <i class="close-icon" @click="close">
          <svg t="1679295681396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3779" width="26" height="26">
            <path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="3780"></path>
          </svg>
        </i>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject } from "vue";
import { InjectionKey } from "./types";

const { dialogs, createDialog, disposeDialog, getDialogId } = inject<any>(InjectionKey)

const props = defineProps({
  modalId: {
    type: String,
  },
  title: {
    type: String,
    default: "dialog"
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
});

const styleObject = computed(() => {
  const dialogLeft = (document.documentElement.clientWidth - props.width)/2;
  const x =  props.pointerX ? (props.pointerX - dialogLeft) + 'px' : '0px';
  const y =  props.pointerY ? (props.pointerY -100) + 'px' : '0px';
  // console.log(x, y);
  return {
    width: `${props.width}px`,
    marginLeft: `-${(props.width) / 2}px`,
    transform: `scale(${visible.value ? '1': '0'})`,
    transformOrigin: `${x} ${y} 0px`
  }
})

const dialogRef = computed(() => {
  return dialogs[getDialogId()]
})

const visible = computed(() => {
  return dialogs[getDialogId()]?.visible
})

function handleOverlayClick(event:any) {
  const target = event.target.className;
  if(target === 'dialog-overlay') {
    close();
  }
}

function close() {
  dialogRef.value.reject('取消')
  disposeDialog();
}

</script>
  

<style scoped>
.dialog-overlay {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  transition: all 0.2s linear;
  z-index: 999999;
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
  color: #333
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