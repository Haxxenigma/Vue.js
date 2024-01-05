<template>
    <div class='my-toolbar'>
        <button type='button' @click='add("## ", 3)'>
            <Heading />
            <div class='tooltip'>
                Heading
            </div>
        </button>
        <button type='button' @click='add("****", 2)'>
            <Bold />
            <div class='tooltip'>
                Bold
            </div>
        </button>
        <button type='button' @click='add("**", 1)'>
            <Italic />
            <div class='tooltip'>
                Italic
            </div>
        </button>
        <button type='button' @click='add("~~~~", 2)'>
            <Strikethrough />
            <div class='tooltip'>
                Strikethrough
            </div>
        </button>
        <button type='button' @click='add("[link](https://...)", 7, 18)'>
            <Link />
            <div class='tooltip'>
                Link
            </div>
        </button>
        <button type='button' @click='add("![image-alt](https://...)", 13, 24)'>
            <Image />
            <div class='tooltip'>
                Image
            </div>
        </button>
        <button type='button' @click='add("``", 1)'>
            <Terminal />
            <div class='tooltip'>
                Inline code
            </div>
        </button>
        <button type='button' @click='add("```\n\n```", 4)'>
            <Code2 />
            <div class='tooltip'>
                Code
            </div>
        </button>
        <button type='button' @click='add("> ", 2)'>
            <Quote />
            <div class='tooltip'>
                Blockquote
            </div>
        </button>
    </div>
</template>

<script setup>
import { Heading, Bold, Italic, Strikethrough, Link, Image, Terminal, Code2, Quote } from 'lucide-vue-next';
import { onMounted } from 'vue';

const props = defineProps(['value']);
const emit = defineEmits(['set:value']);
let textarea = null;

onMounted(() => {
    textarea = document.querySelector('textarea');
});

function add(text, shift, shift2) {
    textarea.focus();
    const value = props.value;
    const position = textarea.selectionStart;
    emit('set:value', value.slice(0, position) + text + value.slice(position));
    const shiftedPos = position + shift;
    const shiftedPos2 = shift2 ? position + shift2 : position + shift;
    setTimeout(() => {
        textarea.setSelectionRange(shiftedPos, shiftedPos2);
    }, 10);
}
</script>

<script>
export default {
    name: 'MyToolbar',
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-toolbar {
    @include flex(flex-start, $gap: 8px);
    width: 100%;
    margin: 25px 10px 0;
    background-color: $fg-01;

    button {
        @include flex();
        @include tooltip();
        position: relative;
        padding: 8px;
        color: $mid-75;
        border-radius: 4px;
        transition: 0.2s;

        &:hover {
            color: $fg;
            background-color: $fg-1;
        }

        &:active {
            transition: 0s;
            color: $fg;
            background-color: $fg-2;
        }

        .tooltip {
            top: auto;
            bottom: 120%;
        }
    }
}

@media screen and (max-width: 550px) {
    .my-toolbar {
        overflow: auto;
    }
}
</style>