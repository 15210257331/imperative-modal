<template>
  <div ref="world" style="width: 1100px; height: 600px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import WorldJSON from '@/assets/json/world.json'
import ChinaJSON from '@/assets/json/china.json'

echarts.registerMap('world', WorldJSON)
echarts.registerMap('china', ChinaJSON)
const world = ref()

onMounted(() => {
  const myChart = echarts.init(world.value)
  const option = {
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true
    },
    geo3D: {
      show: true,
      map: 'world',
      roam: true,
      regionHeight: 2,
      environment: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: '#00aaff' // 天空颜色
          },
          {
            offset: 0.7,
            color: '#998866' // 地面颜色
          },
          {
            offset: 1,
            color: '#998866' // 地面颜色
          }
        ],
        false
      ),
      shading: 'color',
      label: {
        show: true,
        distance: 5,
        textStyle: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: 12
        },
        formatter: params => (params.name ? params.name : ' ')
      },
      itemStyle: {
        color: '#f66',
        borderWidth: 2,
        borderColor: '#ffff00'
      },
      emphasis: {
        label: {
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        },
        itemStyle: {
          areaColor: '#ffff00'
        }
      },
      viewControl: {
        projection: 'perspective'
      },
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    },
    series: [
      {
        name: 'lines3D',
        type: 'lines3D',
        coordinateSystem: 'geo3D',
        effect: {
          show: true,
          period: 2,
          trailWidth: 3,
          trailLength: 0.5,
          trailOpacity: 1,
          trailColor: '#0087f4'
        },
        blendMode: 'lighter',
        lineStyle: {
          // width: 2
          width: 1,
          color: '#0087f4',
          opacity: 0
        },
        data: [],
        silent: true
      }
    ]
  }
  // for (let i = 0; i < 10; i++) {
  //   option.series[0].data = option.series[0].data.concat(randomData())
  // }
  myChart.clear()
  myChart.setOption(option, true)
})

function randomData() {
  let longitude = 87.617733
  let longitude2 = Math.random() * 360 - 180
  let latitude = 43.792818
  let latitude2 = Math.random() * 180 - 90
  return {
    coords: [
      [longitude2, latitude2],
      [longitude, latitude]
    ],
    value: (Math.random() * 3000).toFixed(2)
  }
}
</script>

<style lang="scss" scoped></style>
