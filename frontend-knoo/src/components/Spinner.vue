<script setup lang='ts'>
defineProps({
    size: {
        type: Number,
        required: false
    }
})
</script>

<template>
    <div class="spinner" :style="{ width: `${size}px`, height: `${size}px` }"></div>
</template>

<style lang="scss" scoped>
@import url('@/assets/keyframes/spinner.scss');

.spinner {
    z-index: 2;
    position: inherit;
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: var(--color-primary);
    animation: spinner 1s ease infinite;
}
</style>