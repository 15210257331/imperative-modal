# 使用方式

1.安装

```bash
npm install imperative-modal
```

2.在项目根组件配置 provider

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalProvider } from 'imperative-modal'
</script>

<template>
  <ModalProvider>
    <RouterView />
  </ModalProvider>
</template>
```
