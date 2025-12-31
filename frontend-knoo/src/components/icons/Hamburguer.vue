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
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M3.83325 5.75H19.1666"  stroke-width="1.91667" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M3.83325 11.5H19.1666"  stroke-width="1.91667" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M3.83325 17.25H19.1666" stroke-width="1.91667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>            
</template>