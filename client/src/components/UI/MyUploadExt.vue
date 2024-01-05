<template>
    <form class='my-upload'>
        <MyButton type='button' class='upload' @click='input.click()'>
            <Upload size='22' />Upload image for preview
            <input type='file' :id='id' :name='id'
                @change='setBlob($event.target.files[0]); $emit("update:value", $event.target.files[0])' ref='input' />
        </MyButton>
        <div class='image-cnt' v-if='blob || value'>
            <img class='image' :src='blob ? blob : value' />
            <button type='button' class='delete' @click='isModalOpen = true'>
                <X size='24' />
            </button>
        </div>
        <MyModal v-if='isModalOpen' :closeModal='closeModal' @onClick='deleteImage'>
            <template #message>Are you sure you want to delete your profile image?</template>
        </MyModal>
    </form>
</template>

<script setup>
import { Upload, X } from 'lucide-vue-next';
import { ref } from 'vue';

const emits = defineEmits(['update:value']);
const props = defineProps(['id', 'value', 'label', 'error']);
const isModalOpen = ref(false);
const blob = ref(null);
const input = ref();

function setBlob(image) {
    blob.value = image ? URL.createObjectURL(image) : null;
}

function closeModal() {
    isModalOpen.value = false;
}

async function deleteImage() {
    blob.value = '';
    emits('update:value', '');
    isModalOpen.value = false;
}
</script>

<script>
export default {
    name: 'MyUploadExt',
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-upload {
    position: relative;
    flex-basis: 80%;
    padding-top: 15px;
    margin: 25px 10px 0;

    .upload {
        flex-direction: column;

        input {
            display: none;
        }
    }

    .image-cnt {
        @include flex();
        position: relative;
        width: 60%;
        margin: auto;
        padding: 15px 5px;

        .image {
            width: 100%;
            height: auto;
        }

        .delete {
            @include flex();
            position: absolute;
            top: -12px;
            right: -12px;
            padding: 4px;
            background-color: $bg-8;
            border: 1px solid $fg-8;
            border-radius: 4px;
            transition: 0.2s;

            &:hover {
                box-shadow: inset 0 0 20px $fg-3;
            }

            &:active {
                transition: 0s;
                box-shadow: inset 0 0 20px $fg-5;
            }
        }
    }
}

@media screen and (max-width: 750px) {
    .my-upload .image-cnt {
        width: 90%;
    }
}
</style>