<template>
  <div class="code-preview">
    <pre class="code-source">
      <code ref="sourceCodeRef">{{ sourceCode }}</code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'
const isDev = import.meta.env.MODE === 'development'

const props = defineProps({
  compPath: {
    type: Array,
    default: () => [],
    require: true
  }
})

const sourceCode = ref('')
const sourceCodeRef = ref<HTMLElement | null>(null)

function handleCopy() {
  console.log('复制成功')
}

async function getSourceCode() {
  if (isDev) {
    await Promise.all(
      props.compPath.map(async item => {
        const url = `../views/${item}.vue?raw`
        let msg = await import(/* @vite-ignore */ url)
        console.log(msg)
        sourceCode.value = sourceCode.value + msg.default
      })
    )
  } else {
    await Promise.all(
      props.compPath.map(async item => {
        const url = `/views/${item}.vue?raw`
        let msg = await fetch(url).then(res => res.text())
        console.log(msg)
        sourceCode.value = sourceCode.value + msg
      })
    )
  }
  await nextTick(() => {
    hljs.highlightElement(sourceCodeRef.value as HTMLElement)
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
  border: 1px solid #ebebeb;
  border-radius: 3px;
  overflow: auto;
  // max-height: 500px;
  .code-source {
    margin: 0;
    padding-bottom: 0;
    code {
      overflow: inherit;
    }
  }
}
</style>
