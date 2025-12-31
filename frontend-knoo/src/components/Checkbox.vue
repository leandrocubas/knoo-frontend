<script setup lang="ts">
import { useSanitizerHTML } from '@/composables/useSanitizerHTML'
import { computed, onMounted, ref } from 'vue';


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: Boolean,
})

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const emit = defineEmits(['update:modelValue'])
const { sanitizeHTML } = useSanitizerHTML()
const sanitize = computed(() => sanitizeHTML(props.text))

</script>

<template>
<label class="checkbox">
    <input @change="() => emit('update:modelValue', !isChecked)" :id="id" :checked="isChecked" type="checkbox" />
    <span class="check"></span>
    <div v-html="sanitize"></div>
</label>
</template>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  span.check {
    width: 16px;
    height: 16px;
    border: 1px solid var(--color-primary);
    display: inline-block;
    transition: all linear .3s;
    &:after {
      content: "";
      position: absolute;
      top: 7px;
      left: 6px;
      border-bottom: 2px solid var(--color-white);
      border-right: 2px solid var(--color-white);
      height: 9px;
      width: 4px;
      transform: rotate(45deg);
      visibility: hidden;
    }
  }

  input {
    display: none;
    &:checked ~ span.check {
      background: var(--color-primary);
      &:after {
        visibility: visible;
      }
    }
  }
}

</style>
