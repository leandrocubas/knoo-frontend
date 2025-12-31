<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue', 'toggle'])

const props = defineProps({
  id: String,
  modelValue: Boolean,
  label: String,
  disabled: Boolean
})

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})



</script>

<template>
    <div class="radio-button" :class="{ 'radio-button--disabled': disabled }" @click="!disabled ? emit('toggle', !isChecked): null">
        <label :for="id">
            <div
                :class="{
                    'radio-button__circle--active': isChecked,
                    'radio-button__circle--inactive': !isChecked
                }"
                class="radio-button__circle">
                <div></div>
            </div>
    
            <span v-if="label" :class="{
                'radio-button__label--active': isChecked,
                'radio-button__label--inactive': !isChecked 
            }">{{label}}</span>
        </label>
    </div>

    <input class="input" :id="id" :checked="isChecked" type="radio" />
</template>
<style lang="scss" scoped>
.radio-button {
    label {
        display: flex;
        gap: 12px;
        align-items: center;

    }

    &--disabled {
        opacity: .3;
        cursor: not-allowed !important;
    }

    &__circle {
        border: 1px solid transparent;
        border-radius: 100%;
        width: 20px;
        height: 20px;
        display: flex;
        &--active {
            cursor: pointer;
            border-color: var(--color-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity .4s ease;

            > div {
                cursor: pointer;
                width: 8px;
                height: 8px;
                border-radius: 100%;
                background-color: var(--color-primary);
                transition: opacity .4s ease;
            }
        }
        
        &--inactive {
            cursor: pointer;
            border-color: var(--color-secondary);
            transition: opacity .4s ease;
            display: flex;
            align-items: center;
            justify-content: center;

            > div {
                display: none;
            }
        }
    }

    &__label {
        &--active {
            cursor: pointer;
            color: var(--color-primary);
        }

        &--inactive {
            cursor: pointer;
            color: var(--color-secondary);
        }
    }
}

input.input {
    display: none;
}
</style>