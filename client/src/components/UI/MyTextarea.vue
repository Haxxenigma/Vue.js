<template>
    <textarea type='type' :id='id' :name='id' :value='value'
        :class='{ "not-empty": value !== "", "is-error": error !== "" }' v-bind='$attrs' class='my-textarea'
        autocomplete='off' rows='7'
        @input='$emit("update:value", $event.target.value); $emit("reset:error", "")'></textarea>
    <div class='my-label'>{{ label }}</div>
</template>

<script>
export default {
    name: 'MyTextarea',
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

.my-textarea {
    @include my-input(16px, 2px, none);
    vertical-align: top;
    resize: none;

    ~.my-label {
        backdrop-filter: blur(1px);
    }
}
</style>