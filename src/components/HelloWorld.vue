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
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
