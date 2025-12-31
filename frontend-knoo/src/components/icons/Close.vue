

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: 'var(--color-black)'
  }
})
</script>

<template>
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
        <path :style="{ fill: color, stroke: color }" d="M17.25 5.75L5.75 17.25" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ fill: color, stroke: color }" d="M5.75 5.75L17.25 17.25" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
</template>