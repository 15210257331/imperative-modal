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
