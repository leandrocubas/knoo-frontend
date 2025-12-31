<script setup lang="ts">
import type { ITableHeader } from '@/interfaces/table.interface'
import Row from '@/components/Row.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Paginator from '@/components/Paginator.vue'
import { useUtils } from '@/composables/useUtils'
import type { IPagination } from '@/interfaces/pagination.interface'
import type { PropType } from 'vue'
import { format } from 'date-fns'

const { mask, formatMoney } = useUtils()
const emit = defineEmits(['page'])
defineProps({
  isSticky: {
    type: Boolean,
    required: false,
    default: false
  },
  rows: {
    type: Array<any>,
    required: true,
    default: []
  },
  headers: {
    type: Array<ITableHeader>,
    required: true,
    default: []
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  },
  pagination: {
    type: Object as PropType<IPagination>,
    required: false,
    default: false
  }
})

</script>

<template>
    <table class="table">
        <thead class="table__header" :class="{ 'table__header--sticky': isSticky }">
          <tr class="table__header__row">
            <th
              class="table__header__row__cell"
              v-for="header in headers" :key="header.key"
              :style="{ 'text-align': header.align }">{{header.label}}</th>
          </tr>
        </thead>
        <tbody class="table__body" v-if="!isLoading">
          <tr v-for="(data, index) in rows" :key="index" v-if="rows.length" class="table__body__row">
            <td class="table__body__row__cell" v-for="header in headers">
              <div v-if="header.key !== 'action' && header.key !== 'component' && header.key !== 'component2'">
                <div v-if="!header.mask">
                  <span v-if="data[header.key] && !header.isMoney && !header.isDate">{{data[header.key]}}</span>
                  <span v-if="!data[header.key] && !header.isMoney && !header.isDate">-</span>
                </div>
                <div v-if="header.mask" class="table__body__row__cell--selectable">
                  <span>{{ mask(data[header.key], header.mask) }}</span>
                </div>
                <div v-if="header.isMoney"> 
                  {{ formatMoney(data[header.key]) }}
                </div>
                <div v-if="header.isDate"> 
                  {{ format(data[header.key], header.format ?? '') }}
                </div>
              </div>
              <div v-if="header.key === 'action'">
                <Row column_gap="14px" :justify_content="header.align === 'right' ? 'flex-end' : header.align === 'center' ? 'center' : 'flex-start' ">
                  <slot :header :row="data" name="actions"/>
                </Row>
              </div>
              <div v-if="header.key === 'component'">
                <Row column_gap="14px" :justify_content="header.align === 'right' ? 'flex-end' : header.align === 'center' ? 'center' : 'flex-start' ">
                  <slot :header :row="data" name="component"/>
                </Row>
              </div>
              <div v-if="header.key === 'component2'">
                <Row column_gap="14px" :justify_content="header.align === 'right' ? 'flex-end' : header.align === 'center' ? 'center' : 'flex-start' ">
                  <slot :header :row="data" name="component2"/>
                </Row>
              </div>
            </td>
          </tr>
          
        </tbody>
        <tbody class="table__body table--loading" v-else>
          <tr>
            <td>
              <GhostLoading class="major" :height="30"/>
              <GhostLoading class="middle" :height="30"/>
              <GhostLoading class="minor" :height="30"/>
            </td>
          </tr>
        </tbody>

    </table>
    <div class="table__footer" v-if="rows.length && !isLoading">
      <Paginator :pagination @page="emit('page', $event)" />
    </div>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-spacing: 0;

  &__header {
    &__row {

      &__cell {
        padding: 14px 0;
        text-align: left;
        font-family: var(--font-family-bold);
        position: relative;
        background-color: rgba(var(--color-white-rgb), .06);
        font-size: 12px;

        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          padding-left: 10px;
          border-top: 1px solid rgba(var(--color-primary-rgb), .4);
          border-bottom: 1px solid rgba(var(--color-primary-rgb), .4);
          border-left: 1px solid rgba(var(--color-primary-rgb), .4);
        }

        &:not(:last-child, :first-child) {
          border-top: 1px solid rgba(var(--color-primary-rgb), .4);
          border-bottom: 1px solid rgba(var(--color-primary-rgb), .4);
        }

        &:last-child { 
          padding-right: 10px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-top: 1px solid rgba(var(--color-primary-rgb), .4);
          border-bottom: 1px solid rgba(var(--color-primary-rgb), .4);
          border-right: 1px solid rgba(var(--color-primary-rgb), .4);
        }
      }
    }

    &--sticky {
      position: sticky;
      top: 0;
    }
  }

  &__body {
    &__row {
      
      &__cell {
        
        padding: 20px 0;
        border-bottom: 1px solid rgba(var(--color-white-rgb), .10);

        &--selectable {
          span {
            &::selection {
              background-color: var(--color-primary);
            }

            user-select: text;
          }
        }

        &:first-child {
          padding-left: 10px;
        }

        &:last-child {
          padding-right: 10px;
        }
      }
    }

    &--empty {
      height: 100px;
      display: flex;
      position: absolute;
      width: 83.4%;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
  }

  &--loading {
    tr {
      td {
        padding: 10px 0;
        
        position: absolute;

        

        .ghost-loading.major {
          margin: 10px 0;
          width: 60vw;
        }

        .ghost-loading.middle {
          margin: 10px 0;
          width: 30vw;
        }

        .ghost-loading.minor {
          margin: 10px 0;
          width: 15vw;
        }
      }
    }
  }

  &__footer {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

  