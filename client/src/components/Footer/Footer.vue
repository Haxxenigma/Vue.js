<template>
    <footer class='footer'>
        <nav class='nav'>
            <a href='https://vercel.com/haxxenigmas-projects/' target='_blank'>Project</a>
            <a href='mailto:wakaranai459@gmail.com' target='_blank'>Contact</a>
            <a href='https://github.com/Haxxenigma/' target='_blank'>Source Code</a>
        </nav>
        <div class='end'>
            &copy; Haxxenigma &middot; 2023-2024
        </div>
    </footer>
</template>

<style lang='scss'>
@import '@/styles/vars';
@import '@/styles/mixins';

.footer {
    @include flex($dir: column, $gap: 6px);
    background-color: $fg-05;
    height: 60px;

    .nav {
        @include flex($gap: 20px);

        a {
            color: $mid-85;
            font-size: 12px;
            transition: 0.2s;

            &:hover {
                color: $primary;
            }
        }
    }

    .end {
        color: $mid-75;
        font-size: 12px;
    }
}
</style>