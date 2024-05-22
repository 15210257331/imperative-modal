<template>
  <div className="calendar">
    <div className="header">
      <button @click="handlePrevMonth">&lt;</button>
      <div>{{ date.getFullYear() }}年{{ monthNames[date.getMonth()] }}</div>
      <button @click="handleNextMonth">&gt;</button>
    </div>
    <div className="days">
      <div className="day">日</div>
      <div className="day">一</div>
      <div className="day">二</div>
      <div className="day">三</div>
      <div className="day">四</div>
      <div className="day">五</div>
      <div className="day">六</div>
      <!-- 上月天数渲染 -->
      <div v-for="item in firstDay" :key="`empty-${item}`" class="empty" style="color: #999">
        {{ preMonthDays - firstDay + item }}
      </div>
      <div
        v-for="item in daysCount"
        :key="`day-${item}`"
        :class="['day', item === date.getDate() && 'selected']"
        @click="handleClick(item)"
      >
        {{ item }}
      </div>
      <!-- 下月天数渲染 -->
      <div v-for="item in lastDays" :key="`empty-${item}`" class="empty" style="color: #999">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

const date = ref<Date>(props.modelValue)

// 获取本月几号是星期几
const firstDay = computed(() => {
  return new Date(date.value.getFullYear(), date.value.getMonth(), 1).getDay()
})

// 当你 date 传 0 的时候，取到的是上个月的最后一天 date.value.getMonth() + 1  就是本月的最后一天 也就是本月的天数  -1 就是上个月的倒数第二天，-2 就是倒数第三天这样
const daysCount = computed(() => {
  return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate()
})

// 上个月多少天
const preMonthDays = computed(() => {
  return new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate()
})

const lastDays = computed(() => {
  return 42 - daysCount.value - firstDay.value
})

function handleClick(item: number) {
  const newDate = new Date(date.value.getFullYear(), date.value.getMonth(), item)
  date.value = newDate
  emit('update:modelValue', newDate)
}

const handlePrevMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1, 1)
}

const handleNextMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 1)
}

function getDate() {
  return date.value
}

function setDate(newDate: Date) {
  date.value = newDate
}

defineExpose({ getDate, setDate })
</script>

<style lang="scss" scoped>
.calendar {
  border: 1px solid #aaa;
  padding: 10px;
  width: 300px;
  height: 280px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.days {
  display: flex;
  flex-wrap: wrap;
}

.empty,
.day {
  width: calc(100% / 7);
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  font-weight: 500;
}

.day:hover,
.selected {
  background-color: #ccc;
  cursor: pointer;
}
</style>
