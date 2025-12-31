<script setup lang='ts'>
import { Field } from 'vee-validate'
import { computed, ref, toValue, watchEffect } from 'vue'
import Label from '@/components/Label.vue'
import Spinner from '@/components/Spinner.vue'
import { useUtils } from '@/composables/useUtils'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { vMaska, type MaskaDetail } from 'maska'
import { unformat } from 'v-money3'

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  list: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: false,
    default: ''
  },
  minLength: {
    type: Number,
    required: false
  },
  maxLength: {
    type: Number,
    required: false
  },
  mask: {
    type: String,
    required: false,
    default: ''
  },
  tokens: {
    required: false,
  },
  minValue: {
    type: Number,
    required: false
  },
  maxValue: {
    type: Number,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  errorText: {
    type: String,
    required: false,
    default: ''
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const errorMessage = ref()
const _isValid = ref(true)
const isValid = computed({
  get: () => toValue(_isValid),
  set: (value) => _isValid.value = value
})


watchEffect(() => {
  internalValue.value = props.modelValue
})


const updateValue = (value: string) => emit('update:modelValue', value)



</script>

<template>
  <Field
    :name="name">
    <div class="text-area">
      <Label v-if="label" :text="label"/>
     <textarea
        class="text-area__field"
        :id="id"
        
        :value="internalValue"
        v-model="internalValue"
        :minlength="minLength"
        :min="minValue"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :max="maxValue"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :class="{ 'text-area--invalid': !isValid }"
        :disabled="disabled"
        :required="true" />
        <div class="text-area__loading" v-if="isLoading">
                    <!-- <span class="text-area__loading--spinner"></span> -->
          <Spinner />
        </div>
        <ExclamationTriangleIcon class="text-area__warning-icon" v-if="errorText || !isValid"/>
        <span class="text-area__error-message" v-if="!isValid && type === 'email' || type === 'money'">
            {{ errorMessage }}
        </span>
        <span class="text-area__error-message" v-if="errorText">
            {{ errorText }}
        </span>
        <span class="text-area__error-message" v-if="type === 'number' && minValue && internalValue && +internalValue < minValue">Valor menor que o permitido ({{minValue}})</span>
        </div>

  </Field>
</template>

<style lang="scss" scoped>

.text-area {
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  position: relative;
  width: 100%;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #5B5764;
  }
  
  &__field {
    resize: vertical;
    min-height: 80px;
    font-family: var(--font-family-bold);
    background-color: var(--color-transparent);
    color: var(--color-secondary);
    border-left: none;
    border-top: none;
    border-right: none;
    border: 1px solid #E8E8E8;
    padding: 10px;
    color: var(--color-text);
    caret-color: #6D39FF;
    text-rendering: optimizeLegibility;
    transition: .3s;
    border-radius: 6px;

    &::placeholder, ::-moz-placeholder, ::-webkit-input-placeholder {
      font-weight: normal;
      font-family: var(--font-family);
    }
  
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

  &__eye-icon {
    width: 20px;
    position: absolute;
    right: 12px;
    bottom: 10px;
    color: var(--color-secondary-100);
    cursor: pointer;
  }

  &__warning-icon {
    width: 20px;
    position: absolute;
    right: 12px;
    bottom: 32px;
    color: var(--color-error);
    cursor: pointer;
  }

  &--invalid {
    border-color: var(--color-error) !important;
    transition: .3s;
  }

  &__error-message {
    color: var(--color-error);
    font-size: 14px;
    display: flex;
    gap: 10px;
    transition: opacity .2s ease;
  }

  &__loading {
    width: 20px;
    position: absolute;
    left: 8px;
    bottom: 30px;
    color: var(--color-secondary-100);
    cursor: pointer;

    .spinner {
      width: 24px;
      height: 24px;
    }
  }
}
</style>