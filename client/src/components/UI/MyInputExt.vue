<template>
    <input :type='type' :id='id' :name='id' :value='value' :class='{ "not-empty": value !== "", "is-error": error !== "" }'
        v-bind='$attrs' class='my-input-ext' autocomplete='off'
        @input='$emit("update:value", $event.target.value); $emit("reset:error", "")' />
    <div class='my-input-ext-label'>{{ label }}</div>
</template>

<script>
export default {
    name: 'MyInputExt',
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

.my-input-ext {
    flex-basis: 80%;
    padding: 10px 12px;
    background-color: $fg-05;
    border-bottom: 2px solid $primary-2;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
        background-color: $fg-1;
        border-bottom: 2px solid $primary-4;
    }

    &:focus {
        background-color: $fg-2;
    }

    &:focus,
    &.not-empty {
        border-bottom: 2px solid $primary;

        ~.my-input-ext-label {
            color: $primary;
        }
    }

    &.is-error {
        border-bottom: 2px solid $red-3;

        ~.my-input-ext-label {
            color: $red-7;
        }

        &:hover {
            border-bottom: 2px solid $red-5;
        }

        &:focus,
        &.not-empty {
            border-bottom: 2px solid $red;

            ~.my-input-ext-label {
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

.my-input-ext-label {
    order: -1;
    flex-basis: 20%;
    color: $primary-7;
    text-align: end;
    pointer-events: none;
    transition: 0.2s;
}

@media screen and (max-width: 650px) {
    .my-input-ext {
        width: 100%;
    }
}
</style>