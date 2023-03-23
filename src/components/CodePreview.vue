<template>
    <div class="code-preview">
        <transition name="slide-fade">
            <pre class="language-html" v-if="showCode">
            <code class="language-html">{{ sourceCode }}</code>
          </pre>
        </transition>
        <div class="showCode" @click="showOrhideCode">
            <i :class="iconClass"></i>
            <span>{{ showCode ? "隐藏代码" : "显示代码" }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
 
 const props = defineProps({
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
  
 const showCode = ref(false);
 const sourceCode = ref("");
  
 const iconClass = computed(() => {
   return [
     'iconfont',
     showCode.value ? 'icon-arrow-up-filling' : 'icon-arrow-down-filling'
   ]
 })
  
 const showOrhideCode = () => {
   showCode.value = !showCode.value;
 }
  
 const getSourceCode = async () => {
    console.log(props.compName);
    let msg = await import(/* @vite-ignore */ `../examples/${props.compName}/${props.demoName}.vue?raw`)
    // console.log(msg.default);
    sourceCode.value = msg.default
 }
  
 onMounted(() => {
   getSourceCode()
 })
</script>

<style lang="scss" scoped></style>