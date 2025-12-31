<script setup lang="ts">
import Card from '@/components/Card.vue'
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Chip from '@/components/Chip.vue'
import Pencil from '@/components/icons/Pencil.vue'
import Duplicate from '@/components/icons/Duplicate.vue'
import ToggleProduct from '@/components/ToggleProduct.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Backdrop from '@/components/Backdrop.vue'
import { useProduct } from '@/composables/useProduct'
import { StatusEnum } from '@/enums/status.enum'


const {
    toggle,
    isOptionsOpened,
} = useProduct()

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    image_url: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    is_active: {
        type: Number,
        required: false,
        default: 0
    },
    is_blocked: {
        type: Number,
        required: false,
        default: 0
    },
})

const emit = defineEmits(['delete', 'edit'])

</script>

<template>
    <Card>
        <div class="card-product">
            <figure class="card-product__image">
                <img v-if="props.image_url" :src="props.image_url" />
                <img v-else src="@/assets/images/none.png" />
            </figure>
            <EllipsisVerticalIcon class="menu" @click="toggle" />
            <Transition>
                <div class="card-product__options card-product__options__container" v-if="isOptionsOpened">
                    <div class="card-product__options--item" @click="toggle(), emit('edit')">
                        <Pencil style="height: 20px;"  color="var(--color-primary)" />
                        <span>Editar</span>
                    </div>
                    <div class="card-product__options--item">
                        <Duplicate class="disabled" style="height: 20px;" color="var(--color-primary)" />
                        <span class="disabled">Duplicar</span>
                    </div>
                    <div class="card-product__options--item" @click="toggle(), emit('delete')">
                        <TrashIcon style="height: 20px;color: var(--color-primary)" class="delete-icon" />
                        <span>Excluir</span>
                    </div>
                </div>
            </Transition>
            <div class="card-product__header">
                <span class="card-product__header--name">Nome</span>
                <span class="card-product__header--title">{{ props.name }}</span>
            </div>
            <div class="card-product__content">
                <Row column_gap="10px">
                    <Chip
                        :type="props.is_active ? StatusEnum.SUCCESS : StatusEnum.ERROR">{{ props.is_active ? 'Ativo' : 'Inativo' }}</Chip>
                </Row>
                {{ props.description }}
                <ToggleProduct
                    :style="{ position: 'absolute', right: '10px' }"
                    :id="id"
                    :is-blocked="is_blocked"
                    :is-active="is_active" />
            </div>
            <Backdrop :opacity="0" v-if="isOptionsOpened" @click="toggle" />
        </div>
        <!-- <div class="card-product">  
            <div class="card-product__options">
                <EllipsisVerticalIcon @click="toggle" />
                <Transition>
                    <div class="card-product__options__content" v-if="isOptionsOpened">
                        <Column gap="16px">
                            <div class="card-product__options__content--option">
                                <Row align_items="center" column_gap="16px" @click="toggle(), emit('edit')">
                                    <Pencil color="#fff" />
                                    <span>Editar</span>
                                </Row>
                            </div>
                            <div class="card-product__options__content--option disabled">
                                <Row align_items="center" column_gap="16px">
                                    <Duplicate color="rgb(113, 95, 100)" />
                                    <span class="disabled">Duplicar</span>
                                </Row>
                            </div>
                            <div class="card-product__options__content--option" @click="toggle(), emit('delete')">
                                <Row align_items="center" column_gap="16px">
                                    <TrashIcon class="delete-icon" />
                                    <span>Excluir</span>
                                </Row>
                            </div>
                        </Column>
                    </div>
                </Transition>

                <Backdrop v-if="isOptionsOpened" @click="toggle" />
            </div>
            <div class="card-product__image-area">
                <figure class="card-product__image-area--picture" v-if="props.image_url">
                    <img :src="props.image_url" />
                </figure>
                <figure class="card-product__image-area--picture" v-else>
                    <img src="@/assets/images/none.png" />
                </figure>
            </div>

            <div class="card-product__infos">
                <label class="card-product__infos--name">{{name}}</label>
                <Chip :type="is_blocked ? StatusEnum.ERROR : StatusEnum.SUCCESS" class="card-product__infos--status">{{ is_blocked ? 'Bloqueado' : 'Aprovado' }}</Chip>
                <p class="card-product__infos--description">{{ description }}</p>
                <ToggleProduct
                    :id="id"
                    :is-blocked="is_blocked"
                    :is-active="is_active" />
            </div>
        </div> -->
    </Card>
</template>

<style lang="scss" scoped>
.card-product {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    svg.menu {
        width: 24px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
    }

    &__image {
        img {
            left: 10px;
            position: absolute;
            height: 118px;
            top: 16%;
            max-width: 120px;
            object-fit: cover;
            border-radius: 8px;

        }
    }

    &__header {
        display: flex;
        flex-direction: column;
        padding-left: 140px;
        background: linear-gradient(0deg, #F0EEFD 0%, #FFF 100%);
        height: 30%;
        padding-bottom: 4px;

        &--name {
            font-size: 12px;
            color: #A8B0CB;
            font-weight: 500;
        }
        &--title {
            color: #000;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }

    &__content {
        padding-left: 140px;
        background-color: #FFF;
        display: flex;
        flex-direction: column;
        gap: 10px;

        padding-top: 10px;
    }

    &__options {
        background-color: #fff;
        height: 100%;
        width: 122px;
        &__container {
            position: absolute;
        }
        right: 24px;
        border-radius: 8px;
        z-index: 4;



        &--item {
            display: flex;
            padding: 10px;
            gap: 10px;
            align-items: center;
            cursor: pointer;

            &:not(:last-child){
                border-bottom: 1px solid rgba(var(--color-gray-rgb), .4);
                // border-bottom: 1px solid red;
            }


            span {
                color: #4B5470;
                font-size: 12px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }
            margin: 0 10px;
        }
        svg {
            width: 24px;
        }



    }
}

.disabled {
    opacity: .5;
    cursor: not-allowed !important;
}
/* .card-product {
    display: flex;
    column-gap: 32px;
    row-gap: 20px;

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
            background-color: rgb(var(--color-black-rgb-100));
            width: 156px;
            display: grid;
            gap: 27px;

            &--option {
                
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



@media (max-width: 455px) {


    .card-product {
        justify-content: center;
        flex-wrap: wrap;
    }    
}*/
</style>