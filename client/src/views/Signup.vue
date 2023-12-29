<template>
    <div class='wrapper'>
        <form class='form' @submit.prevent='signup'>
            <h1 class='title'>Sign Up</h1>
            <Input v-for='field in fields' v-bind='field' :key='field.id' @update:value='field.value = $event'
                @reset:error='field.error = $event' />
            <Button :isSubmitting='isSubmitting'>
                Sign Up
            </Button>
            <div class='error' v-if='error'>{{ error }}</div>
            <AuthProviders />
        </form>
    </div>
</template>

<script setup>
import { useSubmit } from '@/composables/useSubmit';
import { ref } from 'vue';

const fields = ref([
    {
        id: 'name',
        label: 'Name',
        value: '',
        error: '',
    },
    {
        id: 'email',
        label: 'E-mail address',
        value: '',
        error: '',
    },
    {
        type: 'password',
        id: 'password',
        label: 'Password',
        value: '',
        error: '',
    },
]);

const isSubmitting = ref(false);
const error = ref(null);

async function signup() {
    isSubmitting.value = true;
    error.value = await useSubmit(fields.value, '/signup', { redirect: true });
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/form.scss' scoped />