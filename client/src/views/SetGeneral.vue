<template>
    <form class='form' @submit.prevent='update'>
        <h2 class='title'>General</h2>
        <InputExt v-for='field in fields.slice(0, 5)' v-bind='field' :key='field.id' @update:value='field.value = $event'
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
import { ref, watch } from 'vue';
import store from '@/store/store';

const fields = ref(null);

watch(() => store.state.userData, () => {
    if (store.state.userData) {
        fields.value = [
            {
                id: 'name',
                label: 'Name*',
                value: store.state.userData.name,
                error: '',
            },
            {
                id: 'email',
                label: 'E-Mail*',
                value: store.state.userData.email,
                error: '',
            },
            {
                id: 'bio',
                label: 'Bio',
                value: store.state.userData.bio || '',
                error: '',
            },
            {
                type: 'date',
                id: 'birth',
                label: 'Birth',
                value: store.state.userData.birth
                    ? new Date(store.state.userData.birth)
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
                value: store.state.userData.email,
            },
        ];
    }
}, { immediate: true });

const isSubmitting = ref(false);
const error = ref(null);

async function update() {
    isSubmitting.value = true;
    error.value = await useSubmit(fields.value, `/users/${store.state.userData.name}`, { method: 'PATCH' });
    isSubmitting.value = false;
}
</script>

<style lang='scss' src='@/styles/settings.scss' scoped />