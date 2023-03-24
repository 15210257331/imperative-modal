<template>
  <DialogProvider>
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <span>vue3 dialog</span>
          </div>
          <nav class="nav">
            <router-link active-class="active" to="/">文档</router-link>
            <router-link active-class="active" to="/examples">组件</router-link>
          </nav>
        </div>
      </header>
      <div class="content">
        <router-view></router-view>
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
    border-bottom: 1px solid #ccc;

    &-content {
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 1200px;

      .logo {
        height: 100%;
        line-height: 65px;
        text-align: center;
        color:#646cffaa;
        font-size: 28px;
      }

      .nav {
        margin-left: 100px;
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
    flex: 1;
    width: 1200px;
    overflow: auto;
    margin: 20px;
  }
}
</style>
