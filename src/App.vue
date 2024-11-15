<template>
  <ModalProvider>
    <div class="app-container">
      <header class="header">vue3 命令式模态框</header>
      <section class="content">
        <div class="content_body">
          <router-view />
        </div>
      </section>
    </div>
  </ModalProvider>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ModalProvider } from '../packages/modal'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const routes = router.getRoutes().filter(item => item.meta.show)
// console.log(router.getRoutes())
const keywords = ref<string>('')
const showHeader = ref<boolean>(true)

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

  .header {
    height: 120px;
    line-height: 120px;
    font-size: 28px;
    font-weight: 700;
    width: 100%;
    box-sizing: border-box;
    padding: 0 200px;
    opacity: 0.8;
    background: url('./assets/image/header-bg.jpg') no-repeat;
    background-size: 900px;
  }

  .content {
    width: 100%;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 20px;

    .content_body {
      margin: 0 200px;
    }

    // background-color: #f8f8f8;
    // background: linear-gradient(to bottom right, #ff7e5f, #feb47b); /* 对角线渐变 */
  }
}
</style>
