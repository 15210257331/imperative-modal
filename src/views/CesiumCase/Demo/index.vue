<template>
  <div id="cesiumContainer" />
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { Viewer } from 'cesium'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
onMounted(() => {
  initCesium()
})

function initCesium() {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZWU2MzMwYS1mYWIwLTQ1NDgtOTdlMy0wZjMzZTA5MTBhYmMiLCJpZCI6MTUyNzkwLCJpYXQiOjE2ODg5ODAwOTV9.P7_-7u976U2uWZvTu1s0WYbkURPsQ7iAn_zpRti4KDI'
  const viewer = new Viewer('cesiumContainer')
}
</script>

<style scoped lang="scss">
#cesiumContainer {
  width: 100%;
  /*height: 100%;*/
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
