<template>
  <div class="toggle">
    <div class="toggle__switch" :class="{'toggle__switch--inactive': !isActive, 'toggle__switch--blocked': isBlocked }"  :style="{ padding: `0 ${isActive ? '4px' : '8px'}` }" @click="toggle">
      <div class="toggle__switch__knob" :class="{ 'toggle__switch__knob--active': isActive && !isBlocked }"></div>
    </div>
    <label>{{ isActive && !isBlocked ? 'Ativo' : 'Inativo' }}</label>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useProduct } from '@/composables/useProduct'

const { product_list, onToggleProduct } = useProduct()

const props = defineProps({
  isActive: {
    type: Number,
    required: false,
    default: 0
  },
  isBlocked: {
    type: Number,
    required: false,
    default: 0
  },
  id: {
    type: Number,
    required: false,
    default: 0
  }
})
const isActive = ref<number>(props.isActive)
  
const toggle = () => {
  if(props.isBlocked) return


  isActive.value = isActive.value ? 0 : 1
  const product = product_list.value.find((_product) => _product.id === props.id)
  if(product){
    onToggleProduct(product)
      .catch(() => isActive.value = isActive.value ? 0 : 1)
  }

}
  
</script>
  
<style scoped lang="scss">
.toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &__switch {
    width: 60px;
    height: 26px;
    background-color: var(--color-primary);
    border-radius: 15px;
    display: flex;
    align-items: center;
    
    &--inactive {
      background-color: #A8B0CB;
    }

    &--blocked {
      background-color: var(--color-gray);
      cursor: not-allowed;
    }

    &__knob {
      width: 16px;
      height: 16px;
      background-color: rgba(var(--color-white-rgb), .6);
      border-radius: 50%;
      transition: transform .2s;
      display: flex;
      align-items: center;
  
      &--active {
        transform: translateX(30px);
        background-color: var(--color-white);
      }
    }
  }

  &--label {
    font-weight: 600;
  }
} 
</style>
  