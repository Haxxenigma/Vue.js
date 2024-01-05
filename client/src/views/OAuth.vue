<template>
    <main class='main'>
        <div class='wrapper' v-if='!isAuth && fields'>
            <form class='form' @submit.prevent='oauth'>
                <h1 class='title' style='font-size: 28px;'>
                    Let's come up with a password
                </h1>
                <MyInputWrapper v-for='field in fields.slice(0, 4)' :key='field.id' :error='field.error'>
                    <MyInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event'
                        :disabled='field.id === "email"' />
                </MyInputWrapper>
                <MyButton :isSubmitting='isSubmitting'>
                    Sign Up
                </MyButton>
                <MyError :error='error' />
            </form>
        </div>
        <MyLoader v-else />
    </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSubmit } from '@/composables/useSubmit';
import { useAuth } from '@/composables/useAuth';
import store from '@/store';

const fields = ref(null);

watch(() => store.state.tempUserData, () => {
    if (store.state.tempUserData) {
        const user = ref(store.state.tempUserData);

        fields.value = [
            {
                id: 'name',
                label: 'Name',
                value: user.value.given_name || user.value.login,
                error: '',
            },
            {
                id: 'email',
                label: 'E-mail',
                value: user.value.email,
                error: '',
            },
            {
                type: 'password',
                id: 'password1',
                label: 'Password',
                value: '',
                error: '',
            },
            {
                type: 'password',
                id: 'password2',
                label: 'Password confirmation',
                value: '',
                error: '',
            },
            {
                id: 'verified',
                value: user.value.verified_email || user.value.verified,
            },
            {
                id: 'provider',
                value: user.value.given_name ? 'google' : 'github',
            },
            {
                id: 'image',
                value: user.value.picture || user.value.avatar_url || '/media/avatar.svg',
            },
        ];
    }
}, { immediate: true });

const isAuth = ref(false);
const isSubmitting = ref(false);
const error = ref(null);

isAuth.value = useAuth(isAuth.value, { redirectIfFail: false });

async function oauth() {
    isSubmitting.value = true;
    error.value = await useSubmit(fields.value, '/oauth', { redirect: true, redirectUser: true });
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/form.scss' scoped />