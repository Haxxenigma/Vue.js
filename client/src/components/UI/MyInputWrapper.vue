<template>
    <div class='my-input-wrapper'>
        <div class='container' :class='{ "is-error": error }'>
            <slot></slot>
        </div>
        <MyError :error='error' />
    </div>
</template>

<script>
export default {
    name: 'MyInputWrapper',
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

.my-input-wrapper {
    width: 100%;

    .container {
        position: relative;
        border-radius: 4px;
        overflow: hidden;

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1.5px;
            left: 0;
            bottom: 0;
            background-color: $primary;
            transform-origin: center;
            transition: 0.3s;
            scale: 0;
        }

        &.is-error {
            &::after {
                background-color: $red;
            }
        }

        &:focus-within {
            &::after {
                scale: 1;
            }
        }
    }
}
</style>