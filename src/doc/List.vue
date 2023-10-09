<template>
  <div class="list">
    <router-link v-for="item in routes" :key="item.path" active-class="active" :to="item.path">
      <div class="list-item">
        <p>{{ item.name }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes()
console.log(routes)

const list = ref([
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  },
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  },
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  },
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  },
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  },
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  },
  {
    title: 'xxxxxxxxx',
    description: 'xianglaks阿里卡发IC你啦塑料袋饭卡'
  }
])
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
  .list-item {
    margin: 12px;
    padding: 12px;
    box-shadow: 0 0 16px #ccc;
    width: 280px;
    height: 240px;
    border-radius: 10px;
    background-color: white;
  }
}
</style>
