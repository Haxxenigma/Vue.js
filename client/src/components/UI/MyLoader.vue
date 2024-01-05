<template>
    <div class='my-loader'>
        <div class='loader'></div>
        <div class='loader-slot'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyLoader',
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-loader {
    @include flex($dir: column);
    flex-grow: 1;

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

    .loader-slot {
        margin-top: 12px;
        color: $mid-75;
    }
}
</style>