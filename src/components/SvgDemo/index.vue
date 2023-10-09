<template>
  <div style="text-align: center; margin: 0 auto">
    <svg width="600" height="400" style="border: 1px solid steelblue">
      <polygon points="26,23 34,23 30,30" style="fill: #2760c6; stroke: #2760c6; stroke-width: 1" />
      <path d="M 30 30 V 150 Q 30 210, 90 210 H 210" stroke="none" fill="none"></path>
      <path d="M 30 30 V 150 Q 30 210, 90 210 H 210" stroke="#2760C6" stroke-dasharray="5 5" fill="none" class="path-fill"></path>
      <circle cx="210" cy="210" r="5" stroke="none" fill="#2760C6" />
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.path-fill {
  stroke-linejoin: round;
  stroke-linecap: round;
}

.path-fill {
  stroke-dashoffset: 18;
  animation: lineMove 3s linear infinite;
  animation-fill-mode: backwards;
}
@keyframes lineMove {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -200;
  }
}
</style>
