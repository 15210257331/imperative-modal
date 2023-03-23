<template>
  <div class="code-preview">
    <div class="demo">
      <slot></slot>
    </div>
    <pre class="code-source" :style="{height: showSourceCode ?'auto': '0px', borderTop: showSourceCode ? '1px solid #ebebeb': 'none'}">
               <code ref="sourceCodeRef">{{ sourceCode }}</code>
        </pre>
    <div class="code-source-toggle">
      <div class="showCode" @click="handleToggle">
        <span>{{ showSourceCode ? "隐藏代码" : "显示代码" }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css";

const props = defineProps({
  name: {
    type: String,
  },
  compName: {
    type: String,
    default: "",
    require: true,
  },
  demoName: {
    type: String,
    default: "",
    require: true,
  },
});

const showSourceCode = ref<boolean>(false);
const sourceCode = ref("");
const sourceCodeRef = ref<HTMLElement | null>(null)

function handleToggle() {
  showSourceCode.value = !showSourceCode.value;
}

async function getSourceCode() {
  let msg = await import(/* @vite-ignore */ `../views/examples/${props.demoName}.vue?raw`)
  sourceCode.value = msg.default;
  await nextTick(() => {
    console.log(sourceCodeRef.value);
    hljs.highlightBlock(sourceCodeRef.value as HTMLElement);
  })
}

onMounted(() => {
  getSourceCode()
})
</script>

<style lang="scss" scoped>
.code-preview {
  width: 600px;
  margin: 10px 16px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-sizing: border-box;

  .demo {
    padding: 10px 16px;
  }

  .code-source {
    transition: all 0.3s linear;
    height: 0px;
    padding: 0 10px;
    overflow: hidden;
    margin: 0;
  }

  .code-source-toggle {
    border-top: 1px solid #ebebeb;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>