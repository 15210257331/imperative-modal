<template>
  <p>{{ date }}</p>
  <el-button @click="handleSet">设置值</el-button>
  <Calendar v-model="date" ref="calendar" />
</template>

<script setup lang="ts">
import Calendar from '../../../../packages/Calendar/index.vue'
import { computed, onMounted, ref } from 'vue'

const date = ref(new Date('2024-5-24'))

const calendar = ref()

function handleSet() {
  calendar.value.setDate(new Date(2024, 6, 18))
}

onMounted(() => {
  console.log(calendar.value.getDate())
})
</script>

<style lang="scss" scoped></style>
