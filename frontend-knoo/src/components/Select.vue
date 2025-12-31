<script setup lang='ts'>
import { ref, watchEffect } from 'vue'
import type { ISelect } from '@/interfaces/select.interface'
import GhostLoading from './GhostLoading.vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  },
  items: {
    type: Array<ISelect>,
    required: true
  },
  modelValue: {
    type: null,
    default: null
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

const emit = defineEmits(['update:modelValue', 'changed'])

const internalValue = ref(props.modelValue ? props.modelValue : null)

watchEffect(() => {
  internalValue.value = props.modelValue
})

const updateValue = (event: Event) => {
  const { value } = event.target as HTMLInputElement;

  emit('update:modelValue', value)
  emit('changed', value)

}

</script>

<template>
    <div class="select">
        <label>{{label}}</label>
        <select :placeholder="placeholder" @input="updateValue" v-model="internalValue" :disabled="disabled" v-if="!isLoading">
          <option disabled :value="(typeof props.modelValue === 'number' ? 0 : '')">Selecione...</option>
          <option
            v-for="(item, index) in items"
            :key="index" :value="item.value">{{item.label}}</option>
        </select>
        <GhostLoading :height="40" v-else/>
    </div>
</template>

<style lang="scss" scoped>
.select {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
    select {
      background-color: var(--color-transparent);
      color: var(--color-secondary);
      font-family: var(--font-family);
      font-size: 14px;
      border: 1px solid #E8E8E8;
      padding: 5px 0;
      overflow: hidden;
      border-radius: 6px;
      padding: 14px;
      appearance: none;
      background-image: url("data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiM2RDM5RkYiIGNsYXNzPSJzaXplLTYiPgogICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJtMTkuNSA4LjI1LTcuNSA3LjUtNy41LTcuNSIgLz4KPC9zdmc+Cg==");
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 16px;

      &:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
        border: double 1px transparent;
        border-radius: 6px;
        background-image: linear-gradient(white, white), 
                          linear-gradient(to right, #6D39FF, #00D0D2);
                  
        background-origin: border-box;
        background-clip: padding-box, border-box;
        transition: .3s;
      }
    }

    
    &__icon {
        position: absolute;
        right: 0;
        top: -4px;
        padding: 10px;
        pointer-events: none;
        width: 36px;
        height: 100px;
    }
}
</style>