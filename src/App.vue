<template>
  <DialogProvider>
    <div class="app-container">
      <header v-if="showHeader" class="header">
        <div class="header-content">
          <div class="logo" @click="handleClick">
            <img src="./assets/logo.webp" alt="" />
            <span>Grocery</span>
          </div>
          <nav class="nav">
            <router-link v-for="item in routes" :key="item.path" active-class="active" :to="item.path">
              <div class="list-item">
                <p>{{ item.name }}</p>
              </div>
            </router-link>
          </nav>
          <div class="action">
            <el-input
              style="--el-input-border-radius: 15px; width: 210px"
              v-model="keywords"
              placeholder="搜索"
              clearable
              :prefix-icon="Search"
              @keyup.enter="search"
              @clear="clear"
            />
          </div>
        </div>
      </header>
      <div class="content">
        <div class="content-body">
          <Suspense>
            <router-view />
            <template #fallback>
              <h1 style="color: red; font-size: 40px">加载中......</h1>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </DialogProvider>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { DialogProvider } from '../packages/dialog'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const routes = router.getRoutes().filter(item => item.meta.show)
console.log(router.getRoutes())
const keywords = ref<string>('')
const showHeader = ref<boolean>(false)

function search() {
  const path = route.path
  router.push({
    path: path,
    query: {
      keywords: keywords.value
    }
  })
}
function clear() {
  keywords.value = ''
  search()
}

function handleClick() {
  router.push({
    path: '/'
  })
}
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    height: 65px;
    width: 100%;
    box-sizing: border-box;
    min-height: 65px;
    border-bottom: 1px solid rgba(60, 60, 67, 0.12);
    .header-content {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .logo {
        display: flex;
        align-items: center;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
        }
        span {
          font-size: 20px;
          font-weight: 600;
          margin-left: 15px;
        }
      }

      .nav {
        margin-left: 70px;
        height: 100%;
        display: flex;
        align-items: center;
        flex: 1;

        .list-item {
          color: #555;
          font-weight: 600;
          margin: 0 15px;
          cursor: pointer;
          border-radius: 40px;
          padding: 6px 16px;

          &:hover {
            color: #0da9aeaa;
            background-color: #92909013;
          }
        }

        .active {
          .list-item {
            color: #0da9aeaa;
            background-color: #92909013;
          }
        }
      }
      .action {
      }
    }
  }

  .content {
    width: 100%;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;
    padding-top: 20px;
    background-color: #f8f8f8;
    .content-body {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
  }
}
</style>
