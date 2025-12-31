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
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1338 13.8066H16.6338L17.6338 9.80664H14.1338V7.80664C14.1338 6.77664 14.1338 5.80664 16.1338 5.80664H17.6338V2.44664C17.3078 2.40364 16.0768 2.30664 14.7768 2.30664C12.0618 2.30664 10.1338 3.96364 10.1338 7.00664V9.80664H7.13379V13.8066H10.1338V22.3066H14.1338V13.8066Z" fill="#3959AC"/>
    </svg>     
</template>