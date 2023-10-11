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
  padding: 12px;
  // box-shadow: 0 0 6px #ccc;
  border-radius: 6px;
  border: 1px solid #ededed;
  background-color: white;
  .title {
    text-align: left;
    font-size: 23px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .content {
    min-width: 320px;
  }
}
</style>
