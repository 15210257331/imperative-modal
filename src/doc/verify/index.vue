<template>
    <h2 class="title">组件示例</h2>
    <CodePreview :comp-name="['verify/Demo']">
        <Demo />
    </CodePreview>
</template>

<script setup lang="ts">
import CodePreview from "@/components/CodePreview.vue"
import Demo from "./Demo.vue";
</script>

<style lang="scss" scoped>

</style>