<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline'
import Button from '@/components/Button.vue'
import CardContent from '@/components/CardContent.vue'
import Dialog from '@/components/Dialog.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import ModuleContentConfigView from './ModuleContentConfigView.vue'
import { useModule } from '@/composables/useModule'
import { usePage } from '@/composables/usePage'
import { useArea } from '@/composables/useArea'
import { useRouter } from 'vue-router';
import draggable from 'vuedraggable'

const { 
    module_selected, 
    isAddOpened,
    lessons,
    is_delete_lesson,
    isLoadingLessons,
    isLoading,
    orderedLessons,
    toggleAddContent,
    get_lessons,
    delete_lesson,
    open_delete_lesson_dialog,
    toggle_status,
    drag_end_lesson
} = useModule()

const { actual_area } = useArea()
const { setHeader } = usePage()
const router = useRouter()

watch(
  () => lessons.value,
  (newLessons) => {
    orderedLessons.value = [...newLessons]
  },
  { immediate: true }
)

onMounted(() => {
    const { title, id } = module_selected.value || {}
    const { title: areaTitle } = actual_area.value || {}
    let pageTitle = title

    if(!module_selected.value && !actual_area.value){
        router.replace('/area-de-membros')
        return
    }

    
    if (areaTitle) {
        pageTitle = `${areaTitle} - ${title}`
    }

    pageTitle && setHeader(pageTitle)

    get_lessons(id as string)
})

const go_to_lesson = (lesson_id: number): void => {
    alert('pra onde eu ireii, se eu não tenho pra onde volltaar?')
}

</script>

<template>
    <section class="members-area-module-content">
        <div class="members-area-module-content__header">
            <div class="members-area-module-content__header__actions">
                <h2 class="members-area-module-content__header__actions--title">Lista de conteúdo</h2>
                <div class="members-area-module-content__header__actions--button">
                    <Button @click="toggleAddContent">+ Adicionar Conteúdo</Button>
                </div>
            </div>
        </div>
    
        <div class="members-area-module-content__contents">
            <draggable
                v-model="orderedLessons"
                @end="drag_end_lesson"
                item-key="id"
                handle=".drag-handle"
                class="dnd-wrapper">
                <template #item="{ element: lesson }">
                    <CardContent
                        v-if="!isLoadingLessons"
                        :is-uploading="lesson.is_in_progress ?? false"
                        :key="lesson.id"
                        :percentage="lesson.percentage"
                        :image-path="lesson.media.lesson_thumb"
                        :is-active="lesson.is_active"
                        @delete="open_delete_lesson_dialog(lesson.id)"
                        @go-to-lesson="go_to_lesson(lesson.id)"
                        @toggle-status="(is_active: boolean) => toggle_status(is_active, lesson.id)"
                        :id="lesson.id ?? ''"
                        :description="lesson.description"
                        :name="lesson.lesson_name" />
                </template>
            </draggable>
            
                <div :style="{ width: '100%', display: 'flex', gap: '1rem' }">
                    <GhostLoading v-if="isLoadingLessons" />
                    <GhostLoading v-if="isLoadingLessons" />
                </div>
                <span v-if="!lessons?.length && !isLoadingLessons">Não há conteúdos cadastrados</span>
        </div>

        <ModuleContentConfigView @closed="toggleAddContent" v-if="isAddOpened" />
    
        <Dialog
            @opened="(opened: boolean) => is_delete_lesson = opened"
            :open="is_delete_lesson">
            <div class="dialog__content--delete-icon">
                <div class="dialog__content--delete-icon--icon">
                  <TrashIcon />
                </div>
            </div>
    
            <div class="dialog__content--title">
                <label>Tem certeza que deseja excluir o conteúdo?</label>
                <span>Essa ação não poderá ser desfeita.</span>
            </div>
    
            <div class="dialog__footer">
                <span @click="is_delete_lesson = !is_delete_lesson">Voltar</span>
    
                <div class="dialog__footer--button">
                    <Button :is-loading="isLoading" type="error" @click="delete_lesson">Excluir</Button>
                </div>
            </div>
        </Dialog>
    </section>
</template>

<style lang="scss" scoped>

.dnd-wrapper {
  width: 98%;
  display: grid;
  gap: 20px;
}

.members-area-module-content {
    display: grid;

    &__header {
        position: relative;

        &__title {
            font-family: var(--font-family-bold);
            font-size: 16px;
        }
    
        &__actions {
            display: flex;
            column-gap: 26px;
            justify-content: space-between;
            flex: 1;
            align-items: center;

            &--title {
                font-size: 16px;
                font-weight: 700;
            }
    
            &--active {
                color: var(--color-white) !important;
            }
    
            &--button {
                width: 211px;
            }
        }
    }

    &__contents {
        max-height: 62vh;
        overflow-y: scroll;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__background {
        background-repeat: no-repeat;
        background-position-y: top;
        background-position-x: right;
        background-size: cover;
        background-blend-mode: darken;
        opacity: 1;
        width: 40%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        filter: grayscale(1);
        z-index: -1;
    }

    &__background--layer {
        width: 100%;
        height: 100%;
        background: linear-gradient(260deg, rgba(7, 4, 5, 0.14889705882352944) 0%, rgba(7, 4, 5, 1) 91%);
    }
}

@media (max-width: 455px) {
    .module-content {
        &__background {
            width: 70%;
        }

        &__contents {
            padding-right: 0;
            max-height: 100%;
            overflow-y: auto;
            max-width: 100%;
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
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        span {
            cursor: pointer;
        }

        &--button {
            width: 182px;
        }
    }
}
</style>