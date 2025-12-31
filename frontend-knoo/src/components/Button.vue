<script setup lang="ts">
import { useButtons } from '@/composables/useButtons'
import { computed } from 'vue';
const { getClassByType } = useButtons();

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  },
})

const classType = computed(() => getClassByType(props.type))
</script>

<template>
    <button
      class="button"
      :disabled="disabled || isLoading"
      :class="classType">
      <slot v-if="!isLoading" />
      <div v-else>Carregando...</div>
    </button>
</template>

<style lang="scss" scoped>
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 1;
    z-index: 1;
    border: none;
    font-family: var(--font-family-bold);
    &:not(:disabled){
      cursor: pointer;
    }

    &:disabled {
      opacity: .3;
      cursor: not-allowed;
    }

    &--primary {
      font-size: 16px;
      background-color: var(--color-primary);
      color: var(--color-white);
      width: 100%;
      height: 46px;
      padding: 10px;
      border-radius: 8px;
      transition: .3s;

      &:not(:disabled):hover {
        opacity: .8;
        transition: .3s;
      }
    }
      
    &--secondary {
      font-size: 14px; 
      background-color: var(--color-transparent);
      border: 1px solid var(--color-primary);
      color: var(--color-text);
      width: 100%;
      height: 48px;
      padding: 10px;
      border-radius: 8px;
      transition: .3s;

      &:hover {
        background-color: var(--color-primary);
        color: var(--color-white);
        transition: .3s;
      }
    }
      
    &--tertiary {
      font-size: 14px;
      background-color: var(--color-transparent);
      color: var(--color-text);
      text-decoration: underline;
      max-width: fit-content;
      transition: .3s;

      &:hover {
        color: var(--color-primary);
        transition: .3s;
      }
    }

    &--quaternary {
        padding: 10px;
        display: flex;
        width: 100%;
        height: 46px;
        border-radius: 8px;
        color: var(--color-white);
        background-color: #391e83;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        min-width: 172px;
    }

    &--error {
        color: var(--color-white);
        background-color: var(--color-error);
        width: 100%;
        height: 48px;
        padding: 10px;
        border-radius: 100px;
        transition: .3s;
    }

    &--success {
      color: rgb(var(--color-black-rgb-100));
      background-color: var(--color-success);
      width: 100%;
      height: 48px;
      padding: 10px;
      border-radius: 100px;
      transition: .3s;
    }
}
</style>