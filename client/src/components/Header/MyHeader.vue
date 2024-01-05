<template>
    <header class='header'>
        <nav class='nav'>
            <NavLeft />
            <NavRight />
        </nav>
    </header>
    <PopUp />
</template>

<script setup>
import NavLeft from './NavLeft.vue';
import NavRight from './NavRight.vue';
import PopUp from './PopUp.vue';
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.header {
    @include flex();
    position: sticky;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 16px;
    background-color: $bg-6;
    box-shadow: 0 1px 3px $fg-3;
    backdrop-filter: blur(5px);
    z-index: 100;
}

.nav {
    @include flex(space-between);
    width: 100%;
    height: 100%;
    max-width: 1000px;
}
</style>