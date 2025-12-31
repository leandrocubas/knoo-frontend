<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import { TrashIcon } from '@heroicons/vue/24/outline'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import CardModule from '@/components/CardModule.vue'
import Dialog from '@/components/Dialog.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Column from '@/components/Column.vue'
import Upload from '@/components/Upload.vue'
import { Size } from '@/enums/size.enum'
import { useModule } from '@/composables/useModule'
import { useArea } from '@/composables/useArea'
import type { IMedia, IModule } from '@/store/module/interface/module.interface'
import { usePage } from '@/composables/usePage'
import draggable from 'vuedraggable'

const {
  module_list,
  module_name,
  module_image_banner,
  module_image_cover,
  thumb_image,
  bannerImage,
  isDeleting,
  isLoading,
  isLoadingModules,
  isFillModule,
  isEditingModule,
  canCreate,
  canEdit,
  orderedModules,
  onToggleConfirmDeleteDialog,
  onDelete,
  onToggleEdit,
  onToggleFillModuleDialog,
  onToggleEditModuleInfoDialog,
  onEdit,
  onCreate,
  onGet,
  onOpenModule,
  drag_end_module
} = useModule()

const { setHeader } = usePage()

const { actual_area } = useArea()

const route = useRoute()
const router = useRouter()
const { id } = route.params

watch(
  () => module_list.value,
  (newModules) => {
    orderedModules.value = [...newModules]
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  if(typeof id === 'string'){
    onGet(id)
    const { area_name } = actual_area.value || {}
    if (area_name) {
      setHeader(area_name)
    }
  }
})

const redirect = (module?: string) =>
  router.push({ path: `/area-de-membros/${id}/modulo/${module}` })

const goToPage = (module: IModule) => {
  onOpenModule(module)
  redirect(module.id)
}
</script>

<template>
  <section class="module">
    <div class="module__header">
      <div class="module__header__actions">
        <div class="module__header__actions--button">
          <Button @click="onToggleFillModuleDialog">+ Adicionar Módulo</Button>
        </div>
      </div>
    </div>

    <div class="module__content--list">
      <draggable
        v-model="orderedModules"
        @end="drag_end_module"
        item-key="id"
        handle=".drag-handle"
        class="dnd-wrapper">
        <template #item="{ element: module }">
          <CardModule
            @edit="() => onToggleEdit(module)"
            @delete="() => onToggleConfirmDeleteDialog(module.id, true)"
            @click="() => goToPage(module)"
            v-if="module_list?.length && !isLoadingModules"
            :key="module.id"
            :image-name="
              (module &&
                module.media?.find((item: IMedia) => item.media_type === 'Thumbnail')
                  ?.s3_url) ||
              ''
            "
            :is-active="module.is_active"
            :id="module.id ?? ''"
            :description="module.description"
            :name="module.module_name"
          />
        </template>
      </draggable>

      <span v-if="!module_list.length && !isLoadingModules"
        >Não há módulos cadastrados</span
      >

      <GhostLoading min-height="188px" v-if="isLoadingModules" />
      <GhostLoading min-height="188px" v-if="isLoadingModules" />
    </div>

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
        <label>Tem certeza que deseja excluir o módulo?</label>
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

    <Dialog
      @opened="onToggleFillModuleDialog"
      :open="isFillModule"
      title="Novo módulo"
      :border="true"
    >
      <div class="dialog-module-info__content">
        <Form>
          <Column gap="24px" class="dialog-module-info__content--form">
            <Input
              label="Nome do Módulo"
              placeholder="Nome do Módulo"
              v-model="module_name"
            />

            <div class="dialog-module-info__content--upload-cover">
              <Upload
                :image-path="thumb_image"
                v-model="module_image_cover"
                id="module-cover-image"
                label="Imagem de capa"
                description="Tamanho recomendado: 1200×1500px (proporção 4:5)"
              />
            </div>

            <div class="dialog-module-info__content--upload-banner">
              <Upload
                @edit="bannerImage = ''"
                :image-path="bannerImage"
                v-model="module_image_banner"
                id="module-banner-image"
                label="Banner"
                description="Tamanho recomendado: 1800×600 px (proporção 3:1)"
                :size="Size.SMALL"
              />
            </div>
          </Column>
        </Form>
      </div>

      <div class="dialog__footer">
        <span @click="onToggleFillModuleDialog">Cancelar</span>

        <div class="dialog__footer--button">
          <Button :disabled="!canCreate" @click="onCreate">Salvar</Button>
        </div>
      </div>
    </Dialog>

    <Dialog
      @opened="onToggleEdit"
      :open="isEditingModule"
      title="Editar módulo"
      :border="true"
    >
      <div class="dialog-module-info__content">
        <Form>
          <Column gap="24px" class="dialog-module-info__content--form">
            <Input
              label="Nome do Módulo"
              placeholder="Nome do Módulo"
              v-model="module_name"
            />

            <div class="dialog-module-info__content--upload-cover">
              <Upload
                @edit="thumb_image = ''"
                :image-path="thumb_image"
                v-model="module_image_cover"
                id="module-cover-image"
                label="Imagem de capa"
                description="Tamanho recomendado: 1200×1500 px (proporção 4:5)"
              />
            </div>

            <div class="dialog-module-info__content--upload-banner">
              <Upload
                @edit="bannerImage = ''"
                :image-path="bannerImage"
                v-model="module_image_banner"
                id="module-banner-image"
                label="Banner"
                description="Tamanho recomendado: 1800×600 px (proporção 3:1)"
                :size="Size.SMALL"
              />
            </div>
          </Column>
        </Form>
      </div>

      <div class="dialog__footer">
        <span @click="() => onToggleEditModuleInfoDialog('module-id')"
          >Cancelar</span
        >

        <div class="dialog__footer--button">
          <Button :is-loading="isLoading" :disabled="!canEdit" @click="onEdit"
            >Editar</Button
          >
        </div>
      </div>
    </Dialog>
  </section>
</template>

<style lang="scss" scoped>
.dnd-wrapper {
  width: 100%;
  display: grid;
  gap: 20px;
}

.module {
  display: grid;
  row-gap: 26px;
  &__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    row-gap: 14px;

    &__title {
      font-family: var(--font-family-bold);
      font-size: 16px;
    }

    &__actions {
      display: flex;
      column-gap: 26px;
      &--square-mode {
        width: 20px;
        cursor: pointer;
        color: rgba(var(--color-gray-rgb), 0.9);
      }

      &--active {
        color: var(--color-white) !important;
      }

      &--list-mode {
        width: 20px;
        cursor: pointer;
        color: rgba(var(--color-gray-rgb), 0.9);
      }

      &--button {
        width: 211px;
      }
    }
  }

  &__content--square {
    display: flex;
    flex-wrap: wrap;
    row-gap: 22px;
    column-gap: 28px;

    .card {
      flex: 0 0 calc(50% - 14px) !important;
      padding: 14px;
    }
  }

  &__content--list {
    display: flex;
    flex-wrap: wrap;
    row-gap: 22px;
    column-gap: 28px;

    .card {
      flex: 0 0 calc(100% - 14px) !important;
      padding: 14px;
    }
  }
}

.dialog {
  &__content {
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

.dialog-module-info {
  &__content {
    padding-bottom: 26px;
  }

  &__content--upload-banner {
    height: 125px;
  }

  &__content--upload-cover {
    height: 217px;
    width: 171px;
    margin: 0 auto;
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
