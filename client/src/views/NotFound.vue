<template>
    <main class='main not-found'>
        <h1 class='title'>Not Found | 404</h1>
    </main>
</template>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.not-found {
    @include flex();

    .title {
        font-size: 24px;
    }
}
</style>