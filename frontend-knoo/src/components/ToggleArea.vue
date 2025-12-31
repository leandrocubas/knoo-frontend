<template>
  <div class="toggle">
    <div
      class="toggle__switch"
      :class="{ 'toggle__switch--inactive': !isActive }"
      :style="{ padding: `0 ${isActive ? '4px' : '8px'}` }"
      @click.stop="toggle"
    >
      <div
        class="toggle__switch__knob"
        :class="{ 'toggle__switch__knob--active': isActive }"
      ></div>
    </div>
    <label v-if="showLabel">{{
      label || (isActive ? 'Ativo' : 'Inativo')
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useArea } from '@/composables/useArea'

const { onToggleArea } = useArea()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
    required: true,
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  id: {
    type: String,
    required: false,
    default: '',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  isBlocked: {
    type: Number,
    required: false,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const isActive = ref(props.modelValue)

const toggle = () => {
  if (props.isBlocked) return

  isActive.value = !isActive.value
  onToggleArea(isActive.value, props.id)
  emit('update:modelValue', isActive.value)
}
</script>

<style scoped lang="scss">
.toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  &__switch {
    width: 60px;
    height: 26px;
    background-color: var(--color-primary);
    border-radius: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &--inactive {
      background-color: var(--color-gray);
    }

    &__knob {
      width: 16px;
      height: 16px;
      background-color: rgba(var(--color-white-rgb), 0.6);
      border-radius: 50%;
      transition: transform 0.2s;
      display: flex;
      align-items: center;

      &--active {
        transform: translateX(30px);
        background-color: var(--color-white);
      }
    }
  }

  label {
    font-weight: 600;
  }
}
</style>
