<template>
    <main class='forbidden'>
        <h1 class='title'>
            Forbidden
        </h1>
    </main>
</template>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.forbidden {
    @include flex();
    height: 100vh;

    .title {
        font-size: 24px;
        color: $mid-75;
    }
}
</style>