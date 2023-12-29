<template>
    <div class='field'>
        <div class='container'>
            <input :type='type' :id='id' :name='id' :value='value'
                :class='{ notEmpty: value !== "", isError: error !== "" }' class='input' autocomplete='off'
                @input='$emit("update:value", $event.target.value); $emit("reset:error", "")' />
            <div class='label'>{{ label }}</div>
        </div>
        <div class='error' v-if='error'>{{ error }}</div>
    </div>
</template>

<script>
export default {
    name: 'Input',
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

.field {
    width: 100%;

    .container {
        position: relative;

        .input {
            width: 100%;
            padding: 20px 16px 4px;
            background-color: $primary-01;
            border-bottom: 1px solid $primary-2;
            border-radius: 4px;
            transition: 0.2s;

            &:hover {
                background-color: $primary-05;
                border-bottom: 1px solid $primary-4;
            }

            &:focus,
            &.notEmpty {
                background-color: $primary-1;
                border-bottom: 1px solid $primary;

                ~.label {
                    top: 25%;
                    color: $primary;
                    font-size: 14px;
                }
            }

            &.isError {
                background-color: $red-05;
                border-bottom: 1px solid $red-2;

                ~.label {
                    color: $red-7;
                }

                &:hover {
                    background-color: $red-1;
                    border-bottom: 1px solid $red-4;
                }

                &:focus,
                &.notEmpty {
                    background-color: $red-2;
                    border-bottom: 1px solid $red;

                    ~.label {
                        color: $red;
                    }
                }
            }
        }

        .label {
            position: absolute;
            top: 50%;
            left: 16px;
            color: $primary-7;
            transform: translateY(-50%);
            pointer-events: none;
            transition: 0.2s;
        }
    }

    .error {
        color: $red;
        padding: 2px 8px;
        text-shadow: 0 0 5px $fg-2;
        font-size: 14px;
    }
}
</style>