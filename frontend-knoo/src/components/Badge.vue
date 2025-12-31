<script setup lang="ts">
    
</script>

<template>
    <div class="badge">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.badge {
    border-radius: 100%;
    background-color: var(--color-primary);
    color: var(--color-white);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -8px;
    right: -8px;
}
</style>