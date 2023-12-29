<template>
    <div class='mid'>
        <hr />Continue with
        <hr />
    </div>
    <div class='providers'>
        <Button type='button' class='white' @click='redirectGoogle'>
            <img src='@/assets/google.svg' width='25' />Google
        </Button>
        <Button type='button' class='white' @click='redirectGithub'>
            <img src='@/assets/github.svg' width='25' />GitHub
        </Button>
    </div>
</template>

<script>
import { genGoogleUrl, genGithubUrl } from '@/utils/genUrl';

export default {
    name: 'AuthProviders',
    methods: {
        async redirectGoogle() {
            window.location.href = genGoogleUrl();
        },
        redirectGithub() {
            window.location.href = genGithubUrl();
        },
    },
};
</script>

<style lang='scss' scoped>
@import '@/styles/vars';
@import '@/styles/mixins';

.mid {
    @include flex($gap: 8px);
    flex-basis: 100%;
    margin-top: 15px;
    color: $mid-75;
    font-size: 14px;
    text-wrap: nowrap;

    hr {
        width: 100%;
        height: 1px;
        background-color: $primary-2;
    }
}

.providers {
    @include flex(space-between, $gap: 25px);
    width: 100%;

    .button {
        margin-top: 15px;
        width: 100%;
    }
}
</style>