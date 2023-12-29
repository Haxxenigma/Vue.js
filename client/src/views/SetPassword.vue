<template>
    <form class='form' @submit.prevent='update'>
        <h2 class='title'>Password</h2>
        <InputExt v-for='field in fields' v-bind='field' :key='field.id' @update:value='field.value = $event'
            @reset:error='field.error = $event' />
        <div class='container'>
            <div class='buttons'>
                <Button :isSubmitting='isSubmitting'>
                    Save
                </Button>
                <Link class='white' :path='"/users/" + store.state.userData.name'>
                <X size='20' />Cancel
                </Link>
            </div>
            <div class='label'></div>
        </div>
        <div class='container'>
            <div class='error' v-if='error'>{{ error }}</div>
            <div class='label'></div>
        </div>
    </form>
</template>

<script setup>
import { useSubmit } from '@/composables/useSubmit';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';
import store from '@/store/store';

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
    error.value = await useSubmit(
        fields.value, `/users/${store.state.userData.name}/password`, { method: 'PATCH' },
    );
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/settings.scss' scoped />