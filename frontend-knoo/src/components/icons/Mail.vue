

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: 'var(--color-primary)'
  }
})
</script>

<style scoped lang="scss">
svg {
  cursor: pointer;
}
</style>

<template>
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M18.2083 4.79166H4.79167C4.28334 4.79166 3.79582 4.99359 3.43638 5.35304C3.07693 5.71248 2.875 6.19999 2.875 6.70832V16.2917C2.875 16.8 3.07693 17.2875 3.43638 17.6469C3.79582 18.0064 4.28334 18.2083 4.79167 18.2083H18.2083C18.7167 18.2083 19.2042 18.0064 19.5636 17.6469C19.9231 17.2875 20.125 16.8 20.125 16.2917V6.70832C20.125 6.19999 19.9231 5.71248 19.5636 5.35304C19.2042 4.99359 18.7167 4.79166 18.2083 4.79166Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M2.875 6.70834L11.5 12.4583L20.125 6.70834" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>