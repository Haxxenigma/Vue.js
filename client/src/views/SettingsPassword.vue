<template>
    <form class='form' @submit.prevent='update'>
        <h2 class='title'>Password</h2>
        <MyInputExtWrapper v-for='field in fields' :key='field.id' :error='field.error'>
            <MyInputExt v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
        </MyInputExtWrapper>
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
        type: 'password',
        id: 'password1',
        label: 'Old password',
        value: '',
        error: '',
    },
    {
        type: 'password',
        id: 'password2',
        label: 'New password',
        value: '',
        error: '',
    },
    {
        type: 'password',
        id: 'password3',
        label: 'Confirm new password',
        value: '',
        error: '',
    },
]);

const isSubmitting = ref(false);
const error = ref(null);

async function update() {
    isSubmitting.value = true;
    const { err } = await useSubmit(
        fields.value,
        `/users/${store.state.user.name}/password`,
        { method: 'PATCH' },
    );
    error.value = err;
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/settings.scss' scoped />