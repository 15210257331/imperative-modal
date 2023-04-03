<template>
    <div style="display: flex; align-items: center;">
        <el-input style="width:240px;" v-model="userCode"></el-input>
        <ImageCode ref="imageCode" v-model:code="code" />
        <el-button type="primary" @click="validate">验证</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import ImageCode from '../../../packages/ImageCode/index.vue';

const code = ref<string>('2345')
const userCode = ref<string>('')
const imageCode = ref<InstanceType<typeof ImageCode>>()


function validate() {
    const result = imageCode.value!.validateCode(userCode.value);
    if (result) {
        ElMessage.success('验证成功')
    } else {
        ElMessage.error('验证失败')
    }
    // if(userCode.value && userCode.value === code.value) {
    //     ElMessage.success('验证成功')
    // } else {    
    //     ElMessage.error('验证失败')
    // }
}
</script>

<style lang="scss" scoped></style>