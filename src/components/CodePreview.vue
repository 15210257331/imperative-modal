<template>
  <div class="code-preview">
    <div class="demo">
      <slot></slot>
    </div>
    <pre :class="['code-source', expand ? 'expand' : '']">
              <code ref="sourceCodeRef">{{ sourceCode }}</code>
          </pre>
    <div class="control">
      <span class="toggle" @click="handleToggle">{{ expand ? "隐藏代码" : "显示代码" }}</span>
      <!-- <span class="copy" @click="handleCopy">复制代码</span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css";
const isDev = import.meta.env.MODE === 'development';

const props = defineProps({
  compName: {
    type: Array,
    default: () => [],
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
  if (isDev) {
    await Promise.all(props.compName.map(async (item) => {
      const url = `../views/${item}.vue?raw`
      let msg = await import(/* @vite-ignore */ url)
      console.log(msg);
      sourceCode.value = sourceCode.value + msg.default;
    }))
  } else {
    await Promise.all(props.compName.map(async (item) => {
      const url = `/views/${item}.vue?raw`
      let msg = await fetch(url).then(res => res.text());
      console.log(msg);
      sourceCode.value = sourceCode.value + msg;
    }))
  }
  await nextTick(() => {
    hljs.highlightElement(sourceCodeRef.value as HTMLElement);
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
    // background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
  }

  .expand {
    max-height: 2000px;
    opacity: 1;
  }

  .control {
    border-top: 1px solid #ebebeb;
    height: 40px;
    line-height: 40px;
    text-align: center;

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