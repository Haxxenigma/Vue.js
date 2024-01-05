<template>
    <main class='main'>
        <MyLoader>Authenticating...</MyLoader>
    </main>
</template>

<script setup>
import { useOAuth } from '@/composables/useOAuth';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
    useOAuth('/oauth/google', route.query.code);
});
</script>