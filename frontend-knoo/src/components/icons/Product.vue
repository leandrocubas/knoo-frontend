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
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path :style="{ stroke: color }" d="M2.65625 8.79215C2.65625 5.64965 2.65625 4.07799 3.63292 3.10215C4.60958 2.12632 6.18042 2.12549 9.32292 2.12549H10.9896C14.1321 2.12549 15.7037 2.12549 16.6796 3.10215C17.6554 4.07882 17.6562 5.64965 17.6562 8.79215V12.1255C17.6562 15.268 17.6562 16.8397 16.6796 17.8155C15.7029 18.7913 14.1321 18.7922 10.9896 18.7922H9.32292C6.18042 18.7922 4.60875 18.7922 3.63292 17.8155C2.65708 16.8388 2.65625 15.268 2.65625 12.1255V8.79215Z" stroke-width="1.5"/>
      <path :style="{ stroke: color }" d="M6.82324 8.79224H13.4899M6.82324 12.1256H10.9899" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
</template>