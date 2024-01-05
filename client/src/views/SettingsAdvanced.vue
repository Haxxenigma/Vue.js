<template>
    <form class='form' @submit.prevent>
        <h2 class='title'>Advanced</h2>
        <div class='container'>
            <div class='buttonCnt'>
                <MyButton type='button' class='danger' @click='isModalOpen = true'>
                    <Trash2 size='18' />Delete
                </MyButton>
            </div>
            <div class='label danger'>Delete account</div>
        </div>
        <MyModal v-if='isModalOpen' :closeModal='closeModal' :isSubmitting='isSubmitting' @onClick='deleteUser'>
            <template #message>
                Are you sure you want to delete your account?<br />Enter your password to confirm
            </template>
            <MyInputWrapper v-for='field in fields' :key='field.id' :error='field.error' @keyup.enter='deleteUser'>
                <MyInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </MyInputWrapper>
            <template #no>Cancel</template>
            <template #yes>Confirm</template>
        </MyModal>
    </form>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next';
import { useSubmit } from '@/composables/useSubmit';
import { ref } from 'vue';
import store from '@/store';

const fields = ref([{
    type: 'password',
    id: 'password',
    label: 'Password',
    value: '',
    error: '',
}]);
const isModalOpen = ref(false);
const isSubmitting = ref(false);

function closeModal() {
    isModalOpen.value = false;
}

async function deleteUser() {
    isSubmitting.value = true;
    const { err } = await useSubmit(
        fields.value, `/users/${store.state.user.name}`,
        { method: 'DELETE', redirectUrl: '/' },
    );
    if (err) fields.value[0].error = err;
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/settings.scss' scoped />