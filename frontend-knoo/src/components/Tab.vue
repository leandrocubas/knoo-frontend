<script setup lang="ts">
import { computed, inject, type PropType, type Ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  icon: {
    type: Object as PropType<any>,
    required: false,
    default: null
  }
})

const selectedTab: Ref<any> = inject('selectedTab')!
const isSelected = computed(() => selectedTab.value?.title === props.title)
</script>

<template>
  <div class="tab" v-show="isSelected">
    <div class="tab__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
    height: 50vh;
    &__content {
      padding: 32px 0;
      display: grid;
      row-gap: 26px;
      margin-right: 10px;
    }
}
</style>