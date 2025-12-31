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
        <path :style="{ stroke: color }" d="M4.79167 19.1666C5.3 19.1666 5.78751 18.9647 6.14695 18.6052C6.5064 18.2458 6.70833 17.7583 6.70833 17.2499C6.70833 16.7416 6.5064 16.2541 6.14695 15.8946C5.78751 15.5352 5.3 15.3333 4.79167 15.3333C4.28334 15.3333 3.79582 15.5352 3.43638 15.8946C3.07693 16.2541 2.875 16.7416 2.875 17.2499C2.875 17.7583 3.07693 18.2458 3.43638 18.6052C3.79582 18.9647 4.28334 19.1666 4.79167 19.1666Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M18.2084 7.66659C18.7167 7.66659 19.2043 7.46465 19.5637 7.10521C19.9231 6.74576 20.1251 6.25825 20.1251 5.74992C20.1251 5.24159 19.9231 4.75408 19.5637 4.39463C19.2043 4.03519 18.7167 3.83325 18.2084 3.83325C17.7001 3.83325 17.2126 4.03519 16.8531 4.39463C16.4937 4.75408 16.2917 5.24159 16.2917 5.74992C16.2917 6.25825 16.4937 6.74576 16.8531 7.10521C17.2126 7.46465 17.7001 7.66659 18.2084 7.66659Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M10.5417 17.2501H13.4167C14.6876 17.2501 15.9064 16.7452 16.805 15.8466C17.7036 14.948 18.2084 13.7292 18.2084 12.4584V7.66675" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M12.4584 5.75H9.58341C8.31259 5.75 7.09381 6.25483 6.19519 7.15345C5.29658 8.05206 4.79175 9.27084 4.79175 10.5417V15.3333" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M13.4167 20.125L10.5417 17.25L13.4167 14.375" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M9.58325 8.625L12.4583 5.75L9.58325 2.875" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>