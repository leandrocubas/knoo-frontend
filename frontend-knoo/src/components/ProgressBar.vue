<template>
    <div class="progress-bar" :style="{ backgroundColor: backgroundColor ? backgroundColor : 'rgba(var(--color-black-rgb), .1)' }">
      <div class="progress-bar--bar" :style="{ width: `${progress}%`, backgroundColor: barColor ? barColor : 'var(--color-primary)' }"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
  
  
  const props = defineProps({
    milliseconds: {
        type: Number,
        required: true
    },
    barColor: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
  })
  
  const progress = ref(100)
  let start: number | null = null
  
  const updateProgress = (timestamp: number) => {
    if (start === null) {
      start = timestamp
    }
    const elapsed = timestamp - start
    const timeLeft = props.milliseconds - elapsed
  
    progress.value = (timeLeft / props.milliseconds) * 100
  
    if (timeLeft > 0) {
      requestAnimationFrame(updateProgress)
      return
    }

    progress.value = 0
    
  }
  
  onMounted(() => requestAnimationFrame(updateProgress))

  watchEffect(() => {
    props.milliseconds
    requestAnimationFrame(updateProgress)
  })
  
  onUnmounted(() => {
    progress.value = 100  
    start = null
  })
  </script>
  
  <style scoped lang="scss">
  .progress-bar {
    border-radius: 100px;
    width: 100%;
    height: 6px;
    overflow: hidden;
    

    &--bar {
      height: 6px;
      border-radius: 100px;
      max-width: 100%;
      
      transition: width .1 linear;
    }
  }
</style>
  