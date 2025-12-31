<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/Card.vue'
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Pencil from '@/components/icons/Pencil.vue'
import Duplicate from '@/components/icons/Duplicate.vue'
import ToggleArea from '@/components/ToggleArea.vue'
import Row from '@/components/Row.vue'
import Chip from '@/components/Chip.vue'
import Column from '@/components/Column.vue'
import Backdrop from '@/components/Backdrop.vue'
import { useArea } from '@/composables/useArea'
import { StatusEnum } from '@/enums/status.enum'

const { toggle, isOptionsOpened } = useArea()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  imageUrl: {
    type: String,
    required: false,
    default: '',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: '',
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const isActive = ref(props.isActive)
const emit = defineEmits(['delete', 'edit', 'enter'])
</script>

<template>
  <Card>
    <div class="card-area">
      <div class="card-area__options">
        <EllipsisVerticalIcon @click.stop="toggle" />

        <Transition>
          <div class="card-area__options__content" v-if="isOptionsOpened">
            <Column gap="16px">
              <div class="card-area__options__content--option">
                <Row
                  align_items="center"
                  column_gap="16px"
                  @click.stop="toggle(), emit('edit')"
                >
                  <Pencil color="#fff" />
                  <span>Editar</span>
                </Row>
              </div>
              <div class="card-area__options__content--option disabled">
                <Row align_items="center" column_gap="16px">
                  <Duplicate color="white" />
                  <span class="disabled">Duplicar</span>
                </Row>
              </div>
              <div
                class="card-area__options__content--option"
                @click.stop="toggle(), emit('delete')"
              >
                <Row align_items="center" column_gap="16px">
                  <TrashIcon class="delete-icon" />
                  <span>Excluir</span>
                </Row>
              </div>
            </Column>
          </div>
        </Transition>

        <Backdrop v-if="isOptionsOpened" @click.stop="toggle" />
      </div>
      <div class="card-area__image-area">
        <figure class="card-area__image-area--picture" v-if="props.imageUrl">
          <img :src="props.imageUrl" />
        </figure>
        <figure class="card-area__image-area--picture" v-else>
          <img src="@/assets/images/none.png" />
        </figure>
      </div>

      <div class="card-area__infos">
        <label class="card-area__infos--name">{{ name }}</label>
        <!-- <p class="card-area__infos--description">{{ description }}</p> -->
        <Chip :type="StatusEnum.WARNING">{{type}}</Chip>
        <ToggleArea :id="id" v-model="isActive" />
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.card-area {
  display: flex;
  column-gap: 32px;
  row-gap: 20px;
  cursor: pointer;

  &__options {
    position: absolute;
    right: 14px;
    top: 14px;
    cursor: pointer;
    z-index: 1;
    svg {
      width: 24px;
    }

    &__content {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 10;
      border: none;
      border-radius: 10px;
      border: 1px solid var(--color-primary);
      padding: 16px 14px;
      background-color: rgba(var(--color-primary-rgb), .4);
      width: 156px;
      display: grid;
      gap: 27px;

      &--option {
        &:not(:last-child) {
          padding: 0px 10px 10px 10px;
          border-bottom: 1px solid rgba(var(--color-white-rgb), 0.4);
          color: var(--color-white);
        }

        &:last-child {
          padding: 0px 10px 0px 10px;
          color: var(--color-white);
        }
      }
    }
  }

  &__image-area {
    position: relative;
    overflow: hidden;
    width: 156px;
    min-width: 156px;
    border-radius: 10px;
    z-index: 0;
    height: 144px;

    &--picture {
      position: absolute;
      transform: translate(-50%, -50%);
      
      img {
        position: fixed;
        aspect-ratio: 10/10;
        width: 156px;
        height: 144px;
        object-fit: cover;
      }
    }
  }

  &__infos {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    max-width: 70%;

    &--name {
      font-family: var(--font-family-bold);
    }

    &--description {
      color: var(--color-gray-100);
    }
  }
}

.delete-icon {
  width: 19px !important;
  color: var(--color-error);
}

.disabled {
  color: var(--color-white);
  opacity: .8;
  cursor: not-allowed !important;
}

@media (max-width: 455px) {
  .card-area {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
