<template>
  <div class="main" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
//引入世界地图的JSON数据
import WorldJSON from '@/assets/json/world.json'
import ChinaJSON from '@/assets/json/china.json'

import floor from '@/assets/floor.jpg'

//注册世界地图
echarts.registerMap('world', WorldJSON)
echarts.registerMap('china', ChinaJSON)
const map = ref()

let earthOption: any = {}
let myChart: any

onMounted(() => {
  myChart = echarts.init(map.value)
  earthOption = {
    backgroundColor: '#000',
    globe: {},
    series: [
      {
        type: 'bar3D',
        coordinateSystem: 'globe',
        data: [
          [-78, 73, 1.5],
          [23.5, 71.5, 1.3]
        ],
        barSize: 0.6,
        //minHeight: 0.2,
        silent: true,
        itemStyle: {
          color: 'orange'
        }
      }
    ]
  }
  myChart.setOption(earthOption)
})
</script>

<style scoped>
.main {
  width: 1100px;
  height: 800px;
}
</style>
