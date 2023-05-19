# vue3-dialog-c

a vue3 dialog component

## Install

```bash
npm install vue3-dialog-c
```

## 使用

1.main.js

```vue
import 'vue3-dialog-c/lib/style.css'
```

2.App.vue

```vue
<!--App.vue -->
<script setup lang="ts">
import { RouterView } from "vue-router";
import { DialogProvider } from "vue3-dialog-c";
</script>

<template>
  <DialogProvider>
    <RouterView />
  </DialogProvider>
</template>
```

## 发布到npm

1.npm run build:lib
  打包库
2.npm run release
  发布到npm

## 部署文档

 1.npm run build
   打包文档资源
 2.npm run deploy
   部署文档网站
