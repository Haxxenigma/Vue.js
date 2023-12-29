<template>
    <Transition>
        <div class='popup' :class='{ error: error }' v-if='message || error' @click='message = null; error = null'>
            <div class='message'>
                <Info size='24' :stroke='message ? "hsl(163, 100%, 50%)" : "hsl(0, 100%, 50%)"' />
                {{ message || error }}
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { Info } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const message = ref(null);
const error = ref(null);

onMounted(() => {
    const msg = sessionStorage.getItem('popup');
    const err = sessionStorage.getItem('popup-err');

    if (msg) {
        message.value = msg;
        sessionStorage.removeItem('popup');

        setTimeout(() => {
            message.value = null;
        }, 5000);
    } else if (err) {
        error.value = err;
        sessionStorage.removeItem('popup-err');

        setTimeout(() => {
            error.value = null;
        }, 5000);
    }
});
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.popup {
    position: fixed;
    padding: 8px 16px;
    top: 70px;
    left: 50%;
    background-color: $bg-8;
    box-shadow: 0 0 5px $primary;
    border-radius: 4px;
    backdrop-filter: blur(1px);
    transform: translateX(-50%);
    transition: 0.3s;
    z-index: 1;

    &.error {
        box-shadow: 0 0 5px $red;
    }

    .message {
        @include flex($gap: 8px);
    }

    svg {
        min-width: 24px;
    }
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>