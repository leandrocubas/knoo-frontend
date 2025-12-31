<script setup lang="ts">
import { ref } from 'vue'
import { useUtils } from '@/composables/useUtils'

defineProps({
  color: {
    type: String,
    required: false,
    default: 'var(--color-white)'
  },
  messageTooltip: {
    type: String,
    required: false,
    default: ''
  },
  direction: {
    type: String,
    required: false,
    default: 'bottom'
  }
})

const { isMobile } = useUtils()

const isOpened = ref(false)
const toggle = () => {
  if(!isMobile.value) return

  isOpened.value = !isOpened.value
}

</script>

<template>
  <div class="info">
    <svg @click="toggle" class="info__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :style="{ stroke: color }" d="M6 10.5C6.59095 10.5 7.17611 10.3836 7.72208 10.1575C8.26804 9.93131 8.76412 9.59984 9.18198 9.18198C9.59984 8.76412 9.93131 8.26804 10.1575 7.72208C10.3836 7.17611 10.5 6.59095 10.5 6C10.5 5.40905 10.3836 4.82389 10.1575 4.27792C9.93131 3.73196 9.59984 3.23588 9.18198 2.81802C8.76412 2.40016 8.26804 2.06869 7.72208 1.84254C7.17611 1.6164 6.59095 1.5 6 1.5C4.80653 1.5 3.66193 1.97411 2.81802 2.81802C1.97411 3.66193 1.5 4.80653 1.5 6C1.5 7.19347 1.97411 8.33807 2.81802 9.18198C3.66193 10.0259 4.80653 10.5 6 10.5Z" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M6 4H6.00522" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
        <path :style="{ stroke: color }" d="M5.5 6H6V8H6.5" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <div
      v-if="messageTooltip"
      class="info__tooltip"
      :class="{
          'info__tooltip--top': direction === 'top',
          'info__tooltip--bottom': direction === 'bottom',
          'info__tooltip--show': isOpened,
          'info__tooltip--hide': !isOpened && isMobile,
          'info__tooltip--white-space': !isMobile
      }"> <p>{{messageTooltip}}</p>
    </div>

  </div>
</template>

<style lang="scss" scope>
.info {
  position: relative;
  display: inline-block;
  &__icon {
    cursor: pointer;

    &:hover + .info__tooltip {
      display: flex;
    }
  }

  &__tooltip {
    min-width: 130px;
    position: absolute;
    display: none;
    transition: opacity .4s ease;
    padding: 6px;
    border-radius: 10px;
    justify-content: center;
    background-color: #616161;
    right: 0%;

    &--top {
      bottom: 100%;
    }

    &--bottom {
      top: 100%;
    }

    &--white-space {
      white-space: nowrap;
    }

    &--show {
      display: flex;
    }

    &--hide {
      display: none !important;
    }
  }
  
}

</style>