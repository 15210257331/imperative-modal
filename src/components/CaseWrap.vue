<template>
  <div class="case-wrap">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.case-wrap {
  width: 100%;
  height: auto;
  margin: 24px 0;
  .title {
    text-align: left;
    font-size: 28px;
    margin-bottom: 20px;
  }
  .content {
    box-shadow: 0 0 10px #ccc;
    min-width: 320px;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
  }
}
</style>
