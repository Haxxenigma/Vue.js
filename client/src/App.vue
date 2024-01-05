<template>
    <MyForbidden v-if='isError403' />
    <div v-else>
        <MyHeader />
        <RouterView />
        <MyFooter />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MyForbidden from '@/components/Forbidden/MyForbidden';
import MyHeader from '@/components/Header/MyHeader';
import MyFooter from '@/components/Footer/MyFooter';
import store from './store';

const isError403 = ref(false);

watch(() => store.state.isError403, () => {
    isError403.value = store.state.isError403;
}, { immediate: true });
</script>

<style lang='scss' src='@/styles/reset.scss' />