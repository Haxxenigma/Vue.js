<template>
    <form class='my-upload'>
        <div class='image-cnt'>
            <img class='image' :src='$store.state.user.image' />
        </div>
        <div class='dropdown-wrapper' v-if='isDropdownOpen' @click='isDropdownOpen = false'></div>
        <div class='dropdown-cnt'>
            <MyButton type='button' class='toggle' @click='isDropdownOpen = !isDropdownOpen'>
                <Edit size='18' />Edit
            </MyButton>
            <div class='dropdown' :class='{ active: isDropdownOpen }'>
                <label :for='id' class='btn'>
                    <Upload size='18' />Upload
                    <input type='file' :id='id' :name='id' @change='setBlob' ref='input' />
                </label>
                <button type='button' class='btn' @click='isDeleteModalOpen = true'>
                    <Trash size='18' />Delete
                </button>
            </div>
        </div>

        <MyModal v-if='isModalOpen' :closeModal='closeModal' :isSubmitting='isSubmitting' @onClick='uploadImage'>
            <template #message>Are you sure you want to update your profile image?</template>
            <div class='image-cnt'>
                <img class='image' :src='blob' />
            </div>
        </MyModal>

        <MyModal v-if='isDeleteModalOpen' :closeModal='closeDeleteModal' :isSubmitting='isSubmitting'
            @onClick='deleteImage'>
            <template #message>Are you sure you want to delete your profile image?</template>
        </MyModal>
    </form>
</template>

<script setup>
import { Edit, Upload, Trash, X } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from '@/utils/axios';
import store from '@/store';

const router = useRouter();
const isSubmitting = ref(false);
const isDropdownOpen = ref(false);
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const blob = ref(null);
const input = ref();

function setBlob(e) {
    blob.value = e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null;
    isDropdownOpen.value = false;

    if (blob.value) {
        isModalOpen.value = true;
    }
}

function closeModal() {
    isModalOpen.value = false;
    blob.value = false;
    input.value.files = null;
}

function closeDeleteModal() {
    isDeleteModalOpen.value = false;
}

async function uploadImage() {
    try {
        isSubmitting.value = true;
        const formData = new FormData();
        formData.append('image', input.value.files[0]);
        const res = await axios.post(`/users/${store.state.user.name}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        sessionStorage.setItem('popup', res.data.message);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } catch (err) {
        sessionStorage.setItem('popup-err', err.response.data.message);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } finally {
        isSubmitting.value = false;
    }
}

async function deleteImage() {
    try {
        isSubmitting.value = true;
        const res = await axios.delete(`/users/${store.state.user.name}/image`);
        sessionStorage.setItem('popup', res.data.message);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } catch (err) {
        sessionStorage.setItem('popup-err', err.response.data.message);
        setTimeout(() => {
            router.go(0);
        }, 100);
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<script>
export default {
    name: 'MyUpload',
    props: ['id'],
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.my-upload {
    flex-basis: 80%;
    position: relative;

    .my-modal {
        .image-cnt {
            margin-top: 10px;
        }
    }

    .image-cnt {
        @include flex();
        width: 120px;
        height: 120px;
        border: 1px solid $primary;
        border-radius: 50%;
        overflow: hidden;

        .image {
            width: 100%;
            height: auto;
        }
    }

    .dropdown-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .dropdown-cnt {
        position: absolute;
        top: 75%;
        left: 0;
        pointer-events: none;

        .toggle {
            background-color: $bg-5;
            backdrop-filter: blur(5px);
            pointer-events: all;
        }

        .dropdown {
            @include flex($dir: column);
            position: relative;
            color: $mid-75;
            background-color: $bg-8;
            border: 1px solid $fg-5;
            border-radius: 8px;
            overflow: hidden;
            visibility: hidden;
            opacity: 0;
            transition: 0.2s;

            &.active {
                margin-top: 10px;
                pointer-events: all;
                visibility: visible;
                opacity: 1;
            }

            .btn {
                @include flex($gap: 5px);
                width: 100%;
                padding: 8px 28px;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    color: $fg;
                    background-color: $fg-1;
                }

                &:active {
                    transition: 0s;
                    color: $fg;
                    background-color: $fg-2;
                }

                * {
                    pointer-events: none;
                }
            }

            input {
                display: none;
            }
        }
    }
}
</style>