<template>
    <main class='main'>
        <div class='article' v-if='article'>
            <nav class='links'>
                <MyLink class='link white' to='/blog'>
                    <ChevronLeft size='20' /><span>Back</span>
                </MyLink>
                <div v-if='$store.state.user && article.authorName === $store.state.user.name' class='links'>
                    <MyLink class='link' :to='`/articles/${article.id}/edit`'>
                        <Edit2 size='20' /><span>Edit</span>
                    </MyLink>
                    <MyButton class='link danger' @click='isModalOpen = true'>
                        <Trash2 size='20' /><span>Delete</span>
                    </MyButton>
                </div>
            </nav>
            <div class='title'>
                {{ article.title }}
            </div>
            <RouterLink :to='`/user/${article.authorName}`' class='author'>
                <div class='image-cnt'>
                    <img class='image' :src='article.author.image' />
                </div>
                <div class='name'>
                    {{ article.authorName }}
                </div>
            </RouterLink>
            <img class='preview' :src='article.preview' v-if='article.preview' />
            <div class='tags'>
                <div v-for='tag in article.tags' class='tag'>
                    {{ tag }}
                </div>
            </div>
            <div class='article-markdown'>
                <Markdown :source='article.content' class='output' />
            </div>

            <MyModal v-if='isModalOpen' :closeModal='closeModal' :isSubmitting='isSubmitting' @onClick='deleteArticle'>
                <template #message>Are you sure you want to delete this article?</template>
            </MyModal>
        </div>
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeft } from 'lucide-vue-next';
import { Edit2 } from 'lucide-vue-next';
import { Trash2 } from 'lucide-vue-next';
import { useSubmit } from '@/composables/useSubmit';
import Markdown from 'vue3-markdown-it';
import axios from '@/utils/axios';

const route = useRoute();
const router = useRouter();
const isModalOpen = ref(false);
const isSubmitting = ref(false);
const article = ref(null);

function closeModal() {
    isModalOpen.value = false;
}

async function deleteArticle() {
    isSubmitting.value = true;
    await useSubmit(null, `/articles/${article.value.id}`, {
        method: 'DELETE',
        redirectUrl: '/blog',
    });
    isSubmitting.value = false;
}

async function fetchArticle() {
    try {
        const res = await axios.get(`/articles/${route.params.id}`);
        return res.data;
    } catch (err) {
        if (err.response?.data?.message === 'Not Found') {
            router.push('/not-found');
        }
    }
}

watch(() => route.params.id, async () => {
    article.value = await fetchArticle();
}, { immediate: true });
</script>

<style lang='scss'>
@import '@/styles/vars';
@import '@/styles/mixins';

.article-markdown {
    @include markdown();
    padding: 10px 20px;
    background-image: radial-gradient($primary-1 0%, $bg 65%);
    overflow-wrap: break-word;
}
</style>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.article {
    padding: 30px 10px;

    .links {
        @include flex(flex-start, $gap: 15px);

        .link {
            @include flex($gap: 5px);
            padding: 4px 16px;
            color: $fg;
            background-color: $fg-1;
            border-radius: 4px;
            transition: 0.2s;

            &:hover {
                background-color: $fg-2;
            }

            &:active {
                transition: 0s;
                background-color: $fg-3;
            }

            svg {
                color: $primary;
            }

            &.white svg {
                color: $fg;
            }

            &.danger svg {
                color: $red;
            }
        }
    }

    .title {
        margin: 15px 0;
        font-size: 24px;
    }

    .author {
        @include flex(flex-start, $gap: 8px);
        width: max-content;
        padding: 3px 8px;
        color: $mid-75;
        background-color: $fg-05;
        border-radius: 8px;
        transition: 0.2s;

        &:hover {
            color: $fg;
            background-color: $fg-1;
        }

        .image-cnt {
            @include flex();
            min-width: 40px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

            .image {
                width: 100%;
                height: auto;
            }
        }
    }

    .preview {
        display: block;
        width: 60%;
        height: auto;
        margin: auto;
    }

    .tags {
        @include flex(flex-start, $wrap: wrap, $gap: 10px);
        margin: 15px 10px;

        .tag {
            padding: 4px 16px;
            color: $mid-75;
            background-color: $fg-1;
            border-radius: 4px;
            transition: 0.2s;

            &:hover {
                color: $fg;
                background-color: $fg-2;
            }

            &:active {
                transition: 0s;
                color: $fg;
                background-color: $fg-3;
            }
        }
    }
}

@media screen and (max-width: 450px) {
    .article .links .link {
        padding: 8px 10px;

        span {
            display: none;
        }
    }
}
</style>