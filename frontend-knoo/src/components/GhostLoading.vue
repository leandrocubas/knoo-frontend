

<template>
    <div class="ghost-loading" :style="{ 'min-height': `${height}px` }">
        <div class="ghost-loading--wrapper">
          <div
            :style="{ 'min-height': `${height}px`, width: `${width}%` }"
            :class="{ 'ghost-loading--item--animate': animate, 'ghost-loading--item--no-animate': !animate }"
            class="ghost-loading--item" v-for="item in items" :key="item"></div>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  animate: {
    type: Boolean,
    required: false,
    default: true
  },
  height: {
    type: Number,
    required: false,
    default: 150
  },
  width: {
    type: Number,
    required: false,
    default: 100
  },
  minHeight: {
    type: String,
    required: false,
    default: '150px'
  },
  flex: {
    type: Number,
    required: false,
    default: 1
  }
})

const items = ref(Array(1).fill(0))
</script>
  
<style lang="scss" scoped>
@import url('@/assets/keyframes/pulse.scss');

.ghost-loading {
  flex: 0 0 calc(50% - 26px);
  &--wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
  }

  &--item {
      border-radius: 20px;
      background-color: rgba(var(--color-gray-rgb), .4);
      
      &--animate {
        animation: pulse 1.5s infinite ease-in-out;
      }

      &--no-animate {
        background-color: #A69FA2 !important;
      }
  }
}
  
</style>