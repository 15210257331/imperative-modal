<script setup lang="ts">
import { ref } from 'vue'
import DemoDialog from './DemoDialog.vue';
import { useDialog, type DialogConfig } from '../../packages/dialog';

const dialog = useDialog()

function showDialog() {
    dialog.open(DemoDialog,
        { 
            mask: true, 
            title: '这是一个弹窗', 
            width: 600,
            props: {
                id: '这是传入的数据'
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
};

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <button type="button" @click="showDialog">显示弹窗</button>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
