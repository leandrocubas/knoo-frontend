<script lang="ts" setup>
defineProps({
    top: {
        type: String,
        required: false,
    },
    right: {
        type: String,
        required: false,
    },
    bottom: {
        type: String,
        required: false,
    },
    left: {
        type: String,
        required: false,
    },
    zIndex: {
        type: Number,
        required: false,
        default: 0
    }
})
</script>

<template>
    <div
        :style="{ top, right, bottom, left, 'z-index': zIndex }"
        class="fade"></div>
</template>

<style lang="scss" scoped>
.fade {
    filter: blur(90px);
    position: absolute;
    width: 30vw;
    height: 50vh;
    background: linear-gradient(to right, #00D0D21A, #6D39FF1A);
}
</style>