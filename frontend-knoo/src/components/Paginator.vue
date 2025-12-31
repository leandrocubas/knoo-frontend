<script setup lang="ts">
import { usePaginator } from '@/composables/usePaginator'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import type { IPagination } from '@/interfaces/pagination.interface'

const emit = defineEmits(['page'])

const props = defineProps<{ pagination: IPagination | null}>()

const {
    visiblePages,
    maxPages,
    nextPage,
    previousPage,
    goToPage
} = usePaginator(emit, props.pagination ?? null)

</script>

<template>
    <div class="paginator" v-if="maxPages > 1">
      <button @click="previousPage" class="paginator__button" v-class="{ disabled: pagination!.pageIndex === 1 }">
        <ChevronLeftIcon />
      </button>
      <div class="paginator__pages">
        <div v-for="page in visiblePages" :key="page" @click="page !== '...' && goToPage(page)"
            class="paginator__pages__page" v-class="{ active: page === pagination!.pageIndex, disabled: page === '...' }">
          {{ page }}
        </div>
      </div>
      <button @click="nextPage" class="paginator__button" v-class="{ disabled: pagination!.pageIndex === maxPages }">
        <ChevronRightIcon />
      </button>
    </div>
</template>
  

<style lang="scss" scoped>
.paginator {
    display: flex;

    &__pages {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        margin: 0 10px;

        &__page {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            padding: 10px;
            font-family: var(--font-family-bold);
            font-size: 12px;
            cursor: pointer;

            &--disabled {
                cursor: not-allowed;
                color: var(--color-gray);
                background-color: transparent;
                &:hover {
                    background-color: transparent;
                }
            }

            &:hover {
                background-color: rgba(var(--color-primary-rgb), .4);
            }

            &--active {
                background-color: var(--color-primary);
                cursor: auto;
                &:hover {
                    background-color: var(--color-primary);
                }
            }
        }
    }

    &__button {
        display: flex;
        align-items: center;
        border: none;
        background-color: var(--color-transparent);
        cursor: pointer;
        svg {
            height: 20px;
            width: 20px;
            color: var(--color-white);
            transition: .2s;
        }
        &:hover {
            svg {
                color: var(--color-primary);
            }

        }

        &--disabled {
            cursor: not-allowed;
            &:hover {
                svg {
                    color: var(--color-gray) !important;
                }
            }
            svg {
                color: var(--color-gray);
            }
        }
    }
}
</style>