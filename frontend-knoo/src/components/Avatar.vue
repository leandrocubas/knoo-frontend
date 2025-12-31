<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  source: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: 'primary'
  }
})

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(part => part.charAt(0)
    .toUpperCase())
    .join('')

const label = computed(() => getInitials(props.name))
const type = computed(() => props.type)
</script>

<template>
    <div class="avatar">
        <img
          class="avatar__image"
          v-if="source"
          :src="source" 
          :alt="name"
        />
        <div class="avatar__label" v-class="{ [type]: true }" v-else>
            <span>{{ label }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.avatar__base {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
    &__image {
        @extend .avatar__base;
        object-fit: cover;
    }

    &__label {
        @extend .avatar__base;
        font-size: 14px;
        font-weight: 700;

        &--primary {
          color: var(--color-white);
          background-color: var(--color-primary);
        }

        &--darken {
          color: var(--color-primary);
          background-color: rgba(var(--color-black-rgb), 0.1);
        }
    }
}
</style>