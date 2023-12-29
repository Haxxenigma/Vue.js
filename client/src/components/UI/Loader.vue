<template>
    <div class='main loaderCnt'>
        <div class='loader' />
        <div class='slot'>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.loaderCnt {
    @include flex($dir: column);

    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid $fg;
        border-bottom-color: $primary;
        border-radius: 50%;
        animation: spin 0.5s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .slot {
        margin-top: 12px;
        color: $mid-75;
    }
}
</style>