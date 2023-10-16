<template>
  <!-- 正在直播中 -->
  <svg height="0" width="0">
    <symbol id="beats" viewBox="0 0 100 100">
      <line
        class="beat"
        x1="15"
        y1="40"
        x2="15"
        y2="100"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
      ></line>
      <line
        class="beat"
        x1="50"
        y1="40"
        x2="50"
        y2="100"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
      ></line>
      <line
        class="beat"
        x1="85"
        y1="40"
        x2="85"
        y2="100"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
      ></line>
    </symbol>
  </svg>
  <span class="live">
    <svg height="30" width="30">
      <use href="#beats"></use>
      <!--href="#beats"所指向的就是上面<symbol>标签的id-->
    </svg>
    <span>直播中</span>
  </span>

  <!-- 等待中 -->
  <svg height="0" width="0">
    <symbol id="clock" viewBox="-52 -52 104 104">
      <circle fill="none" stroke="currentColor" stroke-width="6" stroke-miterlimit="10" cx="0" cy="0" r="48" />
      <line
        class="fast-hand"
        fill="none"
        stroke-linecap="round"
        stroke="currentColor"
        stroke-width="6"
        stroke-miterlimit="10"
        x1="0"
        y1="0"
        x2="35"
        y2="0.5"
      ></line>
      <line
        class="slow-hand"
        fill="none"
        stroke-linecap="round"
        stroke="currentColor"
        stroke-width="6"
        stroke-miterlimit="10"
        x1="0"
        y1="0"
        x2="-0.5"
        y2="-24"
      ></line>
    </symbol>
  </svg>
  <span class="live" style="color: #fa8919; margin-left: 20px">
    <svg height="30" width="30">
      <use href="#clock"></use>
    </svg>
    <span>等待中</span>
  </span>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.beat {
  transform-origin: bottom; //将变换参考点设置成`<svg>元素`的底部
  animation: beat-scale 1.4s linear infinite;
}
.beat:nth-child(1) {
  animation-delay: 0.4s;
}
.beat:nth-child(2) {
  animation-delay: 0.2s;
}

.live {
  color: #ff6699;
  border: 1px solid #ff6699;
  border-radius: 5px;
  padding-left: 5px;
  font-size: 22px;
  padding: 4px 5px;
}

@keyframes beat-scale {
  25% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
  75% {
    transform: scaleY(0.3);
  }
}

.fast-hand {
  animation: clock-rotate 2s linear infinite; /*动画时间设置不同*/
}
.slow-hand {
  animation: clock-rotate 15s linear infinite; /*动画时间设置不同*/
}
@keyframes clock-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
