<template>
    <div class='wrapper'>
        <form class='form' @submit.prevent='signin'>
            <h1 class='title'>
                Sign In
            </h1>
            <Input v-for='field in fields' v-bind='field' :key='field.id' @update:value='field.value = $event'
                @reset:error='field.error = $event' />
            <Button :isSubmitting='isSubmitting'>
                Sign In
            </Button>
            <div class='error' v-if='error'>{{ error }}</div>
            <AuthProviders />
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSubmit } from '@/composables/useSubmit';

const fields = ref([
    {
        id: 'name',
        label: 'Name',
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

async function signin() {
    isSubmitting.value = true;
    error.value = await useSubmit(fields.value, '/signin', { redirect: true });
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/form.scss' scoped />