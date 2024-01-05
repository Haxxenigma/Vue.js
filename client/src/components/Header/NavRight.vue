<template>
    <div class='nav-right'>
        <div class='loader' v-if='store.state.isUserLoading'></div>
        <div class='auth' v-else-if='store.state.user'>
            <div class='dropdown-cnt'>
                <button class='btn' @click='isExpanded = !isExpanded'>
                    <div class='image-cnt'>
                        <img class='image' :src='store.state.user.image' />
                    </div>
                    <div class='name'>
                        {{ store.state.user.name }}
                    </div>
                    <div class='arrow' :class='{ active: isExpanded }'>
                        <ChevronDown size='20' />
                    </div>
                </button>
                <div class='dropdown-wrapper' :class='{ active: isExpanded }' @click='isExpanded = false'>
                    <div class='dropdown'>
                        <RouterLink class='link' :to='"/user/" + store.state.user.name'>
                            <CircleUserRound size='22' />Profile
                        </RouterLink>
                        <RouterLink class='link' to='/settings'>
                            <Settings size='22' />Settings
                        </RouterLink>
                        <button class='link' @click='signout'>
                            <LogOut size='22' />Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class='unauth' v-else-if='!store.state.user'>
            <MyLink v-if='!$route.path.includes("/signin")' class='white' to='/signin'>
                <LogIn size='20' /><span>Sign In</span>
            </MyLink>
            <MyLink v-if='!$route.path.includes("/signup")' to='/signup'>
                <UserPlus size='20' /><span>Sign Up</span>
            </MyLink>
        </div>
    </div>
</template>

<script setup>
import { ChevronDown, CircleUserRound, LogOut, Settings, LogIn, UserPlus } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import store from '@/store';
import router from '@/router';

const isExpanded = ref(false);

onMounted(() => {
    store.dispatch('fetchUser');
    store.dispatch('fetchArticles');
});

function signout() {
    localStorage.removeItem('token');
    sessionStorage.setItem('popup', 'You have successfully signed out of your account');
    router.replace('/');
    setTimeout(() => {
        router.go(0);
    }, 100);
}
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.nav-right {
    .unauth {
        @include flex();

        .my-link {
            margin-left: 24px;

            span {
                font-size: 14px;
            }
        }
    }

    .auth {
        .dropdown-cnt {
            .btn {
                @include flex(space-between, $gap: 5px);
                min-width: 120px;
                height: 45px;
                padding: 0 5px;
                border-radius: 8px;
                transition: 0.2s;

                &:hover {
                    background-color: $fg-1;

                    .name,
                    .arrow {
                        color: $fg;
                    }
                }

                &:active {
                    transition: 0s;
                    background-color: $fg-2;

                    .name,
                    .arrow {
                        color: $fg;
                    }
                }

                .image-cnt {
                    @include flex();
                    min-width: 35px;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    overflow: hidden;

                    .image {
                        width: 100%;
                        height: auto;
                    }
                }

                .name {
                    @include flex(flex-start);
                    color: $mid-75;
                    transition: 0.2s;

                    span {
                        max-width: 75px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .arrow {
                    @include flex();
                    color: $mid-75;
                    transition: 0.1s;

                    &.active {
                        rotate: 180deg;
                    }
                }
            }

            .dropdown-wrapper {
                position: absolute;
                max-width: 1000px;
                height: 100vh;
                top: 0;
                right: 0;
                left: 0;
                margin: 0 auto;
                pointer-events: none;

                .dropdown {
                    @include flex($dir: column, $gap: 5px);
                    position: absolute;
                    width: 200px;
                    top: 60px;
                    right: 8px;
                    padding: 8px 4px;
                    background-color: $bg-8;
                    box-shadow: inset 0 0 90px $fg-2;
                    border-radius: 4px;
                    transition: 0.2s;
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    z-index: 1;

                    .link {
                        @include flex(flex-start, $gap: 5px);
                        width: 100%;
                        height: 40px;
                        padding: 8px 12px;
                        color: $mid-75;
                        border-radius: 4px;
                        transition: 0.2s;

                        &:hover {
                            color: $fg;
                            background-color: $fg-1;
                        }

                        &:active {
                            color: $fg;
                            background-color: $fg-2;
                        }
                    }
                }

                &.active {
                    pointer-events: all;

                    .dropdown {
                        top: 70px;
                        opacity: 1;
                        visibility: visible;
                        pointer-events: all;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 650px) {
    .nav-right {
        .unauth .my-link {
            padding: 6px;

            span {
                display: none;
            }
        }

        .auth .dropdown-cnt .btn {
            min-width: 45px;

            .name,
            .arrow {
                display: none;
            }
        }
    }
}
</style>