<script setup lang="ts">
defineProps({
  to: {
    type: Number,
    required: false,
    default: 0
  },
  size: {
    type: Number,
    required: false,
    default: 10
  },
})
</script>

<template>
    <svg :style="{ transform: `rotate(${to}deg)`, cursor: 'pointer', transition: '.4s' }" :width="size" :height="size" viewBox="0 0 10 6" fill="#000" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ fill: 'transparent', stroke: '#fff' }" d="M1 0.5L5 4.5L9 0.5"/>
    </svg>
</template>

<style lang="scss" scoped>
</style>