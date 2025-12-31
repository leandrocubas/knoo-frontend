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
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M13.4167 7.66659V5.74992C13.4167 5.24159 13.2147 4.75408 12.8553 4.39463C12.4958 4.03519 12.0083 3.83325 11.5 3.83325H4.79167C4.28333 3.83325 3.79582 4.03519 3.43638 4.39463C3.07693 4.75408 2.875 5.24159 2.875 5.74992V17.2499C2.875 17.7582 3.07693 18.2458 3.43638 18.6052C3.79582 18.9647 4.28333 19.1666 4.79167 19.1666H11.5C12.0083 19.1666 12.4958 18.9647 12.8553 18.6052C13.2147 18.2458 13.4167 17.7582 13.4167 17.2499V15.3333" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M20.1249 11.5H6.70825" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M17.25 14.375L20.125 11.5L17.25 8.625" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>            
</template>