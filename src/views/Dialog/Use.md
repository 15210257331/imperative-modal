
# 安装

```bash
npm install vue3-dialog-c
```

# 使用

1.App.vue

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
