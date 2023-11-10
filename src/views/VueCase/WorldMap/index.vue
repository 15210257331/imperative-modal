<template>
  <div ref="world" style="width: 1100px; height: 600px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import WorldJSON from '../GlobeLine/world.json'

echarts.registerMap('world', WorldJSON)
const world = ref()

onMounted(() => {
  let myChart = echarts.init(world.value)
  myChart.setOption({
    backgroundColor: '#001213',
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true,
      formatter: function (prams, d, callback) {
        return prams.value
      }
    },
    geo: {
      type: 'map',
      map: 'world',
      show: true,
      roam: true,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      label: {
        show: false,
        color: '#f66',
        fontWeight: 'bold',
        fontSize: 16
      },
      itemStyle: {
        areaColor: 'transparent',
        borderColor: '#ffff00'
      },
      emphasis: {
        areaColor: 'transparent'
      },
      boundingCoords: [
        [-180, 90],
        [180, -90]
      ]
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        symbolSize: 20,
        rippleEffect: {
          period: 3,
          number: 5,
          brushType: 'stroke',
          scale: 3
        },
        itemStyle: {
          color: 'red',
          opacity: 0.7
        },
        data: [[105.18, 37.51, 1000]]
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        symbolSize: 20,
        label: {
          show: true,
          position: 'middle',
          color: 'red',
          fontSize: 20,
          formatter: '222'
        },
       
        effect: {
            show: true,
        },
        data: [
          {
            coords: [
              [39.1083984375,36.680566406249994], 
              [105.18, 37.51],
              [3333,444]
            ],
            lineStyle: {
                curveness: 0.5
            }
          }
        ]
      }
    ]
  })
})
</script>

<style lang="scss" scoped></style>
