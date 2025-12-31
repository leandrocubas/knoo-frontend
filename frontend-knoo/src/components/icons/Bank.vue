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
        <path :style="{ stroke: color }" d="M2.25 15.75H15.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M2.25 7.5H15.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M3.75 4.5L9 2.25L14.25 4.5" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M3 7.5V15.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M15 7.5V15.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M6 10.5V12.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M9 10.5V12.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M12 10.5V12.75" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>        
</template>