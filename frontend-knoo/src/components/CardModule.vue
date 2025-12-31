<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/Card.vue'
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Pencil from '@/components/icons/Pencil.vue'
import Duplicate from '@/components/icons/Duplicate.vue'
import ToggleModule from '@/components/ToggleModule.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Backdrop from '@/components/Backdrop.vue'
import { useModule } from '@/composables/useModule'

const { toggle, isOptionsOpened } = useModule()

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
  imageName: {
    type: String,
    required: false,
    default: '',
  },
  description: {
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
    <div class="card-module">
      <div class="drag-handle">⋮⋮</div>
      <div class="card-module__options">
        <EllipsisVerticalIcon @click.stop="toggle" />

        <Transition>
          <div class="card-module__options__content" v-if="isOptionsOpened">
            <Column gap="16px">
              <div class="card-module__options__content--option">
                <Row
                  align_items="center"
                  column_gap="16px"
                  @click.stop="toggle(), emit('edit')"
                >
                  <Pencil color="var(--color-primary)" />
                  <span>Editar</span>
                </Row>
              </div>
              <div class="card-module__options__content--option disabled">
                <Row align_items="center" column_gap="16px">
                  <Duplicate color="rgb(113, 95, 100)" />
                  <span class="disabled">Duplicar</span>
                </Row>
              </div>
              <div
                class="card-module__options__content--option"
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
      <div class="card-module__image-area">
        <figure class="card-module__image-area--picture" v-if="props.imageName">
          <img :src="props.imageName" />
        </figure>
        <figure class="card-module__image-area--picture" v-else>
          <img src="@/assets/images/none.png" />
        </figure>
      </div>

      <div class="card-module__infos">
        <label class="card-module__infos--name">{{ name }}</label>
        <p class="card-module__infos--description"> {{ description }}</p>
        <ToggleModule :id="Number(id)" v-model="isActive" />
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.card-module {
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
      background-color: rgb(var(--color-white-rgb));
      width: 156px;
      display: grid;
      gap: 27px;

      &--option {
        &:not(:last-child) {
          padding: 0px 10px 10px 10px;
          border-bottom: 1px solid rgba(var(--color-gray-rgb), 0.4);
        }

        &:last-child {
          padding: 0px 10px 0px 10px;
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
        object-fit: cover;
        position: fixed;
        aspect-ratio: 10/10;
        width: 156px;
        height: 144px;
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
  color: var(--color-gray);
  cursor: not-allowed !important;
}

@media (max-width: 455px) {
  .card-module {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
