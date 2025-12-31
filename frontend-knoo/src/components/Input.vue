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

const { isValidEmail, slugify } = useUtils()

watchEffect(() => {
  internalValue.value = props.modelValue
})

const onMaska = (event: CustomEvent<MaskaDetail>) => {
  updateValue(event.detail.unmasked)
  currentMask.value = event.detail.unmasked.length > 11
    ? '##.###.###/####-##'
    : '###.###.###-##*'
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.type === 'email' && event.key === ' ') {
    event.preventDefault()
    return
  }
}

const updateValue = (value: string) => {
  // const { value } = event.target as HTMLInputElement

  if(props.type === 'email' && value) {
    isValid.value = isValidEmail(value)
    if(toValue(isValid)) {
      emit('update:modelValue', value)
      return
    }
  
    errorMessage.value = 'E-mail inválido.'
    return
  }

  if(props.type === 'money' && value) {

    if(props.minValue)
      isValid.value = +unformat(value) >= props.minValue

    if(toValue(isValid)) {
      errorMessage.value = ''
      emit('update:modelValue', +unformat(value))
      return
    }

    errorMessage.value = 'Valor menor que o permitido.'      
  }

  if(props.type === 'slug' && value) {
    emit('update:modelValue', slugify(value))
  
    return
  }


  emit('update:modelValue', value)
}

const passwordType = ref('password')

const config = computed(() => ({
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
  disableNegative: true,
  disabled: false,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  shouldRound: false,
  focusOnRight: false,
  masked: false
}))

const currentMask = ref('###.###.###-##')
</script>

<template>
  <Field
    :name="name">
    <div class="input">
      <Label v-if="label" :text="label"/>
      <input :required="true" :value="internalValue" :disabled="disabled" :class="{ 'input--invalid': !isValid }"   :placeholder="placeholder" @maska="onMaska" v-model="internalValue" v-maska class="input__field" :data-maska="currentMask" v-if="type === 'cpf/cnpj'"/>
      <input
        v-else-if="type !== 'money'"
        v-maska
        :data-maska="mask"
        :data-maska-tokens="tokens"
        :list="list"
        @keydown="handleKeyDown"
        class="input__field"
        :id="id"
        :value="internalValue"
        v-model="internalValue"
        :minlength="minLength"
        :min="minValue"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :max="maxValue"
        :maxlength="maxLength"
        :type="type === 'password' ? passwordType : type"
        :placeholder="placeholder"
        :class="{ 'input--invalid': !isValid }"
        :disabled="disabled"
        :required="true" />
        <money3 @input="updateValue($event)" class="input__field" v-model="internalValue" v-bind="config" :class="{ 'input--invalid': !isValid || errorText }"  v-else/>
        
        <EyeSlashIcon @click="passwordType = 'text' " class="input__eye-icon" v-if="passwordType === 'password' && type === 'password' "/>
        <div class="input__loading" v-if="isLoading">
                    <!-- <span class="input__loading--spinner"></span> -->
          <Spinner />
        </div>
        <EyeIcon @click="passwordType = 'password'" class="input__eye-icon" v-if="passwordType !== 'password' && type === 'password'"/>
        <ExclamationTriangleIcon class="input__warning-icon" v-if="errorText || !isValid"/>
      <span class="input__error-message" v-if="!isValid && type === 'email' || type === 'money'">
        {{ errorMessage }}
      </span>
      <span class="input__error-message" v-if="errorText">
        {{ errorText }}
      </span>
      <span class="input__error-message" v-if="type === 'number' && minValue && internalValue && +internalValue < minValue">Valor menor que o permitido ({{minValue}})</span>
    </div>

  </Field>
</template>

<style lang="scss" scoped>

.input {
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

  > input[type=number] {
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
    }
  }

  > input[type=color]{
    width: 100%;
  }
  
  &__field {
    font-family: var(--font-family-bold);
    background-color: var(--color-transparent);
    color: var(--color-secondary);
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