<template>
    <div class='main header' v-if='user'>
        <RouterLink class='imageCnt' :to='user.image'>
            <img class='image' :src='user.image' />
        </RouterLink>
        <div class='info'>
            <div class='name'>
                {{ user.name }}
            </div>
            <div class='createdAt'>
                Joined <span>{{ new Date(user.createdAt).toLocaleDateString('en-US', options) }}</span>
                <div class='birth'>
                    / {{ new Date().getFullYear() - new Date(user.birth).getFullYear() }} years old
                </div>
            </div>
            <div class='bio'>
                {{ user.bio }}
            </div>
        </div>
        <div class='actions'>
            <Link class='action' path='/settings' v-if='store.state.userData?.name === user.name'>
            <Settings size='24' />
            </Link>
        </div>
    </div>
    <Loader v-else />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Settings } from 'lucide-vue-next';
import axios from '@/utils/axios';
import store from '@/store/store';

const route = useRoute();
const router = useRouter();
const user = ref(null);
const options = ref({ year: 'numeric', month: 'short', day: 'numeric' });

async function fetchUserData() {
    if (route.params.name === store.state.userData?.name) {
        return store.state.userData;
    } else {
        try {
            const res = await axios.get(`/users/${route.params.name}`);
            return res.data;
        } catch (err) {
            if (err.response?.data?.message === 'Not Found') {
                router.push('/not-found');
            }
        }
    }
}

watch(() => route.params.name, async () => {
    user.value = await fetchUserData();
}, { immediate: true });
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.header {
    @include flex(flex-start, flex-start);
    position: relative;
    padding: 40px;

    .imageCnt {
        @include flex();
        width: 70px;
        height: 70px;
        border: 1px solid $primary;
        border-radius: 50%;
        overflow: hidden;

        .image {
            width: 100%;
            height: auto;
        }
    }

    .info {
        margin-left: 16px;

        .name {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 24px;
        }

        .createdAt {
            @include flex();
            margin-bottom: 5px;
            font-size: 12px;

            span {
                margin-left: 5px;
                font-size: 12px;
                font-weight: 600;
            }

            .birth {
                margin-left: 5px;
                font-size: 12px;
            }
        }
    }

    .actions {
        @include flex($gap: 10px);
        position: absolute;
        top: 40px;
        right: 40px;
    }
}

// .articles {
//     margin: 0 10pxs;

//     .title {
//         @include flex();
//         position: relative;
//         width: max-content;
//         margin-left: 10px;
//         border-bottom: 2px solid $primary;
//         user-select: none;

//         &:after {
//             content: '#';
//             position: absolute;
//             left: 105%;
//             font-size: 24px;
//             opacity: 0.5;
//             transition: 0.2s;
//         }

//         &:hover {
//             &::after {
//                 opacity: 1;
//             }
//         }

//         h2 {
//             font-size: 20px;
//             font-weight: 500;
//         }
//     }
// }

@media screen and (max-width: 500px) {
    .header {
        flex-direction: column;
        padding: 40px 10px;

        .imageCnt,
        .info {
            align-self: center;
            margin: 0;

            .name {
                text-align: center;
            }
        }

        .actions {
            width: 80%;
            right: 50%;
            justify-content: space-between;
            flex-direction: row-reverse;
            transform: translateX(50%);
        }
    }
}
</style>