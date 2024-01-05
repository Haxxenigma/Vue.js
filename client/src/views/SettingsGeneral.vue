<template>
    <form class='form' @submit.prevent='update'>
        <h2 class='title'>General</h2>
        <MyInputExtWrapper v-for='field in fields.slice(0, 4)' :key='field.id' :error='field.error'>
            <MyInputExt v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
        </MyInputExtWrapper>
        <div class='container'>
            <MyUpload :id='fields[4].id' />
            <div class='label'>{{ fields[4].label }}</div>
        </div>
        <div class='container'>
            <div class='buttons'>
                <MyButton :isSubmitting='isSubmitting'>
                    Save
                </MyButton>
                <MyLink class='white' :to='"/users/" + store.state.user.name'>
                    <X size='20' />Cancel
                </MyLink>
            </div>
            <div class='label'></div>
        </div>
        <div class='container'>
            <MyError :error='error' />
            <div class='label'></div>
        </div>
    </form>
</template>

<script setup>
import { useSubmit } from '@/composables/useSubmit';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';
import store from '@/store';

const fields = ref([
    {
        id: 'name',
        label: 'Name*',
        value: store.state.user.name,
        error: '',
    },
    {
        id: 'email',
        label: 'E-Mail*',
        value: store.state.user.email,
        error: '',
    },
    {
        id: 'bio',
        label: 'Bio',
        value: store.state.user.bio || '',
        error: '',
    },
    {
        type: 'date',
        id: 'birth',
        label: 'Birth',
        value: store.state.user.birth
            ? new Date(store.state.user.birth)
                ?.toISOString().substring(0, 10) : '',
        error: '',
    },
    {
        type: 'file',
        id: 'image',
        label: 'Image',
        value: '',
        error: '',
    },
    {
        id: 'initialEmail',
        value: store.state.user.email,
    },
]);

const isSubmitting = ref(false);
const error = ref(null);

async function update() {
    isSubmitting.value = true;
    const { err } = await useSubmit(
        fields.value,
        `/users/${store.state.user.name}`,
        { method: 'PATCH' },
    );
    error.value = err;
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/settings.scss' scoped />