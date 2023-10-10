<template>
    <div class="circular-progress-bar">
        <div class="svg-container">
            <svg class="svg">
                <circle ref="circleRef" class="circle" r="100" cx="120" cy="120"></circle>
            </svg>
        </div>
        <div class="text-progress">
            <span class="text">{{ currentValue }}</span>
            <span class="progress">%</span>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref<number>(0);
const i = ref<number>(0);
const progressLen = 628;
const circleRef = ref();

const setPercent = (num: number) => {
    if (num > 100) return;
    circleRef.value.style["strokeDashoffset"] =
        progressLen - (progressLen / 100) * num;
    currentValue.value = num;
};

setInterval(() => {
    i.value += Math.floor(Math.random() * 5);
    if (i.value >= 100) {
        i.value = 100;
    }
    setPercent(i.value);
}, 250);
</script>
  
<style lang="scss" scoped>
.circular-progress-bar {
    position: relative;
}

.text-progress {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);

    .text {
        font-size: 30px;
    }

    .progress {
        font-size: 20px;
    }
}

.svg-container {
    display: flex;
    justify-content: center;
    margin: 100px auto;

    .svg {
        position: relative;
        width: 250px;
        height: 250px;
    }

    .circle {
        width: 250px;
        height: 250px;
        fill: none;
        stroke-width: 20;
        stroke: #0266ff;
        stroke-dasharray: 628;
        stroke-dashoffset: 628;
        transition: all 1s;
        stroke-linecap: round;
        transform: rotate(-85deg);
        transform-origin: center;
        transform-box: fill-box;

        .text {
            font-size: 20px;
        }

        .percent {
            font-size: 10px;
        }
    }
}
</style>
  