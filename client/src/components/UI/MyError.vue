<template>
    <div class='my-error' v-if='error'>
        <Info size='16' />{{ error }}
    </div>
</template>

<script setup>
import { Info } from 'lucide-vue-next';
</script>

<script>
export default {
    name: 'MyError',
    props: ['error'],
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-error {
    @include flex(flex-start, $gap: 5px);
    width: 100%;
    padding: 2px 8px;
    color: $red;
    text-shadow: 0 0 5px $fg-2;
    font-size: 14px;
}
</style>