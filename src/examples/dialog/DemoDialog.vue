<template>
    <div>
        <div style="height:200px">
            <p>{{ id }}</p>
            s拉科技砥砺奋进猎杀对决反垃圾手打拉法基拉手机大发路阿拉斯加地方啦吉利丁粉进啦手打阿里卡世纪东方垃圾十六大飞机拉萨Component多路阀老司机component
            收到菲拉斯接待来访拉上快点解封辣椒水
            虽然从鼠标位置出现的动画看起来很酷，但是我们有时也想要一些朴实无华的从屏幕中间弹出来的动画。这时你可以将 transform-origin 设为 'center'。
        </div>
        <div style="display: flex; justify-content: flex-end;">
            <el-button type="default" @click="cancel"> 取消</el-button>
            <el-button type="primary" @click="confirm"> 提交</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useDialog } from '../../../packages/dialog';

const { close } = useDialog();

const props = defineProps({
    id: {
        type: String
    }
})

function confirm() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            close('这是传出的数据')
        }, 1000)
    })

}

function cancel() {
    close()
}

</script>
  
<style scoped></style>
  