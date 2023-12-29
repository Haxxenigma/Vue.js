<template>
    <div class='field'>
        <div class='container'>
            <input :type='type' :id='id' :name='id' :value='value'
                :class='{ notEmpty: value !== "", isError: error !== "" }' class='input' autocomplete='off'
                @input='$emit("update:value", $event.target.value); $emit("reset:error", "")' v-if='type !== "file"' />
            <Upload :id='id' v-else />
            <div class='label'>{{ label }}</div>
        </div>
        <div class='container'>
            <div class='error' v-if='error'>{{ error }}</div>
            <div class='label'></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputExt',
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
    .container {
        @include flex($gap: 25px);

        .input {
            flex-basis: 80%;
            padding: 10px 12px;
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
                    color: $primary;
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

            &[type='date']::-webkit-calendar-picker-indicator {
                background-color: $mid-75;
                border-radius: 4px;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    background-color: $fg;
                }
            }
        }

        .label {
            order: -1;
            flex-basis: 20%;
            color: $primary-7;
            text-align: end;
            pointer-events: none;
            transition: 0.2s;
        }
    }

    .error {
        flex-basis: 80%;
        color: $red;
        padding: 2px 0;
        text-shadow: 0 0 5px $fg-2;
        font-size: 14px;
    }
}

@media screen and (max-width: 650px) {
    .field .container {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;

        .input {
            width: 100%;
        }
    }
}
</style>