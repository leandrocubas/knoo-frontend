<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import {
  TrashIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/vue/24/outline'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import CardArea from '@/components/CardArea.vue'
import Column from '@/components/Column.vue'
import Upload from '@/components/Upload.vue'
import Row from '@/components/Row.vue'
import Dialog from '@/components/Dialog.vue'
import Toggle from '@/components/Toggle.vue'
import RadioButton from '@/components/RadioButton.vue'
import Label from '@/components/Label.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Download from '@/components/icons/Download.vue'
import Stream from '@/components/icons/Stream.vue'
import { useArea } from '@/composables/useArea'
import { LayoutStyle } from '@/enums/layout.enum'
import { Size } from '@/enums/size.enum'
import type { IArea } from '@/store/area/interface/area.interface'

const {
  area_list,
  members_area_name,
  members_area_slug,
  allow_comments,
  auto_approve_comments,
  canCreate,
  canEdit,
  isSquareMode,
  isCapturingAreaType,
  isDeleting,
  isFillAreaInfo,
  isEditingArea,
  isLoading,
  isCarousel,
  isRows,
  image_logo,
  thumbnail_logo,
  area_image_logo,
  area_image_cover,
  onToggleAreaTypeDialog,
  onToggleConfirmDeleteDialog,
  onDelete,
  onToggleEdit,
  onChangeMembersAreaType,
  onToggleFillAreaInfoDialog,
  onToggleEditAreaInfoDialog,
  toggleLayout,
  onEdit,
  onCreate,
  onGet,
  onOpenArea,
} = useArea()

const router = useRouter()
onMounted(() => onGet())

const goToPage = (area: IArea) => {
  onOpenArea(area)
  router.push({ path: `/area-de-membros/${area.id}` })
}
</script>

<template>
  <section class="members-area-list">
    <div class="members-area-list__header">
      <div class="members-area-list__header__actions">
        <Squares2X2Icon
          @click="isSquareMode = true"
          class="members-area-list__header__actions--square-mode"
          :class="{
            'members-area-list__header__actions--active': isSquareMode,
          }"
        />
        <ListBulletIcon
          @click="isSquareMode = false"
          class="members-area-list__header__actions--list-mode"
          :class="{
            'members-area-list__header__actions--active': !isSquareMode,
          }"
        />
        <div class="members-area-list__header__actions--button">
          <Button @click="onToggleAreaTypeDialog">+ Adicionar Área</Button>
        </div>
      </div>
    </div>

    <div
      :class="{
        'members-area-list__content--list': !isSquareMode,
        'members-area-list__content--square': isSquareMode,
      }"
    >
      <CardArea
        @edit="() => onToggleEdit(area)"
        @delete="() => onToggleConfirmDeleteDialog(area.id, true)"
        @click="() => goToPage(area)"
        v-if="area_list.length && !isLoading"
        v-for="area in area_list"
        :key="area.id"
        :image-url="(area && area.media?.filter(el => el.media_type	 === 'Thumbnail')[0]?.s3_url) || ''"
        :is-active="area.is_active"
        :id="area.id ?? ''"
        :type="area.area_type"
        :name="area.area_name"
      />

      <span v-if="!area_list.length && !isLoading"
        >Não há áreas cadastradas</span
      >

      <GhostLoading min-height="188px" v-if="isLoading" />
      <GhostLoading min-height="188px" v-if="isLoading" />
    </div>

    <Dialog
      mode="delete"
      @opened="(opened: boolean) => onToggleConfirmDeleteDialog(undefined, opened)"
      :open="isDeleting"
    >


      <div class="dialog__content--title">
        <label>Tem certeza que deseja excluir a área?</label>
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
      @opened="onToggleAreaTypeDialog"
      :open="isCapturingAreaType"
      title="Tipo de área de membro"
      :border="true"
      max-width="532px"
    >
      <div class="dialog-area-type__content">
        <Row column_gap="30px" align_items="center" justify_content="center">
          <Column>
            <div
              @click="onChangeMembersAreaType('file')"
              class="dialog-area-type__card"
            >
              <div class="dialog-area-type__card--image"><Download /></div>
              <span class="dialog-area-type__card--label"
                >Arquivos/Downloads</span
              >
            </div>
          </Column>
          <Column>
            <div
              @click="onChangeMembersAreaType('stream')"
              class="dialog-area-type__card"
            >
              <div class="dialog-area-type__card--image"><Stream /></div>
              <span class="dialog-area-type__card--label">Stream/Vídeos</span>
            </div>
          </Column>
        </Row>
      </div>
    </Dialog>

    <Dialog 
      @opened="onToggleFillAreaInfoDialog"
      :open="isFillAreaInfo"
      title="Nova Área de membros"
      :border="true">
      <div class="dialog-area-info__content">
        <Form>
          <Row
            justify_content="center"
            flex_wrap="wrap"
            column_gap="24px"
            row_gap="24px"
          >
            <Column gap="12px">
              <div class="dialog-area-edit__content--upload-logo">
                <Upload
                  @edit="image_logo = ''"
                  :image-path="image_logo"
                  v-model="area_image_logo"
                  id="area-logo-image"
                  label="Logo da área"
                  description="Tamanho recomendado: 1000×600 px"
                  :size="Size.SMALL"
                />
              </div>

              <div class="dialog-area-edit__content--upload-cover">
                <Upload
                  @edit="thumbnail_logo = ''"
                  :image-path="thumbnail_logo"
                  v-model="area_image_cover"
                  id="area-cover-image"
                  label="Imagem de capa"
                  description="Tamanho recomendado: 1200×1500 px (proporção 4:5)"
                />
              </div>
            </Column>
            <Column flex="auto">
              <div class="dialog-area-info__content--input">
                <Input
                  label="Nome da área"
                  placeholder="Nome da área"
                  v-model="members_area_name"
                />
              </div>

              <div class="dialog-area-info__content--input">
                <Input
                  label="Slug"
                  placeholder="curso.flamepay.com/area-de-membro"
                  v-model="members_area_slug"
                  type="slug"
                />
              </div>
              <div class="dialog-area-edit__content--comment">
                <div class="dialog-area-edit__content--toggle">
                  <Row
                    column_gap="8px"
                    justify_content="flex-start"
                    align_items="center"
                  >
                    <Toggle v-model="allow_comments" :show-label="false" />
                    <span>Permitir comentários</span>
                  </Row>
                </div>
                <div class="dialog-area-edit__content--toggle">
                  <Row
                    column_gap="8px"
                    justify_content="flex-start"
                    align_items="center"
                  >
                    <Toggle
                      v-model="auto_approve_comments"
                      :show-label="false"
                    />
                    <span>Aprovar comentários automaticamente</span>
                  </Row>
                </div>
              </div>

              <div class="dialog-area-edit__content--layout">
                <Label text="Layout da área" />
                <Row
                  align_items="center"
                  flex_wrap="wrap"
                  row_gap="20px"
                  column_gap="46px"
                >
                  <RadioButton
                    id="carousel"
                    @toggle="toggleLayout(LayoutStyle.CAROUSEL)"
                    v-model="isCarousel"
                    label="Conteúdos em carrossel"
                  />

                  <RadioButton
                    id="rows"
                    @toggle="toggleLayout(LayoutStyle.ROWS)"
                    v-model="isRows"
                    label="Conteúdos em fileiras"
                    disabled
                  />
                </Row>
              </div>
            </Column>
          </Row>
        </Form>
      </div>

      <div class="dialog__footer">
        <span @click="onToggleFillAreaInfoDialog">Cancelar</span>

        <div class="dialog__footer--button">
          <Button :disabled="!canCreate" @click="onCreate">Salvar</Button>
        </div>
      </div>
    </Dialog>

    <Dialog
      @opened="onToggleEdit"
      :open="isEditingArea"
      title="Editar área de membros"
      :border="true"
      :size="Size.LARGE"
    >
      <div class="dialog-area-edit__content">
        <Form>
          <Row
            justify_content="center"
            flex_wrap="wrap"
            column_gap="24px"
            row_gap="24px"
          >
            <Column gap="12px">
              <div class="dialog-area-edit__content--upload-logo">
                <Upload
                  @edit="image_logo = ''"
                  :image-path="image_logo"
                  v-model="area_image_logo"
                  id="area-logo-image"
                  label="Logo da área"
                  description="Tamanho recomendado: 1000x600px"
                  :size="Size.SMALL"
                />
              </div>

              <div class="dialog-area-edit__content--upload-cover">
                <Upload
                  @edit="thumbnail_logo = ''"
                  :image-path="thumbnail_logo"
                  v-model="area_image_cover"
                  id="area-cover-image"
                  label="Imagem de capa"
                  description="Tamanho recomendado: 1200x1500px (proporção 4:5)"
                />
              </div>
            </Column>
            <Column flex="auto">
              <div class="dialog-area-edit__content--input">
                <Input
                  label="Nome da área"
                  placeholder="Nome da área"
                  v-model="members_area_name"
                />
              </div>

              <div class="dialog-area-edit__content--input">
                <Input
                  label="Slug"
                  placeholder="curso.knoo.com/area-de-membro"
                  v-model="members_area_slug"
                  type="slug"
                />
              </div>

              <div class="dialog-area-edit__content--comment">
                <div class="dialog-area-edit__content--toggle">
                  <Row
                    column_gap="8px"
                    justify_content="flex-start"
                    align_items="center"
                  >
                    <Toggle v-model="allow_comments" :show-label="false" />
                    <span>Permitir comentários</span>
                  </Row>
                </div>
                <div class="dialog-area-edit__content--toggle">
                  <Row
                    column_gap="8px"
                    justify_content="flex-start"
                    align_items="center"
                  >
                    <Toggle
                      v-model="auto_approve_comments"
                      :show-label="false"
                    />
                    <span>Aprovar comentários automaticamente</span>
                  </Row>
                </div>
              </div>

              <div class="dialog-area-edit__content--layout">
                <Label text="Layout da área" />
                <Row
                  align_items="center"
                  flex_wrap="wrap"
                  row_gap="20px"
                  column_gap="46px"
                >
                  <RadioButton
                    id="carousel"
                    @toggle="toggleLayout(LayoutStyle.CAROUSEL)"
                    v-model="isCarousel"
                    label="Conteúdos em carrossel"
                  />

                  <RadioButton
                    id="rows"
                    @toggle="toggleLayout(LayoutStyle.ROWS)"
                    v-model="isRows"
                    label="Conteúdos em fileiras"
                  />
                </Row>
              </div>
            </Column>
          </Row>
        </Form>
      </div>

      <div class="dialog__footer">
        <span @click="onToggleEditAreaInfoDialog()">Cancelar</span>

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
.members-area-list {
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

.dialog-area-type {
  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &--image {
      background-color: rgba(var(--color-white-rgb), 0.03);
      border: 1px solid rgba(var(--color-primary-rgb), 0.6);
      border-radius: 20px;
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
  }

  &__content {
    padding: 48px 0;
  }
}

.dialog-area-info,
.dialog-area-edit {
  &__content {
    padding-bottom: 26px;
  }

  &__content--input {
    margin-bottom: 22px;
  }
}

.dialog-area-edit {
  &__content--comment {
    margin: 16px 0;
    display: none;
  }

  &__content--toggle {
    margin: 12px 0;
  }

  &__content--layout {
    display: none;
    .label {
      font-size: 14px;
      color: var(--color-gray);
    }
    .row {
      margin-top: 8px;
    }
  }

  &__content--upload-logo,
  &__content--upload-cover {
    width: 197px;
  }
  &__content--upload-logo {
    height: 120px;
  }

  &__content--upload-cover {
    height: 251px;
  }
}

@media (max-width: 880px) {
  .members-area-list__content--square {
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
  .members-area-list {
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
