<template>
    <div class='main error'>
        <h1 class='title'>Something went wrong</h1>
    </div>
</template>

<script>
export default {
    name: 'Error',
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.error {
    @include flex();

    .title {
        font-size: 24px;
    }
}
</style>