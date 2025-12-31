

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: 'var(--color-white)'
  }
})
</script>

<template>
    <!-- <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M9.20825 3.54163H14.8749" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M9.20825 6.375H12.7499" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M9.20825 10.625H14.8749" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M9.20825 13.4584H12.7499" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M5.66667 2.83337H2.83333C2.64547 2.83337 2.4653 2.908 2.33247 3.04084C2.19963 3.17368 2.125 3.35385 2.125 3.54171V6.37504C2.125 6.5629 2.19963 6.74307 2.33247 6.87591C2.4653 7.00875 2.64547 7.08337 2.83333 7.08337H5.66667C5.85453 7.08337 6.0347 7.00875 6.16753 6.87591C6.30037 6.74307 6.375 6.5629 6.375 6.37504V3.54171C6.375 3.35385 6.30037 3.17368 6.16753 3.04084C6.0347 2.908 5.85453 2.83337 5.66667 2.83337Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M5.66667 9.91663H2.83333C2.64547 9.91663 2.4653 9.99125 2.33247 10.1241C2.19963 10.2569 2.125 10.4371 2.125 10.625V13.4583C2.125 13.6462 2.19963 13.8263 2.33247 13.9592C2.4653 14.092 2.64547 14.1666 2.83333 14.1666H5.66667C5.85453 14.1666 6.0347 14.092 6.16753 13.9592C6.30037 13.8263 6.375 13.6462 6.375 13.4583V10.625C6.375 10.4371 6.30037 10.2569 6.16753 10.1241C6.0347 9.99125 5.85453 9.91663 5.66667 9.91663Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> -->
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.25 7.5C2.25 4.67175 2.25 3.25725 3.129 2.379C4.008 1.50075 5.42175 1.5 8.25 1.5H9.75C12.5782 1.5 13.9927 1.5 14.871 2.379C15.7492 3.258 15.75 4.67175 15.75 7.5V10.5C15.75 13.3282 15.75 14.7427 14.871 15.621C13.992 16.4992 12.5782 16.5 9.75 16.5H8.25C5.42175 16.5 4.00725 16.5 3.129 15.621C2.25075 14.742 2.25 13.3282 2.25 10.5V7.5Z" stroke="#6D39FF" stroke-width="1.5"/>
      <path d="M6 7.5H12M6 10.5H9.75" stroke="#6D39FF" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
</template>