<template>
    <slot></slot>
    <template v-for="item in dialogList" :key="item.id">
        <component :is="item.component" :id="item.id"/>
    </template>
</template>
<script lang="ts" setup>
import { useDialogProvider } from './useDialogProvider'
const { dialogList } = useDialogProvider();
</script>
  