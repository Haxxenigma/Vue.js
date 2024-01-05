<template>
    <div class='mid'>
        <hr />Continue with
        <hr />
    </div>
    <div class='my-auth-providers'>
        <MyButton type='button' class='white' @click='redirectGoogle'>
            <img src='@/assets/google.svg' width='25' />Google
        </MyButton>
        <MyButton type='button' class='white' @click='redirectGithub'>
            <img src='@/assets/github.svg' width='25' />GitHub
        </MyButton>
    </div>
</template>

<script>
import { genGoogleUrl, genGithubUrl } from '@/utils/genUrl';

export default {
    name: 'MyAuthProviders',
    methods: {
        redirectGoogle() {
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

.my-auth-providers {
    @include flex(space-between, $gap: 25px);
    width: 100%;

    .my-button {
        margin-top: 15px;
        width: 100%;
    }
}
</style>