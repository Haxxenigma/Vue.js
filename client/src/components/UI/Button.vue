<template>
    <button class='button' :disabled='isSubmitting'>
        <slot name='notLoader' v-if='isSubmitting !== undefined'>
            <Check size='20' v-if='!isSubmitting' />
        </slot>
        <slot name='loader'>
            <Loader size='18' class='loader' v-if='isSubmitting' />
        </slot>
        <slot />
    </button>
</template>

<script>
import { Loader, Check } from 'lucide-vue-next';
export default {
    name: 'Button',
    components: { Loader, Check },
    props: ['isSubmitting'],
};
</script>

<style src='@/styles/button.scss' lang='scss' scoped />