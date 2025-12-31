<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'
import Chip from '@/components/Chip.vue'
import Pencil from '@/components/icons/Pencil.vue'
import Select from '@/components/Select.vue'
import ToggleIntegration from '@/components/ToggleIntegration.vue'
import { TagIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useMembership } from '@/composables/useMembership'
import { useModule } from '@/composables/useModule'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const {
  membership_list,
  membership_offer,
  membership_offer_list,
  isLoading,
  isDeleting,
  isAddOpened,
  isEditing,
  membership_offer_label,
  editing_modules,
  toggleOppened,
  onGet,
  onCreate,
  onToggleConfirmDeleteDialog,
  onDelete,
  onEdit,
  onToggleConfirmEditDialog
} = useMembership()

const { module_list } = useModule()

const route = useRoute()
const { id } = route.params

onMounted(() => {
  if (typeof id === 'string') {
    onGet(id)
  }
})
</script>

<template>
  <section class="integrations">
    <div class="integrations__header">
      <div class="integrations__header__actions">
        <div class="integrations__header__actions--button">
          <Button @click="toggleOppened(id)">+ Adicionar Integração</Button>
        </div>
      </div>
    </div>

    <div class="integrations__content">
      <div
        class="integrations__card"
        :key="membership.id"
        v-if="membership_list.length && !isLoading"
        v-for="membership in membership_list">
          <div class="integrations__card-header">
            <div class="integrations__card-header--icon">
              <TagIcon />
            </div>

            <div class="integrations__card-header--info">
              <h4>{{ membership.offer_name }}</h4>
              <span>{{ membership.description }}</span>
            </div>
        </div>
        <div class="integrations__card-footer">
          <div class="integrations__card-footer--modules">
            <Chip v-for="moodule in membership.modules?.filter(el => el.is_selected)" :key="moodule.module_id">
              {{ moodule.module_name }}</Chip
            >
          </div>

          <div class="integrations__card-footer--actions">
            <div
              class="integrations__card-footer--action"
              @click="onToggleConfirmEditDialog(membership)">
              <Pencil />
              Editar
            </div>
            <div
              class="integrations__card-footer--action"
              @click="
                onToggleConfirmDeleteDialog(membership.product_offering_id, true)
              "
            >
              <TrashIcon />
              Excluir
            </div>
          </div>
        </div>
      </div>
      <div class="integrations__link-offer" @click="toggleOppened(id)">
        <span>+ Vincular produto ou oferta a esta área de membro</span>
      </div>
    </div>

    <Dialog
      @opened="toggleOppened"
      :open="isAddOpened"
      title="Vincular produto ou oferta na área de membro">
      <div class="dialog__content">
        <Select
          :is-loading="isLoading"
          v-model="membership_offer"
          :items="membership_offer_list"
          label="Produto/oferta" />

        <div class="dialog__content--modules-label">
          <p>Módulos a vincular</p>
          <span
            >Configure quais módulos serão vinculados a este
            produto/oferta</span>
        </div>

        <div class="dialog__content--modules-list">
          <ToggleIntegration
            v-for="(module) in module_list"
            :key="module.id"
            v-model="module.is_selected"
            :label="module.module_name"
          />
        </div>
      </div>

      <div class="dialog__footer">
        <span @click="toggleOppened(id)">Cancelar</span>

        <div class="dialog__footer--button">
          <Button
            :is-loading="isLoading"
            :disabled="!membership_offer"
            @click="onCreate"
            >Salvar</Button
          >
        </div>
      </div>
    </Dialog>

    <Dialog
      @opened="() => onToggleConfirmEditDialog()"
      :open="isEditing"
      title="Editar produto ou oferta na área de membro">
      <div class="dialog__content">
        <Select
          :is-loading="isLoading"
          v-model="membership_offer"
          :items="[{ label: membership_offer_label, value: membership_offer }]"
          :disabled="true"
          label="Produto/oferta" />

        <div class="dialog__content--modules-label">
          <p>Módulos a vincular</p>
          <span
            >Configure quais módulos serão vinculados a este
            produto/oferta</span
          >
        </div>

        <div class="dialog__content--modules-list">
          <div v-for="(module) in editing_modules">
            <ToggleIntegration
              :key="module.id"
              v-model="module.is_selected"
              :label="module.module_name" />
          </div>
        </div>
      </div>

      <div class="dialog__footer">
        <span @click="onToggleConfirmEditDialog()">Voltar</span>

        <div class="dialog__footer--button">
          <Button
            :is-loading="isLoading"
            :disabled="!membership_offer"
            @click="onEdit"
            >Editar</Button
          >
        </div>
      </div>
    </Dialog>

    <Dialog
      @opened="(opened: boolean) => onToggleConfirmDeleteDialog(undefined, opened)"
      :open="isDeleting"
    >
      <div class="dialog__content--delete-icon">
        <div class="dialog__content--delete-icon--icon">
          <TrashIcon />
        </div>
      </div>

      <div class="dialog__content--title">
        <label>Tem certeza que deseja excluir a integração?</label>
        <span>Essa ação não poderá ser desfeita.</span>
      </div>

      <div class="dialog__footer">
        <span @click="onToggleConfirmDeleteDialog(undefined, false)"
          >Voltar</span
        >

        <div class="dialog__footer--button">
          <Button type="error" @click="onDelete">Excluir</Button>
        </div>
      </div>
    </Dialog>
  </section>
