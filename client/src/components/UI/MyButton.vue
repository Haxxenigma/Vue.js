<template>
    <button class='my-button' :disabled='isSubmitting'>
        <slot name='not-loader' v-if='isSubmitting !== undefined'>
            <Check size='20' class='not-loader' v-if='!isSubmitting' />
        </slot>
        <slot name='loader'>
            <Loader size='18' class='loader' v-if='isSubmitting' />
        </slot>
        <slot></slot>
    </button>
</template>

<script>
import { Loader, Check } from 'lucide-vue-next';
export default {
    name: 'MyButton',
    components: { Loader, Check },
    props: ['isSubmitting'],
};
</script>

<style src='@/styles/button.scss' lang='scss' scoped />