<template>
  <slot></slot>
  <div>{{ dialogList }}</div>
  <template v-for="item in dialogList" :key="item.id">
    <component :is="item.component" :id="item.id" />
  </template>
</template>
<script setup lang="ts">
import { useDialogProvider } from './useDialogProvider'
const { dialogList } = useDialogProvider()
</script>
