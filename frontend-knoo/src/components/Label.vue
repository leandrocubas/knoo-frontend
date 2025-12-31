<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<template>
    <label class="label">
        {{ text }}
    </label>
</template>

<style lang="scss" scoped>
.label {
    font-family: var(--font-family);
}
</style>