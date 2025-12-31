<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  },
})
</script>

<template>
    <h1 class="title">{{text}}</h1>
</template>

<style lang="scss" scoped>
.title {
    font-size: 24px;
    font-family: var(--font-family-bold);
    font-weight: initial;
}

@media (max-width: 320px) {
  .title {
    font-size: 16px;
  }
}
</style>