</template>

<style lang="scss" scoped>
.integrations {
  display: grid;
  row-gap: 26px;

  &__content {
    max-width: calc(100vw - 30px);
    display: grid;
    row-gap: 26px;
  }

  &__header {
    position: relative;

    &__title {
      font-family: var(--font-family-bold);
      font-size: 16px;
    }

    &__actions {
      display: flex;
      column-gap: 26px;
      justify-content: end;
      flex: 1;
      align-items: center;

      &--active {
        color: var(--color-white) !important;
      }

      &--button {
        width: 211px;
      }
    }
  }

  &__card {
    border: 1px solid rgba(var(--color-primary-rgb), 0.4);
    padding: 18px;
    border-radius: 20px;
  }

  &__card-header {
    display: flex;
    gap: 24px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(var(--color-black-rgb), 0.1);
    padding-bottom: 18px;

    &--info {
      h4 {
        font-size: 18px;
        font-family: var(--font-family-bold);
      }

      span {
        font-size: 14px;
        color: var(--color-secondary);
      }
    }

    &--icon {
      width: 35px;
      height: 35px;
      padding: 6px;
      border-radius: 50%;
      background: rgba(var(--color-black-rgb), 0.1);
      color: var(--color-primary);
    }
  }

  &__card-footer {
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
    align-items: flex-start;
    flex-wrap: wrap;
    row-gap: 12px;

    &--modules,
    &--actions,
    &--action {
      display: flex;
      align-items: center;
    }

    &--modules {
      margin-left: 5%;
      gap: 8px;
    }

    &--actions {
      gap: 22px;
      padding: 12px;
    }

    &--action {
      gap: 4px;
      cursor: pointer;

      svg {
        width: 23px;
        height: 23px;
      }
    }

    &--action:last-child {
      svg {
        color: var(--color-error);
      }
    }
  }

  &__link-offer {
    border: 1px dashed rgba(var(--color-primary-rgb), 1);
    padding: 18px;
    border-radius: 20px;
    background-color: rgb(var(--color-primary-rgb), .2);
    min-height: 161px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.dialog {
  &__content {
    display: grid;
    row-gap: 32px;

    &--delete-icon {
      justify-content: center;
      display: flex;
      &--icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        border-radius: 100%;
        background-color: var(--color-error);
        svg {
          width: 24px;
        }
      }
    }

    &--title {
      flex-direction: column;
      align-items: center;
      gap: 24px;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      padding-bottom: 76px;

      span {
        font-size: 14px;
        text-align: center;
      }
      label {
        font-size: 16px;
        font-family: var(--font-family-bold);
        text-align: center;
      }
    }

    &--modules-label {
      p {
        font-family: var(--font-family-bold);
      }

      span {
        color: var(--color-gray);
      }
    }

    &--modules-list {
      display: grid;
      grid-template-columns: 50% 50%;
      row-gap: 16px;
    }
  }

  &__footer {
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 20px;
    border-top: 1px solid rgba(var(--color-gray-rgb), 0.3);
    span {
      cursor: pointer;
    }

    &--button {
      width: 182px;
    }
  }
}

@media (max-width: 880px) {
  .module__content--square {
    display: flex;
    flex-wrap: wrap;
    row-gap: 22px;
    column-gap: 28px;

    .card {
      flex: 0 0 100% !important;
      padding: 14px;
    }
  }
}

@media only screen and (max-width: 753px) {
  .module {
    &__header {
      &__actions {
        &--square-mode {
          display: none;
        }

        &--list-mode {
          display: none;
        }
      }
    }
  }
}
</style>
