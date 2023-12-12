<template>
  <div style="width: 960px">
    <h2>1.使用 border-image</h2>
    <div class="border-img">边框变色</div>
    <p>但是这种方法使用border-radius没有效果</p>

    <h2>2、使用 background-image</h2>
    <div class="border-bg"><p class="content">边框变色</p></div>

    <h2>3、单层元素、background-clip、background-origin、background-image</h2>
    <div class="border-box">边框变色</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.border-img {
  border: 4px solid;
  border-image: linear-gradient(to right, #8f41e9, #578aef) 1;
  color: #fff;
  width: 300px;
  height: 200px;
  line-height: 80px;
  text-align: center;
  background: #222;
}

.border-bg {
  width: 300px;
  height: 200px;
  background: linear-gradient(to right, #8f41e9, #578aef);
  border-radius: 16px;
  overflow: hidden;
  .content {
    width: 290px;
    height: 190px;
    margin-left: 5px;
    margin-top: 5px;
    background: #222;
    color: #fff;
    text-align: center;
    border-radius: 13px;
  }
}

.border-box {
  width: 300px;
  height: 200px;
  border: 4px solid transparent;
  border-radius: 16px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #8f41e9, #578aef);
}
</style>
