<template>
    <div class='my-modal' @click='closeModal'>
        <div class='content' @click.stop>
            <div class='message'>
                <slot name='message'></slot>
            </div>
            <slot></slot>
            <div class='buttons'>
                <slot name='buttons'>
                    <MyButton type='button' class='white' @click='closeModal'>
                        <X size='20' />
                        <slot name='no'>No!</slot>
                    </MyButton>
                    <MyButton type='button' :isSubmitting='isSubmitting' @click='$emit("onClick")'>
                        <slot name='yes'>Yes!</slot>
                    </MyButton>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { X } from 'lucide-vue-next';
</script>

<script>
export default {
    name: 'MyModal',
    props: ['closeModal', 'isSubmitting'],
    emits: ['onClick'],
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-modal {
    @include flex();
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $bg-5;

    .content {
        @include flex($dir: column);
        margin: 0 30px;
        padding: 24px 28px;
        background-color: $bg-8;
        box-shadow: 0 0 5px $fg-5;
        border-radius: 16px;

        .message {
            color: $mid-75;
            text-align: center;
            padding-bottom: 15px;
        }

        .buttons {
            @include flex($gap: 36px);
            margin-top: 30px
        }
    }
}
</style>