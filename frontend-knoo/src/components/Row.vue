
<script setup lang="ts">
import type { StyleValue } from 'vue';

const props = defineProps({
  align_items: {
    type: String,
    required: false,
    default: ''
  },
  justify_content: {
    type: String,
    required: false,
    default: ''
  },
  flex_wrap: {
    type: String,
    required: false,
    default: 'nowrap'
  },
  row_gap: {
    type: String,
    required: false,
    default: ''
  },
  column_gap: {
    type: String,
    required: false,
    default: ''
  },
})

const style = {
  'column-gap': props.column_gap,
  'row-gap': props.row_gap,
  'align-items': props.align_items,
  'justify-content': props.justify_content,
  'flex-wrap': props.flex_wrap
} as StyleValue

</script>

<template>
    <div class="row" :style="style">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
</style>