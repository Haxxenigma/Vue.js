<template>
    <main class='main profile'>
        <div class='header' v-if='user'>
            <a class='imageCnt' :href='user.image'>
                <img class='image' :src='user.image' />
            </a>
            <div class='info'>
                <div class='name'>
                    {{ user.name }}
                </div>
                <div class='createdAt'>
                    Joined <span>{{ new Date(user.createdAt).toLocaleDateString('en-US', options) }}</span>
                    <div class='birth' v-if='user.birth'>
                        / {{ new Date().getFullYear() - new Date(user.birth).getFullYear() }} years old
                    </div>
                </div>
                <div class='bio'>
                    {{ user.bio }}
                </div>
            </div>
            <div class='actions'>
                <MyLink class='action' to='/settings' v-if='store.state.user?.name === user.name'>
                    <Settings size='24' />
                </MyLink>
            </div>
        </div>
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Settings } from 'lucide-vue-next';
import axios from '@/utils/axios';
import router from '@/router';
import store from '@/store';

const route = useRoute();
const user = ref(null);
const options = ref({ year: 'numeric', month: 'short', day: 'numeric' });

async function fetchUserData() {
    if (route.params.name === store.state.user?.name) {
        return store.state.user;
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