<script setup lang="ts">
import Knoo from '@/components/icons/Knoo.vue'
defineProps({
  width: {
    type: String,
    required: false,
    default: ''
  },
})
</script>

<template>
    <Knoo />
</template>

<style scope lang="scss">
.logo {
  display: flex;
  justify-content: center;
  > img {
    width: 120px;
    max-width: 130px;
  }
}
</style>