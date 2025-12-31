<script setup lang="ts">
import type { INotification } from '@/composables/useNotification'
import Flame from '@/components/icons/Flame.vue'
import type { PropType } from 'vue'
import Column from '@/components/Column.vue'
import Row from '@/components/Row.vue'

const props = defineProps({ data: Object as PropType<INotification> })
</script>

<template>
    <div class="notify">
      <div class="notify__message">
        <Row column_gap="13px">
          <circle class="notify__icon">
            <Flame />
          </circle>
    
          <Column>
            <label class="notify__message--title">{{props.data?.title}}</label>
            <span class="notify__message--commission">Sua comissão: {{props.data?.value}}</span>
          </Column>
        </Row>
      </div>


      <span class="notify__date-time">{{props.data?.date}}</span>
    </div>
</template>

<style lang="scss" scoped>
.notify {
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-right: 13px;

  &__icon {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    padding: 8px;
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__message {
    &--title {
      font-size: 14px;
      font-family: var(--font-family-bold);
      line-height: 16px;
    }

    &--commission {
      font-size: 12px;
      color: var(--color-gray-100);
      line-height: 16px;
    }
  }

  &__date-time {
    margin-right: 8px;
  }
}
</style>