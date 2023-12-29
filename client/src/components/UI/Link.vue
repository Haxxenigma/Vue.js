<template>
    <RouterLink :to='path' class='button'>
        <slot />
    </RouterLink>
</template>

<script>
export default {
    name: 'Link',
    props: ['path'],
};
</script>

<style src='@/styles/button.scss' lang='scss' scoped />