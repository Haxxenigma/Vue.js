<template>
    <RouterLink class='my-link' :to='to'>
        <slot></slot>
    </RouterLink>
</template>

<script>
export default {
    name: 'MyLink',
    props: ['to'],
};
</script>

<style src='@/styles/button.scss' lang='scss' scoped />