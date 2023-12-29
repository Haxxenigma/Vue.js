<template>
    <div class='main notFound'>
        <h1 class='title'>Not Found | 404</h1>
    </div>
</template>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.notFound {
    @include flex();

    .title {
        font-size: 24px;
    }
}
</style>