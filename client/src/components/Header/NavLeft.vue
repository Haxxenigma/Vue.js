<template>
    <div class='navLeft'>
        <button class='toggle' @click='isExpanded = !isExpanded'>
            <Menu class='menu' v-if='!isExpanded' size='28' />
            <X class='xmark' v-if='isExpanded' size='28' />
        </button>
        <div class='mobLinks' v-if='isExpanded' @click='isExpanded = false'>
            <RouterLink v-for='link in $store.state.userData ? links.slice(2) : links' :to='link.path' class='link'>
                {{ link.label }}
            </RouterLink>
        </div>
        <RouterLink to='/' class='logo'>
            <img src='@/assets/logo.png' />
        </RouterLink>
        <div class='links'>
            <RouterLink v-for='link in links.slice(2)' :to='link.path' class='link'>
                {{ link.label }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const links = ref([
    {
        path: '/signin',
        label: 'Sign In',
    },
    {
        path: '/signup',
        label: 'Sign Up',
    },
    {
        path: '/',
        label: 'Home',
    },
    {
        path: '/about',
        label: 'About',
    },
    {
        path: '/blog',
        label: 'Blog',
    },
]);

const isExpanded = ref(false);
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.navLeft {
    @include flex();

    .toggle {
        @include flex();
        display: none;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        transition: 0.2s;

        &:hover {
            background-color: $fg-1;
        }

        &:active {
            transition: 0s;
            background-color: $fg-2;
        }

        .menu,
        .xmark {
            @include flex();
            position: absolute;
        }
    }

    .logo {
        @include flex();
        margin: 0 15px;

        img {
            width: 30px;
            height: 30px;
        }
    }

    .mobLinks {
        @include flex(flex-start, $dir: column);
        position: absolute;
        width: 100%;
        height: calc(100vh - 60px);
        padding: 0 20px;
        top: 60px;
        left: 0;
        right: 0;
        background-color: $bg-8;

        .link {
            @include flex(flex-start, $gap: 5px);
            width: 100%;
            max-width: 1000px;
            height: 50px;
            color: $mid;
            transition: 0.2s;

            &:hover {
                color: $fg;
            }

            &.active {
                color: $fg;
            }

            &[href='/signup'] {
                border-bottom: 1px solid $mid;
            }
        }
    }

    .links {
        @include flex($gap: 15px);

        .link {
            padding: 6px 16px;
            color: $mid-75;
            border-radius: 4px;
            font-size: 14px;
            transition: 0.2s;

            &:hover {
                background-color: $fg-1;
                color: $fg;
            }

            &::after {
                content: '';
                display: block;
                width: 100%;
                height: 1.7px;
                left: 0;
                right: 0;
                bottom: 0;
                scale: 0;
                background-color: $primary;
                border-radius: 4px;
                transform-origin: center;
                translate: 0 18px;
                transition: 0.2s;
                z-index: 1000;
            }

            &.router-link-active {
                color: $fg;

                &::after {
                    scale: 1;
                }
            }
        }
    }
}

@media screen and (max-width: 650px) {
    .navLeft {
        .toggle {
            display: flex;
        }

        .links {
            display: none;
        }
    }
}
</style>