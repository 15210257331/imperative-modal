<template>
  <DialogProvider>
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <img class="logo" src="./assets/vue.svg" alt="" />
            <span>xialkajlsd</span>
          </div>
          <nav class="nav"></nav>
        </div>
      </header>
      <content class="content">
        <router-view></router-view>
      </content>
    </div>
  </DialogProvider>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DialogProvider } from '../packages/dialog'

const router = useRouter()

const routes = router.getRoutes()
// console.log(routes);
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

    &-content {
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 1200px;

      .logo {
        display: flex;
        align-items: center;
        img {
          width: 38px;
          height: 38px;
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

        a {
          color: #555;
          font-weight: 600;
          margin: 0 15px;
          cursor: pointer;

          &:hover {
            color: #0da9aeaa;
          }
        }

        .active {
          color: #0da9aeaa;
        }
      }
    }
  }

  .content {
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px 200px;
  }
}
</style>
