<template>
    <Loader>Authenticating...</Loader>
</template>

<script setup>
import { useOAuth } from '@/composables/useOAuth';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
    useOAuth('/oauth/github', route.query.code);
});
</script>