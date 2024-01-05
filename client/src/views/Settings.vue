<template>
    <main class='main settings'>
        <button class='toggle' @click='isExpanded = true'>
            <ChevronRight size='24' />
        </button>
        <nav class='nav' :class='{ active: isExpanded }' @click='isExpanded = false'>
            <h1 class='title'>Settings</h1>
            <div class='links'>
                <RouterLink class='link' to='/settings'>
                    <Settings size='22' />General
                </RouterLink>
                <RouterLink class='link' to='/settings/password'>
                    <ShieldCheck size='22' />Password
                </RouterLink>
                <RouterLink class='link' to='/settings/advanced'>
                    <AlertCircle size='22' />Advanced
                </RouterLink>
            </div>
        </nav>
        <RouterView v-if='$store.state.user' />
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { ChevronRight, Settings, ShieldCheck, AlertCircle } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { ref } from 'vue';

const isExpanded = ref(false);
const isAuth = ref(false);

isAuth.value = useAuth(isAuth.value, { redirectIfFail: true });
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.settings {
    display: flex;
    flex-direction: row;
    padding: 15px;

    .toggle {
        @include flex();
        display: none;
        margin: 5px;
        color: $mid-75;
        background-color: $fg-05;
        border-radius: 4px;
        transition: 0.2s;

        &:hover {
            background-color: $fg-1;
            color: $fg;
        }

        &:active {
            transition: 0s;
            background-color: $fg-2;
            color: $fg;
        }
    }

    .nav {
        flex-basis: 25%;
        padding: 0 8px;

        .title {
            color: $mid-75;
            text-align: left;
            font-size: 28px;
            border-bottom: 1px solid $fg;
        }

        .links {
            @include flex(flex-start, $dir: column, $gap: 6px);
            padding: 12px 6px;

            .link {
                @include flex(flex-start, $gap: 5px);
                position: relative;
                width: 100%;
                padding: 8px 20px;
                color: $mid-75;
                border-radius: 8px;
                transition: 0.2s;

                &:hover {
                    background-color: $fg-1;
                    color: $fg;
                }

                &:active {
                    transition: 0s;
                    background-color: $fg-2;
                    color: $fg;
                }

                &::before {
                    content: '';
                    position: absolute;
                    width: 5px;
                    height: 60%;
                    left: 5px;
                    background-color: $fg;
                    border-radius: 8px;
                    transition: 0.2s;
                    scale: 0;
                    transform-origin: center;
                }

                &.router-link-exact-active {
                    background-color: $fg-1;
                    color: $fg;

                    &::before {
                        scale: 1;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 650px) {
    .settings {
        padding: 5px 5px 25px;

        .toggle {
            display: flex;
        }

        .nav {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: 0.2s;

            &.active {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
            }

            .title {
                background-color: $bg-8;
                width: 240px;
            }

            .links {
                background-color: $bg-8;
                width: 240px;
                height: 100%;
            }
        }
    }
}
</style>