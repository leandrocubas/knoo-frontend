<script setup lang='ts'>
import Backdrop from './Backdrop.vue'
import Spinner from './Spinner.vue'
</script>

<template>
    <section class="loader">
        <Backdrop :opacity=".8" />

        <Spinner />
    </section>
</template>

<style lang="scss" scoped>

.loader {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;
}
</style>