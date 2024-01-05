<template>
    <main class='main blog'>
        <nav class='links'>
            <MyLink to='/articles/create' class='link'>
                <Edit3 size='20' />Create article
            </MyLink>
        </nav>
        <div class='articles' v-if='articles'>
            <div v-for='article in articles' :key='article.id' class='article'>
                <RouterLink class='preview-cnt' :to='`/articles/${article.id}`'>
                    <img class='preview' :src='article.preview' v-if='article.preview' />
                </RouterLink>
                <div class='row'>
                    <div class='date'>
                        {{ new Date(article.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year:
                                'numeric',
                        }) }}
                    </div>
                    <RouterLink :to='`/user/${article.authorName}`' class='author'>
                        <div class='image-cnt'>
                            <img class='image' :src='article.author.image' />
                        </div>
                        <div class='name'>
                            {{ article.authorName }}
                        </div>
                    </RouterLink>
                </div>
                <RouterLink class='title' :to='`/articles/${article.id}`'>
                    {{ article.title }}
                </RouterLink>
                <div v-if='article.tags[0]' class='tags'>
                    <RouterLink v-for='tag in article.tags' class='tag' :to='`/blog?tags=${tag}`'>
                        {{ tag }}
                    </RouterLink>
                </div>
                <div class='blog-markdown'>
                    <Markdown :source='article.content' class='output' />
                </div>
                <RouterLink class='read-more' :to='`/articles/${article.id}`'>
                    Read more
                </RouterLink>
            </div>
        </div>
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { Edit3 } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import Markdown from 'vue3-markdown-it';
import store from '@/store';

const articles = ref(null);

watch(() => store.state.articles, (arts) => {
    articles.value = arts;
}, { immediate: true });
</script>

<style lang='scss'>
@import '@/styles/vars';
@import '@/styles/mixins';

.blog-markdown {
    @include markdown();
    max-height: 100px;
    overflow: hidden;

    * {
        margin: 0 !important;
        padding: 0 !important;
    }
}
</style>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.blog {
    padding: 16px 24px;

    .articles {
        @include flex(space-between, flex-start, $wrap: wrap, $gap: 50px);
        padding: 16px 24px;

        .article {
            display: flex;
            flex-direction: column;
            flex-basis: 45%;
            padding: 5px 10px;
            background-color: $fg-1;
            border-radius: 8px;

            .title {
                padding: 8px 0;
                font-size: 24px;
                font-weight: 500;
                transition: 0.2s;

                &:hover {
                    text-shadow: 0 0 5px $fg;
                }
            }

            .row {
                @include flex(space-between);
                padding-top: 10px;

                .date {
                    color: $mid-75;
                    font-size: 14px;
                }

                .author {
                    @include flex(flex-start, $gap: 8px);
                    width: max-content;
                    padding: 2px 4px;
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
                        min-width: 25px;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        overflow: hidden;

                        .image {
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }

            .preview-cnt {
                .preview {
                    width: 100%;
                }
            }

            .tags {
                @include flex(flex-start, $wrap: wrap, $gap: 10px);
                margin: 15px 0;

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

            .read-more {
                @include flex();
                margin-top: 8px;
                padding: 4px;
                color: $mid-75;
                background-color: $fg-1;
                border-radius: 8px;
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
}

@media screen and (max-width: 650px) {
    .blog .articles .article {
        flex-basis: 100%;
    }
}
</style>