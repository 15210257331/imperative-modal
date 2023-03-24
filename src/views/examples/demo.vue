<template>
    <el-button type="primary" @click="showDialog">打开一个弹窗</el-button>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import DemoDialog from './DemoDialog.vue';
import { useDialog, type DialogConfig } from '../../../packages/dialog';

const dialog = useDialog()

const config: DialogConfig = {
    mask: true,
    title: '这是一个弹窗的标题',
    width: 600,
    props: {
        id: '这是传入的数据'
    }
}

function showDialog() {
    dialog.open(DemoDialog,config).then(res => {
            console.log(res);
            ElMessage.success(res)
        }).catch(err => {
            console.log(err);
            ElMessage.info('弹窗已销毁')
        })
};

</script>

<style scoped></style>
