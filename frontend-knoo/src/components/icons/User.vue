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
      <path :style="{ stroke: color }" d="M11.5001 10.5417C12.5167 10.5417 13.4918 10.1378 14.2107 9.41891C14.9295 8.70002 15.3334 7.725 15.3334 6.70833C15.3334 5.69167 14.9295 4.71665 14.2107 3.99776C13.4918 3.27887 12.5167 2.875 11.5001 2.875C10.4834 2.875 9.50839 3.27887 8.78951 3.99776C8.07062 4.71665 7.66675 5.69167 7.66675 6.70833C7.66675 7.725 8.07062 8.70002 8.78951 9.41891C9.50839 10.1378 10.4834 10.5417 11.5001 10.5417Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
      <path :style="{ stroke: color }" d="M5.75 20.125V18.2083C5.75 17.1917 6.15387 16.2166 6.87276 15.4978C7.59165 14.7789 8.56667 14.375 9.58333 14.375H13.4167C14.4333 14.375 15.4084 14.7789 16.1272 15.4978C16.8461 16.2166 17.25 17.1917 17.25 18.2083V20.125" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg> 
</template>