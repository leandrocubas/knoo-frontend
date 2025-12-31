<template>
  <div class="timer">
    <h1 :style="{ color }" v-if="timeLeft > 0">{{ formattedTime }}</h1>
    <h1 v-else>{{endMessage ? endMessage : 'Finalize sua compra!'}}</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'

const props = defineProps({
  endMessage: {
    type: String,
    required: false,
    default: 'Finalize sua compra!',
  },
  color: {
    type: String,
    required: false,
    default: '#000',
  },
  timer: {
    type: Number,
    required: true,
    default: 10,
  }
})
const isTimerRunning = ref<boolean>(false)
const timeLeft = ref<number>(props.timer)
let interval: number | null = null
const emit = defineEmits(['on-time-finished'])

const formattedTime = computed<string>(() => {
  const hours = Math.floor(timeLeft.value / 3600000)
  const minutes = Math.floor((timeLeft.value % 3600000) / 60000)
  const seconds = Math.floor((timeLeft.value % 60000) / 1000)
      
  return [hours, minutes, seconds]
    .map(unit => unit.toString().padStart(2, '0'))
    .join(':')
})

const stopTimer = (): void => {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  }
  isTimerRunning.value = false
}

const startTimer = (): void => {
  if (!isTimerRunning.value && timeLeft.value > 0) {
    isTimerRunning.value = true
    interval = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 1000
      } else {
        emit('on-time-finished')
        stopTimer()
      }
    }, 1000)
  }
}

watch(() => props.timer, () => {
  timeLeft.value = props.timer
  startTimer()
})

onMounted(() => startTimer())

onUnmounted(() => stopTimer())
</script>

<style scoped lang="scss">
.timer {
  width: 33.33%;
  min-width: 33.33%;

  h1 {
    font-size: 16px;
    text-align: right;
    font-family: var(--font-family-bold);
  }
}
</style>