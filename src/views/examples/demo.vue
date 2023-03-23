<template>
    <button class="btn" type="button" @click="showDialog">显示弹窗</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoDialog from './DemoDialog.vue';
import { useDialog, type DialogConfig } from '../../../packages/dialog';

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

</script>

<style scoped>
.btn {
    border: 1px solid #4fdfff;
    color: black;
    background-color: #4fdf;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    font-weight: 500;
    padding: 0 20px;
    cursor: pointer;
}
</style>
