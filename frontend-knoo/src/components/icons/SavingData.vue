<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: 'var(--color-primary)'
  }
})
</script>

<template>
    <svg width="32" height="32" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M11.5 20.125C12.6327 20.125 13.7542 19.9019 14.8006 19.4685C15.8471 19.035 16.7979 18.3997 17.5988 17.5988C18.3997 16.7979 19.035 15.8471 19.4685 14.8006C19.9019 13.7542 20.125 12.6327 20.125 11.5C20.125 10.3673 19.9019 9.24579 19.4685 8.19936C19.035 7.15292 18.3997 6.20211 17.5988 5.4012C16.7979 4.6003 15.8471 3.96499 14.8006 3.53154C13.7542 3.09809 12.6327 2.875 11.5 2.875C9.21251 2.875 7.01871 3.7837 5.4012 5.4012C3.7837 7.0187 2.875 9.21251 2.875 11.5C2.875 13.7875 3.7837 15.9813 5.4012 17.5988C7.01871 19.2163 9.21251 20.125 11.5 20.125Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M11.5 6.7085V11.5002L14.375 14.3752" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
        
</template>