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
    src: {
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
        class="image-circle">
        <img v-if="src" :src="src" />
        <div v-else>no image</div>
    </div>
</template>

<style lang="scss" scoped>
.image-circle {
    position: absolute;
    width: fit-content;
    height: fit-content;
}
</style>