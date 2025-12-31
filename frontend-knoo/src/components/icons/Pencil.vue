<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: '#715F64'
  }
})
</script>

<template>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M3 15H6L13.875 7.12501C14.2597 6.72451 14.472 6.18915 14.4664 5.63385C14.4609 5.07855 14.2378 4.54757 13.8451 4.15489C13.4524 3.76222 12.9215 3.53914 12.3662 3.53355C11.8109 3.52797 11.2755 3.74031 10.875 4.12501L3 12V15Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M10.125 4.875L13.125 7.875" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>