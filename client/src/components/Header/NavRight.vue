<template>
    <div class='navRight'>
        <div class='loader' v-if='$store.state.isLoading'></div>
        <div class='auth' v-else-if='$store.state.userData'>
            <div class='dropdownCnt'>
                <button class='btn' @click='isExpanded = !isExpanded'>
                    <div class='image'>
                        <img :src='$store.state.userData.image' />
                    </div>
                    <div class='name'>
                        {{ $store.state.userData.name }}
                    </div>
                    <div class='arrow'>
                        <ChevronDown size='20' />
                    </div>
                </button>
                <div class='dropdownWrapper' :class='{ active: isExpanded }' @click='isExpanded = false'>
                    <div class='dropdown'>
                        <RouterLink class='link' :to='"/user/" + $store.state.userData.name'>
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
        <div class='unauth' v-else-if='!$store.state.userData'>
            <Link v-if='!route.path.includes("/signin")' class='white' path='/signin'>
            <LogIn size='20' /><span>Sign In</span>
            </Link>
            <Link v-if='!route.path.includes("/signup")' path='/signup'>
            <UserPlus size='20' /><span>Sign Up</span>
            </Link>
        </div>
    </div>
</template>

<script setup>
import store from '@/store/store';
import { ChevronDown } from 'lucide-vue-next';
import { CircleUserRound } from 'lucide-vue-next';
import { LogOut } from 'lucide-vue-next';
import { Settings } from 'lucide-vue-next';
import { LogIn, UserPlus } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
    store.getters.getUserData;
})

const isExpanded = ref(false);

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

.navRight {
    .unauth {
        @include flex();

        a {
            margin-left: 24px;

            span {
                font-size: 14px;
            }
        }
    }

    .auth {
        .dropdownCnt {
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

                .image {
                    @include flex();
                    min-width: 35px;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
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
                    transition: 0.2s;

                    &.active {
                        rotate: 180deg;
                    }
                }
            }

            .dropdownWrapper {
                position: absolute;
                height: calc(100vh);
                max-width: 1000px;
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
                    right: 16px;
                    padding: 8px 4px;
                    background-color: $bg-8;
                    box-shadow: inset 0 0 100px $fg-2;
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

//     .search {
//         @include flex(flex-start, $gap: 5px);
//         width: 200px;
//         height: 30px;
//         padding: 0 10px;
//         background-color: $fg-05;
//         box-shadow: inset 0 0 10px $fg-1;
//         border-radius: 4px;
//         color: $mid-75;
//         transition: 0.2s;

//         &:hover {
//             color: $fg;
//             background-color: $fg-1;
//         }

//         svg {
//             font-size: 20px;
//         }

//         span {
//             font-size: 14px;
//         }
//     }
// }

// .modalCnt {
//     @include flex();
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 100vh;
//     background-color: $black-5;
//     transition: 0.2s;
//     z-index: 1;
//     opacity: 0;
//     visibility: hidden;
//     pointer-events: none;

//     .searchModal {
//         @include flex(flex-start, $dir: column);
//         position: relative;
//         width: 600px;
//         min-height: 150px;
//         max-height: 400px;
//         background-color: $bg-8;
//         border-radius: 8px;
//         box-shadow: 0 0 10px $fg-3;

//         .input {
//             width: 100%;
//             padding: 16px 20px;
//             border-bottom: 1px solid $fg-3;
//         }

//         .closeModal {
//             position: absolute;
//             top: 16px;
//             right: 20px;
//             color: $mid-75;
//             transition: 0.2s;

//             &:hover {
//                 color: $fg;
//             }
//         }

//         .results {
//             @include flex(flex-start, $dir: column);
//             width: 100%;
//             padding: 5px;
//             overflow: auto;

//             .article {
//                 @include flex(flex-start);
//                 width: 100%;
//                 height: 40px;
//                 min-height: 40px;
//                 color: $mid-75;
//                 border-radius: 4px;
//                 transition: 0.2s;

//                 .image {
//                     @include flex();
//                     padding: 0 10px
//                 }

//                 .title {
//                     @include flex();
//                     font-size: 14px;
//                 }

//                 &:hover {
//                     color: $fg;
//                     background-color: $fg-1
//                 }
//             }
//         }

//         .notFound {
//             @include flex();
//             flex-grow: 1;
//             color: $mid-75;

//             span {
//                 margin-left: 5px;
//                 color: $fg;
//             }
//         }
//     }

//     &.show {
//         opacity: 1;
//         visibility: visible;
//         pointer-events: all;
//     }
// }

@media screen and (max-width: 850px) {
    // .navRight {
    //     .search {
    //         justify-content: center;
    //         width: 35px;
    //         height: 35px;
    //         padding: 0;
    //         background-color: transparent;

    //         svg {
    //             font-size: 28px;
    //         }

    //         span {
    //             display: none;
    //         }
    //     }
    // }
}

@media screen and (max-width: 650px) {
    .navRight {
        .unauth {
            a {
                padding: 6px;

                span {
                    display: none;
                }
            }
        }

        .auth {
            .dropdownCnt .btn {
                min-width: 45px;

                .name,
                .arrow {
                    display: none;
                }
            }

            // .modalCnt {
            //     .searchModal {
            //         height: 75vh;
            //         max-height: none;
            //         align-self: flex-end;
            //     }
            // }
        }
    }
}
</style>