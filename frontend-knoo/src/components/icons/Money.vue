<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: '#715F64'
  },
  width: {
    type: String,
    required: false,
    default: '23'
  }
})
</script>

<template>
    <svg :width="width" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M16.0041 7.66667C15.8133 7.12544 15.465 6.65368 15.0038 6.3121C14.5427 5.97052 13.9899 5.77476 13.4166 5.75H9.58325C8.82075 5.75 8.08949 6.0529 7.55032 6.59207C7.01115 7.13124 6.70825 7.8625 6.70825 8.625C6.70825 9.3875 7.01115 10.1188 7.55032 10.6579C8.08949 11.1971 8.82075 11.5 9.58325 11.5H13.4166C14.1791 11.5 14.9104 11.8029 15.4495 12.3421C15.9887 12.8812 16.2916 13.6125 16.2916 14.375C16.2916 15.1375 15.9887 15.8688 15.4495 16.4079C14.9104 16.9471 14.1791 17.25 13.4166 17.25H9.58325C9.00992 17.2252 8.45712 17.0295 7.99599 16.6879C7.53486 16.3463 7.18651 15.8746 6.99575 15.3333" stroke="#715F64" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M11.5 17.25V20.125M11.5 2.875V5.75" stroke="#715F64" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>        
</template>