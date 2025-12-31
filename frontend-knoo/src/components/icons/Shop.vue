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
        <path :style="{ stroke: color }" d="M6.70834 9.58337L11.5 3.83337L16.2917 9.58337" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M20.125 9.58337L18.2083 17.25C18.1192 17.7992 17.8777 18.2917 17.5279 18.6425C17.1772 18.9923 16.7402 19.1782 16.2917 19.1667H6.70833C6.25983 19.1782 5.82283 18.9923 5.47208 18.6425C5.12229 18.2917 4.88079 17.7992 4.79167 17.25L2.875 9.58337H20.125Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M11.5 16.2917C12.0083 16.2917 12.4959 16.0898 12.8553 15.7303C13.2147 15.3709 13.4167 14.8834 13.4167 14.375C13.4167 13.8667 13.2147 13.3792 12.8553 13.0198C12.4959 12.6603 12.0083 12.4584 11.5 12.4584C10.9917 12.4584 10.5042 12.6603 10.1447 13.0198C9.78528 13.3792 9.58334 13.8667 9.58334 14.375C9.58334 14.8834 9.78528 15.3709 10.1447 15.7303C10.5042 16.0898 10.9917 16.2917 11.5 16.2917Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>    