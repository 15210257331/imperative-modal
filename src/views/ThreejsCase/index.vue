<template>
  <CaseList :data="caseList" />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed, onMounted } from 'vue'
import CaseList from '@/components/CaseList.vue'
import AttackLine from './AttackLine/index.vue'
import Earth from './Earth/index.vue'
import Demo from './Demo/index.vue'
import ChinaMap from './ChinaMap/index.vue'
const caseList = ref([
  {
    title: '3D中国地图',
    component: markRaw(ChinaMap),
    path: ['ThreejsCase/ChinaMap/index']
  },
  {
    title: '案例',
    component: markRaw(Demo),
    path: ['ThreejsCase/Demo/index']
  },
  {
    title: '打击线阵列',
    component: markRaw(AttackLine),
    path: ['ThreejsCase/AttackLine/index']
  },
  {
    title: '',
    component: markRaw(Earth),
    path: ['ThreejsCase/Earth/index']
  }
])
</script>

<style lang="scss" scoped>
.demo {
  width: 400px;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  border: 1px solid black;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    width: 20px;
    height: 100%;
    background: linear-gradient(to right, rgba(4, 16, 30, 1), rgba(4, 16, 30, 0));
  }
  & > div {
    overflow: auto;
    width: 100%;
    height: 100%;
    div {
      width: 800px;
      height: 200px;
      background-color: #fff000;
    }
  }
}
.text {
  font-size: 32px;
  line-height: 40px;
  font-weight: 500;
  background: linear-gradient(180deg, #fff 36.46%, #9ac1f0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
