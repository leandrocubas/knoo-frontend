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
        <path :style="{ stroke: color }" d="M18.1125 6.70837C18.9793 8.14701 19.3496 9.83047 19.1667 11.5V12.4584C19.1655 13.4674 19.4299 14.4589 19.9333 15.3334" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M7.66669 10.5417C7.66669 9.52504 8.07055 8.55002 8.78944 7.83113C9.50833 7.11224 10.4834 6.70837 11.5 6.70837C12.5167 6.70837 13.4917 7.11224 14.2106 7.83113C14.9295 8.55002 15.3334 9.52504 15.3334 10.5417V11.5C15.3334 13.5736 16.0059 15.5912 17.25 17.25" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M11.5 10.5416V12.4583C11.4969 15.1985 12.333 17.874 13.8958 20.125" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M7.66669 14.375C7.90119 16.3778 8.48503 18.3239 9.39169 20.125" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M4.69585 18.2064C4.04922 16.0313 3.75797 13.766 3.83335 11.4981V10.5397C3.82968 9.19219 4.18125 7.86748 4.85264 6.69908C5.52403 5.53069 6.49152 4.5599 7.65762 3.88454C8.82372 3.20917 10.1472 2.85309 11.4948 2.85217C12.8423 2.85126 14.1663 3.20554 15.3334 3.87933" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>