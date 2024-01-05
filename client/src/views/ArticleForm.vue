<template>
    <main class='main'>
        <form class='form' @submit.prevent='submit' v-if='fields'>
            <h1 class='title'>
                {{ article ? 'Article edition' : 'Article creation' }}
            </h1>
            <MyInputWrapper v-for='field in   fields.slice(0, 2)  ' :key='field.id' :error='field.error'>
                <MyInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event'
                    @keyup.space='onSpace' :class='{ "font-24": field.id === "title" }' />
            </MyInputWrapper>
            <MyToolbar :value='fields[2].value' @set:value='fields[2].value = $event' />
            <MyInputWrapper :error='fields[2].error'>
                <MyTextarea v-bind='fields[2]' @update:value='fields[2].value = $event'
                    @reset:error='fields[2].error = $event' ref='textarea' />
            </MyInputWrapper>
            <div class='form-markdown'>
                <MyButton type='button' class='white' @click='isMarkdownOpen = !isMarkdownOpen'>
                    {{ isMarkdownOpen ? 'Hide' : 'Show' }} content preview
                    <ChevronUp size='16' :class='{ active: !isMarkdownOpen }' />
                </MyButton>
                <Transition>
                    <Markdown v-if='isMarkdownOpen' :source='markdown' class='output' />
                </Transition>
            </div>
            <MyUploadExt v-bind='fields[3]' @update:value='fields[3].value = $event' />
            <div class='buttons'>
                <MyButton :isSubmitting='isSubmitting'>
                    {{ article ? 'Edit' : 'Create' }}
                </MyButton>
                <MyLink class='white' :to='article ? `/articles/${article.id}` : `/blog`'>
                    <X size='20' />Cancel
                </MyLink>
            </div>
            <div class='error' v-if='error'>{{ error }}</div>
        </form>
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { X, ChevronUp } from 'lucide-vue-next';
import { useSubmit } from '@/composables/useSubmit';
import { useAuth } from '@/composables/useAuth';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Markdown from 'vue3-markdown-it';
import store from '@/store';
import router from '@/router';

const route = useRoute();
const isAuth = ref(null);
const article = ref(null);
const fields = ref(null);
const isSubmitting = ref(false);
const isMarkdownOpen = ref(false);
const error = ref(null);
const markdown = ref('');
const textarea = ref();

isAuth.value = useAuth(isAuth.value, { redirectIfFail: true });

watch(() => store.state.articles, (arts) => {
    if (arts) {
        article.value = arts.find((art => route.params.id == art.id));
    }
    if (!route.params.id || article.value && store.state.user) {
        fields.value = [
            {
                id: 'title',
                label: 'Title',
                value: article.value?.title || '',
                error: '',
            },
            {
                id: 'tags',
                label: 'Tags',
                value: article.value?.tags.join(' ') || '',
                error: '',
            },
            {
                id: 'content',
                label: 'Content',
                value: article.value?.content || '',
                error: '',
            },
            {
                type: 'file',
                id: 'preview',
                label: 'Preview',
                value: article.value?.preview || '',
                error: '',
            },
        ];
    }
}, { immediate: true });

watch(() => fields.value?.[2]?.value, (text) => {
    markdown.value = text;
}, { immediate: true });

function onSpace() {
    let values = fields.value[1].value.split(' ');
    values = values.slice(0, values.length - 1);
    fields.value[1].value = '';
    values.forEach((value) => {
        if (!value.startsWith('#')) {
            fields.value[1].value += `#${value} `;
        } else {
            fields.value[1].value += `${value} `;
        }
    });
}

async function submit() {
    isSubmitting.value = true;
    const { data, err } = await useSubmit(
        fields.value, `/articles/${article.value?.id || ''}`, {
        method: article.value ? 'PATCH' : 'POST',
        refresh: false,
    });

    if (data) {
        if (typeof fields.value[3].value === 'object' || fields.value[3].value === '') {
            const formData = new FormData();
            formData.append('preview', fields.value[3].value);
            await useSubmit(formData, `/articles/${data.id}/preview`, {
                method: 'PATCH',
                redirect: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } else {
            router.replace(`/articles/${data.id}`);
            setTimeout(() => {
                router.go(0);
            }, 100);
        }
    }
    error.value = err;
    isSubmitting.value = false;
}
</script>

<style lang='scss'>
@import '@/styles/vars';
@import '@/styles/mixins';

.form-markdown {
    @include markdown();
    margin: 25px 10px 0;
    width: 100%;

    .my-button {
        padding: 2px 4px !important;
        font-size: 14px;

        svg {
            transition: 0.2s;

            &.active {
                rotate: 180deg;
            }
        }
    }

    .output {
        max-height: 500px;
        border-radius: 8px;
        background-color: $fg-1;
        overflow: auto;
    }
}
</style>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.form {
    padding: 25px;
    background-image: radial-gradient($primary-1 0%, $bg 65%);

    .title {
        color: $mid-75;
        font-size: 28px;
    }

    .my-input-wrapper {
        margin: 25px 10px 0;

        &:nth-child(5) {
            margin: 0 10px;
        }
    }

    .buttons {
        @include flex(flex-start, $gap: 30px);
        width: max-content;
        margin: 25px 0;
        padding: 16px 8px;
    }
}

@media screen and (max-width: 500px) {
    .form {
        padding: 25px;
    }
}
</style>