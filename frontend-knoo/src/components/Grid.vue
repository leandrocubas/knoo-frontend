<script setup lang="ts">
defineProps({
    columns: {
        type: Number,
        required: false,
        default: 1
    }
})
</script>

<template>
    <div class="grid" :style="{ gridTemplateRows: `repeat(${(columns)}, min-content)`, gridTemplateColumns: `repeat(${columns}, 1fr)` }">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.grid {
    display: grid;
    gap: 20px;
    width: 100%;
}
</style>