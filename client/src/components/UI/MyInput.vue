<template>
    <input :type='type' :id='id' :name='id' :value='value' :class='{ "not-empty": value !== "", "is-error": error !== "" }'
        v-bind='$attrs' class='my-input' autocomplete='off'
        @input='$emit("update:value", $event.target.value); $emit("reset:error", "")' />
    <div class='my-label'>{{ label }}</div>
</template>

<script>
export default {
    name: 'MyInput',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        id: String,
        label: String,
        value: String,
        error: {
            type: String,
            default: '',
        },
    },
    emits: ['update:value', 'reset:error'],
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-input {
    @include my-input();
}
</style>