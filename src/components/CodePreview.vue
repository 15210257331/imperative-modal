<template>
  <div class="code-preview">
    <div class="demo">
      <slot></slot>
    </div>
    <pre :class="['code-source', expand ? 'expand' : '']">
        <code ref="sourceCodeRef">{{ sourceCode }}</code>
    </pre>
    <div class="operate">
      <span class="toggle" @click="handleToggle">{{ expand ? "隐藏代码" : "显示代码" }}</span>
      <span class="copy" @click="handleCopy">复制代码</span>
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

const expand = ref<boolean>(false);
const sourceCode = ref("");
const sourceCodeRef = ref<HTMLElement | null>(null)

function handleToggle() {
  expand.value = !expand.value;
}

function handleCopy() {
  console.log('复制成功');
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
  width: 100%;
  box-sizing: border-box;
  margin: 16px 0;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-sizing: border-box;

  .demo {
    padding: 10px 16px;
  }

  .code-source {
    transition: all 0.4s ease;
    padding: 0 10px;
    margin: 0;
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
  }
  .expand {
    max-height: 1000px;
    opacity: 1;
  }

  .operate {
    border-top: 1px solid #ebebeb;
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    text-align: right;
    span {
      margin: 0 10px;
      cursor: pointer;
      font-size: 14px;
      color: #888;
      font-weight: 600;
      &:hover {
        color: #409eff
      }
     }
  }
}
</style>