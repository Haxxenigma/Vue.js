<template>
    <div class='my-input-ext-wrapper'>
        <div class='container'>
            <slot></slot>
        </div>
        <div class='container'>
            <MyError :error='error' />
            <div class='my-input-ext-label'></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyInputExtWrapper',
    props: {
        error: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-input-ext-wrapper .container {
    @include flex($gap: 25px);

    .my-input-ext-label {
        order: -1;
        flex-basis: 25%;
    }
}

@media screen and (max-width: 650px) {
    .my-input-ext-wrapper .container {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
}
</style>