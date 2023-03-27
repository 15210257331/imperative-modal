<template>
  <DialogProvider>
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <img class="logo" src="./assets/vue.svg" alt="">
          <nav class="nav">
            <router-link active-class="active" to="/">文档</router-link>
            <router-link active-class="active" to="/examples">组件</router-link>
          </nav>
        </div>
      </header>
      <div class="body">
        <div class="body-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </DialogProvider>
</template>

<script setup lang="ts">
import { DialogProvider } from '../packages/dialog'
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
    border-bottom: 1px solid rgba(60, 60, 67, .12);

    &-content {
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 1200px;

      .logo {
        width: 42px;
        height: 42px;
        margin-left: 30px;
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
  .body {
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
    padding: 20px;
    .body-content {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>
