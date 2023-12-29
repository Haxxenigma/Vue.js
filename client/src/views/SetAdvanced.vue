<template>
    <form class='form' @submit.prevent>
        <h2 class='title'>Advanced</h2>
        <div class='field'>
            <div class='container'>
                <div class='buttonCnt'>
                    <Button type='button' class='danger' @click='isModalOpen = true'>
                        <Trash2 size='18' />Delete
                    </Button>
                </div>
                <div class='label'>Delete account</div>
            </div>
        </div>
        <Modal v-if='isModalOpen' :closeModal='closeModal' :isSubmitting='isSubmitting' @onClick='deleteUser'>
            <template #message>Are you sure you want to delete your account?<br />Enter your password to confirm</template>
            <Input v-bind='fields[0]' @update:value='fields[0].value = $event' @reset:error='fields[0].error = $event'
                @keyup.enter='deleteUser' />
            <template #no>Cancel</template>
            <template #yes>Confirm</template>
        </Modal>
    </form>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next';
import { useSubmit } from '@/composables/useSubmit';
import { ref } from 'vue';
import store from '@/store/store';

const fields = ref([{
    type: 'password',
    id: 'password',
    label: 'Password',
    value: '',
    error: '',
}]);

function closeModal() {
    isModalOpen.value = false;
}

const isModalOpen = ref(false);
const isSubmitting = ref(false);
const error = ref(null);

async function deleteUser() {
    isSubmitting.value = true;
    error.value = await useSubmit(
        fields.value, `/users/${store.state.userData.name}`,
        { method: 'DELETE', redirect: true, redirectUrl: '/' },
    );
    error.value ? fields.value[0].error = error.value : null;
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/settings.scss' scoped />