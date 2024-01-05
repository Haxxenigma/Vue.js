<template>
    <main class='main'>
        <div class='wrapper' v-if='!isAuth'>
            <form class='form' @submit.prevent='signup'>
                <h1 class='title'>Sign Up</h1>
                <MyInputWrapper v-for='field in fields' :key='field.id' :error='field.error'>
                    <MyInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
                </MyInputWrapper>
                <MyButton :isSubmitting='isSubmitting'>
                    Sign Up
                </MyButton>
                <MyError :error='error' />
                <MyAuthProviders />
            </form>
        </div>
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useSubmit } from '@/composables/useSubmit';
import { useAuth } from '@/composables/useAuth';

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

const isAuth = ref(false);
const isSubmitting = ref(false);
const error = ref(null);

isAuth.value = useAuth(isAuth.value, { redirectIfFail: false });

async function signup() {
    isSubmitting.value = true;
    const { err } = await useSubmit(
        fields.value, '/signup',
        { redirect: true },
    );
    error.value = err;
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/form.scss' scoped />