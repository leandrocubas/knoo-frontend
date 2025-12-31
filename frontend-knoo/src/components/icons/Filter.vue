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
    <g id="Frame">
        <path :style="{ stroke: color }" id="Vector" d="M5.27081 4.7915H17.7291C17.8672 4.83991 17.9923 4.91926 18.0949 5.02348C18.1975 5.1277 18.2749 5.25403 18.3211 5.39278C18.3674 5.53154 18.3813 5.67903 18.3617 5.82398C18.3422 5.96892 18.2897 6.10747 18.2083 6.229L13.4166 11.4998V18.2082L9.58331 15.3332V11.4998L4.79165 6.229C4.71028 6.10747 4.6578 5.96892 4.63825 5.82398C4.61869 5.67903 4.63257 5.53154 4.67882 5.39278C4.72507 5.25403 4.80246 5.1277 4.90508 5.02348C5.00769 4.91926 5.1328 4.83991 5.27081 4.7915Z" stroke-width="1.91667" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
</svg>
</template>