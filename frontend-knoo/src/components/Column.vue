<script setup lang="ts">
defineProps({
  gap: {
    type: String,
    required: false,
    default: ''
  },
  align_items: {
    type: String,
    required: false,
    default: ''
  },
  flex: {
    type: String,
    required: false,
    default: ''
  },
})
</script>
<template>
    <div class="column" :style="{ gap, 'align-items': align_items, flex }">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.column {
    display: flex;
    flex-direction: column;
}
</style>