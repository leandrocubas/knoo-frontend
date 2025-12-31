<script setup lang="ts">
import { ref } from 'vue'
import { EllipsisVerticalIcon, TrashIcon, ArrowUpRightIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import Duplicate from '@/components/icons/Duplicate.vue'
import Toggle from '@/components/Toggle.vue'
import Chip from '@/components/Chip.vue'
import Card from '@/components/Card.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Backdrop from '@/components/Backdrop.vue'
import { useModule } from '@/composables/useModule'
import { StatusEnum } from '@/enums/status.enum'

const {
    toggle,
    isOptionsOpened,
} = useModule()
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    imagePath: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    },
    isUploading: {
        type: Boolean,
        required: false,
        default: false
    },
    percentage: {
        type: Number,
        required: false,
        default: 0
    },
})

const isActive = ref(props.isActive)
const emit = defineEmits(['delete', 'edit', 'enter',  'toggleStatus', 'go-to-lesson'])

</script>

<template>
    <Card border="1px solid var(--color-primary)" background="#FAF9FF">
        <div class="card-content">
            <div class="drag-handle">⋮⋮</div>
            <div class="card-content__options">
                <EllipsisVerticalIcon v-if="!isUploading" @click="toggle" />

                <Transition>
                    <div class="card-content__options__content" v-if="isOptionsOpened">
                        <Column gap="16px">
                            <!-- <div class="card-content__options__content--option">
                                <Row align_items="center" column_gap="16px" @click="toggle(), emit('edit')">
                                    <Pencil color="#fff" />
                                    <span>Editar</span>
                                </Row>
                            </div> -->
                            <div class="card-content__options__content--option disabled">
                                <Row align_items="center" column_gap="16px">
                                    <Duplicate color="rgb(113, 95, 100)" />
                                    <span class="disabled">Duplicar</span>
                                </Row>
                            </div>
                            <div class="card-content__options__content--option" @click="toggle(), emit('delete')">
                                <Row align_items="center" column_gap="16px">
                                    <TrashIcon class="delete-icon" />
                                    <span class="exclude">Excluir</span>
                                </Row>
                            </div>
                        </Column>
                    </div>
                </Transition>

                <Backdrop v-if="isOptionsOpened" @click="toggle" />
            </div>
            <div class="card-content__image-area">
                <figure class="card-content__image-area--picture" v-if="props.imagePath">
                    <img :src="props.imagePath" />
                </figure>
                <figure class="card-content__image-area--picture" v-else>
                    <img src="@/assets/images/none-small.png" />
                </figure>
            </div>

            <div class="card-content__infos">
                <label class="card-content__infos--name" @click="emit('enter')">{{name}}</label>
                <p class="card-content__infos--description">{{ description }}</p>
                <Row v-if="isUploading" align_items="center" column_gap="16px">
                    <Chip :type="StatusEnum.WARNING">Upload de arquivos: {{percentage}}%</Chip>
                    <ExclamationTriangleIcon style="width: 30px; color: var(--color-warning)" />
                </Row>
                <Row align_items="center" v-else column_gap="10px">
                    <Toggle
                        @toggle="emit('toggleStatus', !!isActive)"
                        :id="id"
                        v-model="isActive" />
                        <div>
                            <Row @click="emit('go-to-lesson')" justify_content="center" style="cursor: pointer; min-width: 120px; border-radius: 20px; border: 1px solid #C4CDEC;">
    
                                <span>Acessar</span>
                                <ArrowUpRightIcon style="width: 18px" />
                            </Row>
                        </div>
                        
                </Row>
            </div>
        </div>
    </Card>
</template>

<style lang="scss" scoped>

.card-content {
    display: flex;
    column-gap: 32px;
    row-gap: 20px;
    position: relative;

    &__options {
        position: absolute;
        right: 14px;
        top: 14px;
        cursor: pointer;

        svg {
            width: 24px;
            color: var(--color-black);
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
            background: rgba(255, 255, 255, .1);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
            width: 156px;
            display: grid;
            gap: 27px;

            &--option {
                span.exclude {
                    color: var(--color-black);
                }
                &:not(:last-child){
                    padding: 0px 10px 10px 10px;
                    border-bottom: 1px solid rgba(var(--color-gray-rgb), .4);
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
        min-width: 77px;
        border-radius: 10px;
        z-index: 0;
        width: 205px;
        height: 114px;

        &--picture {
            position: absolute;
            transform: translate(-50%, -50%);
            
            img {
                object-fit: cover;
                position: fixed;
                aspect-ratio: 10/10;
                width: 205px;
                height: 114px;
            }
        }
    }

    &__infos {
        display: flex;
        flex-direction: column;
        row-gap: 8px;
        max-width: 70%;

        &--name {
            font-family: var(--font-family-bold);
            cursor: pointer;
            font-size: 18px;
        }

        &--description {
            color: var(--color-gray-100);
            font-size: 14px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.delete-icon {
    width: 19px !important;
    color: var(--color-error) !important;
}

.disabled {
    color: var(--color-gray);
    cursor: not-allowed !important;
}

.card {
    height: auto;
    flex: 0 0 100%;
    box-sizing: border-box;
    padding: 30px 0 20px;

    &:hover .card__cursor {
      display: block;
    }

    &__cursor {
      width: 100px;
      height: 100px;
      position: absolute;
      pointer-events: none;
      display: none;
      filter: blur(90px);
      background: rgba(var(--color-primary-rgb), .4);
    }
}

@media (min-width: 768px) {
    .card {
      flex: 0 0 48.7%;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .card {
      flex: 0 0 calc(50% - 10px);
    }
}

@media (min-width: 1024px) {
    .card {
      flex: 0 0 calc(25% - 16px);
    }
}

@media (max-width: 455px) {
    .card-content {
        justify-content: center;
        flex-wrap: wrap;
    }    
}
</style>