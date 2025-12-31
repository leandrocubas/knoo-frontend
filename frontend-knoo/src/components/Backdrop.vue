<script setup lang="ts">
defineProps({
  opacity: {
    type: Number,
    required: false,
    default: .2
  },
})
</script>

<template>
    <div class="backdrop" :style="{ 'background-color': `rgba(var(--color-white-rgb), ${opacity})`}"></div>
</template>

<style lang="scss" scoped>
.backdrop {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 2;
    position: fixed;
    color: #fff;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}
</style>