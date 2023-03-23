<template>
    <div class="container">
        <div class="sidebar">
            <ul v-for="item in routes" :key="item.path">
                <span>{{ item?.name }}</span>
                <li v-for="(ele, index) in (item as any).children" :key="ele"
                    @click="goPath(ele)">
                    {{ ele.name }}
                </li>
            </ul>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter, RouteRecordRaw } from 'vue-router';

const router = useRouter();

const routes = router.options.routes || [];

const goPath = (ele:any) => {
  router.push({
    path:ele.path
  })
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: flex-start;

    .sidebar {
        width: 180px;
        border-right: 1px solid #ccc;
        height: 100%;
    }

    .content {
        flex: 1;
        height: 100%;
    }
}
</style>