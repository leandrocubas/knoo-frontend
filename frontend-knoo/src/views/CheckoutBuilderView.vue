<script setup lang="ts">
import Button from '@/components/Button.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Column from '@/components/Column.vue'
import Toggle from '@/components/Toggle.vue'
import Input from '@/components/Input.vue'
import Row from '@/components/Row.vue'
import CheckoutIcons from '@/components/icons/CheckoutIcons.vue'
import Timer from '@/components/Timer.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import Card from '@/components/Card.vue'
import Select from '@/components/Select.vue'
import Dialog from '@/components/Dialog.vue'
import Badge from '@/components/Badge.vue'
import { PhotoIcon, ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import Close from '@/components/icons/Close.vue'
import { useCheckout } from '@/composables/useCheckout'
import { onMounted } from 'vue'
import { CheckoutComponentsEnum } from '@/enums/checkout-components.enum'
import { useUtils } from '@/composables/useUtils'
import { TrashIcon } from '@heroicons/vue/24/outline'
import PreviewCheckout from './PreviewCheckout.vue'
import PictureCropper from 'vue-picture-cropper'
import router from '@/router'


const {
    list_components,
    onTimeFinished,
    isComponentConfigOpened,
    product_list_select,
    isLoadingProduct,
    product_model,
    offer_model,
    offer_list_select,
    timer,
    openOrderBumpDialog,
    order_bumps,
    checkout_response,
    checkout,
    componentConfigOpened,
    is_loading,
    imageData,
    imageStyle,
    is_preview_mode,
    bannerContainerStyle,
    pic,
    cropOpen,
    is_banner_loading,
    onEdit,
    toggleDialogOrderBump,
    bannerChanged,
    openComponentConfig,
    onChangeProduct,
    addOrderBump,
    deleteOrderBump,
    togglePreviewMode,
    removeImageBanner,
    cropImage,
    cropReady
} = useCheckout(onMounted)

const { formatMoney } = useUtils()

const onClose = () => router.replace('/')


</script>


<template>
    <section class="checkout">
        <div class="checkout__header">
            <ArrowLongLeftIcon @click="onClose" class="back" v-if="checkout_response?.checkout_infos" />
            <h1 class="checkout__header--title" v-if="checkout_response?.checkout_infos">Editar
                {{ checkout_response.checkout_infos.checkout_title }}</h1>
            <GhostLoading :width="26" :height="30" v-else />
            <div class="checkout__header--buttons">
                <Transition>
                    <span class="checkout__header--buttons--preview" @click="togglePreviewMode" v-if="!is_loading">Pré
                        visualizar</span>
                </Transition>
                <div class="checkout__header--buttons--save">
                    <Button :is-loading="is_loading" @click="onEdit">Salvar</Button>
                </div>
            </div>
        </div>
        <div class="checkout__content">
            <div class="checkout__content--preview" :style="{ backgroundColor: checkout?.configs?.background_color }">
                <Transition>
                    <div v-if="checkout?.timer?.display" class="checkout__content__timer"
                        :style="{ 'background-color': checkout?.timer?.timer_bg_color }">
                        <Timer :color="checkout.timer.timer_title_color" :end-message="checkout?.timer?.end_timer_title" @on-time-finished="onTimeFinished = $event"
                            :timer="timer" />
    
                        <CheckoutIcons :color="checkout?.timer?.timer_icon_color" icon="timer" />
                        <span
                            :style="{ color: checkout?.timer?.timer_title_color || 'white' }">{{ checkout?.timer?.timer_title
                                || 'Finalize sua compra'}}</span>
                    </div>
                </Transition>
                <Transition>
                    <div class="checkout__content__progress-bar" v-if="checkout?.timer?.display">
                        <ProgressBar :background-color="checkout?.timer?.timer_progressbar_bg_color"
                            :bar-color="checkout?.timer?.timer_progressbar_color" :milliseconds="timer" />
                    </div>
                </Transition>
                <div style="grid-area: content-header; display: flex; justify-content: center;">
                    <label for="banner" class="checkout__content__banner"
                        v-if="checkout?.banner?.display && !is_banner_loading" :style="bannerContainerStyle">
                        <input accept="image/png, image/jpeg" @input="bannerChanged" id="banner" type="file"
                            :hidden="true" />
                        <label for="banner" v-if="!imageData" class="checkout__content__banner--select-image">
                            <PhotoIcon />
                            <label for="banner">Selecione a imagem do cabeçalho </label>
                        </label>
                        <div v-else class="checkout__content__banner--banner-image">
                            <Close @click="removeImageBanner" />
                            <Transition>
                                <div class="checkout__content__banner--banner-image--loading" v-if="is_banner_loading">
                                    Subindo imagem...
                                </div>
                            </Transition>
                            <img :src="imageData" :style="imageStyle" class="animate__animated animate__pulse">
                        </div>
                    </label>
    
                    <div v-if="is_banner_loading" class="checkout__content__banner--image-loading">
                        <span class="animate__animated animate__pulse animate__infinite">Carregando imagem...</span>
                    </div>
                </div>
                <Transition>
                    <div class="checkout__content__static">
                        <Column gap="36px">
                            <Column gap="50px">
                                <Column gap="16px">
                                    <GhostLoading :height="18" :animate="false" />
                                    <GhostLoading :width="50" :height="18" :animate="false" />
                                    <GhostLoading :width="80" :height="18" :animate="false" />
                                </Column>
    
    
                                <Row column_gap="14px">
                                    <div class="checkout__content__static--square"></div>
                                    <div class="checkout__content__static--square"></div>
                                    <div class="checkout__content__static--square"></div>
                                    <div class="checkout__content__static--square"></div>
                                    <div class="checkout__content__static--square"></div>
                                </Row>
                            </Column>
    
                            <Button />
                        </Column>
                    </div>
                </Transition>
            </div>
        </div>

        <section class="checkout__components" id="components">
            <div class="checkout__components__cursor" id="cursor"></div>
            <div class="checkout__components__component">
                <div v-for="component in list_components" :key="component.name"
                    @click="() => openComponentConfig(component)" class="checkout__components__component--option">
                    <CheckoutIcons :icon="component.icon" v-if="!is_loading" />
                    <label v-if="!is_loading">{{ component.name }}</label>
                    <Badge
                        v-if="component.id === CheckoutComponentsEnum.ORDER_BUMP && order_bumps.length && !is_loading">
                        {{ order_bumps.length }}
                    </Badge>
                    <GhostLoading :height="50" v-if="is_loading" />
                </div>
            </div>
            <Transition name="slide">
                <section class="checkout__components__component__config"
                    :style="{ 'overflow-y': componentConfigOpened?.id === CheckoutComponentsEnum.TIMER ? 'auto' : 'hidden' }"
                    v-if="isComponentConfigOpened">
                    <div class="checkout__components__component__config__header">
                        <ArrowLongLeftIcon class="back" @click="() => openComponentConfig()" />

                        <label class="title">{{ componentConfigOpened?.name }}</label>
                    </div>

                    <div class="checkout__components__component__config__content">
                        <Column gap="20px">
                            <Column gap="20px"
                                v-if="componentConfigOpened?.id === CheckoutComponentsEnum.ORDER_BUMP && componentConfigOpened">
                                <Input v-model="checkout.checkout_infos.order_bump_title"
                                    label="Editar texto do cabeçalho" />


                                <Column v-if="isLoadingProduct" gap="10px">
                                    <GhostLoading :height="26" />
                                    <GhostLoading :height="26" />
                                    <GhostLoading :height="26" />
                                </Column>

                                <div v-else class="checkout__order-bumps">
                                    <div class="checkout__order-bumps--list">
                                        <Card v-if="order_bumps.length" :style="{ opacity: order_bump.is_deleting ? .2 : 1 }" :need-min-height="false" v-for="(order_bump, index) in order_bumps"
                                            :key="index">
                                            <Row column_gap="10px">
                                                <figure class="checkout__order-bumps--list--image">
                                                    <img :src="order_bump?.s3_url" />
                                                </figure>
                                                <Column>
                                                    <span
                                                        class="checkout__order-bumps--list--title">{{ order_bump.offer_name }}</span>
                                                    <Row justify_content="space-between" flex_wrap="wrap">
                                                        <span class="checkout__order-bumps--list--fake-price">{{
                                                            formatMoney(order_bump.fake_price) }}</span>
                                                        <span class="checkout__order-bumps--list--price">{{
                                                            formatMoney(order_bump.price) }}</span>
                                                    </Row>
                                                </Column>
                                            </Row>
                                            <TrashIcon @click="() => deleteOrderBump(order_bump)"
                                                class="checkout__order-bumps--list--delete" />
                                        </Card>
                                        <div v-else>
                                            Não há order bumps cadastrados.
                                        </div>
                                    </div>
                                    <div class="checkout__order-bumps--footer">
                                        <Column gap="10px">


                                            <Button type="secondary" @click="toggleDialogOrderBump">
                                                + Adicionar order bump
                                            </Button>
                                            <Button @click="() => openComponentConfig()">
                                                Aplicar e voltar
                                            </Button>
                                        </Column>
                                    </div>
                                </div>

                            </Column>

                            <Column gap="20px"
                                v-if="componentConfigOpened?.id === CheckoutComponentsEnum.TIMER && componentConfigOpened">
                                <Row justify_content="space-between" align_items="center">
                                    <span>Mostrar</span>
                                    <Toggle v-model="checkout.timer.display" :show-label="false" />
                                </Row>
                                <Row justify_content="space-between" align_items="center">
                                    <span>Fixo</span>
                                    <Toggle v-model="checkout.timer.is_fixed" :show-label="false" />
                                </Row>
                                <Input v-model="checkout.timer.timer_title" label="Mensagem" :max-length="20"
                                    placeholder="Finalize sua compra" />
                                <Input v-model="checkout.timer.end_timer_title" label="Mensagem final" :max-length="20"
                                    placeholder="Finalize sua compra!" />
                                <Input v-model="checkout.timer.countdown" mask="##:##:##" label="Tempo"
                                    placeholder="00:10:00" />
                                <Input v-model="checkout.timer.timer_title_color"
                                    label="Cor do texto" type="color" />
                                <Input v-model="checkout.timer.timer_progressbar_bg_color"
                                    label="Cor de fundo da barra" type="color" />
                                <Input v-model="checkout.timer.timer_icon_color" label="Cor do ícone" type="color" />
                                
                                <Input v-model="checkout.timer.timer_progressbar_color" label="Cor da barra"
                                    type="color" />
                                <Input v-model="checkout.timer.timer_bg_color" label="Cor de fundo"
                                    type="color" />
                            </Column>

                            <Column
                                v-if="componentConfigOpened?.id === CheckoutComponentsEnum.BANNER && componentConfigOpened">
                                <Row justify_content="space-between" align_items="center">
                                    <span>Mostrar</span>
                                    <Toggle v-model="checkout.banner.display" :show-label="false" />
                                </Row>
                            </Column>

                            <Column v-if="componentConfigOpened?.id === CheckoutComponentsEnum.CONFIG">
                                <Input v-model="checkout.configs.background_color" label="Cor de fundo do checkout"
                                    type="color" />
                            </Column>

                        </Column>
                    </div>
                </section>
            </Transition>
        </section>

        <Dialog title="Recorte a imagem" @opened="cropOpen = !cropOpen" :open="cropOpen">
            <PictureCropper @ready="cropReady" :boxStyle="{
                width: '100%',
                height: '100%',
                margin: 'auto',
                color: 'red'
            }" :img="pic" :presetMode="{
                    mode: 'fixedSize'
                }" :options="{
                    viewMode: 1,
                    dragMode: 'crop',
                    aspectRatio: 21 / 9,
                }" />

            <Button @click="cropImage">Recortar</Button>
        </Dialog>

        <Dialog title="Adicionar Order Bump" @opened="openOrderBumpDialog = !openOrderBumpDialog"
            :open="openOrderBumpDialog">

            <div class="dialog__content">
                <Select
                    v-model="product_model"
                    label="Selecionar produto"
                    :is-loading="isLoadingProduct"
                    @changed="onChangeProduct"
                    :items="product_list_select"/>

                <Select
                    v-model="offer_model"
                    label="Selecionar oferta"
                    :disabled="!product_model"
                    :items="offer_list_select"/>
            </div>

            <div class="dialog__footer">
                <span @click="openOrderBumpDialog = !openOrderBumpDialog">Voltar</span>

                <div class="dialog__footer--add">
                    <Button @click="addOrderBump" :disabled="!product_model || !offer_model">Adicionar</Button>
                </div>
            </div>
        </Dialog>

    </section>

    <PreviewCheckout :checkout="checkout" v-if="is_preview_mode" />
</template>

<style lang="scss" scoped>
@import url('@/assets/keyframes/pulse.scss');
@import url('@/assets/slide-right-to-left.scss');

.checkout {
    width: 100vw;
    height: 100vh;
    display: grid;
    padding: 10px 40px;
    gap: 30px 20px;
    grid-template-rows: 66px auto auto;

    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) transparent;
    grid-template-areas:
        'header header header'
        'content content components'
        'content content components';
    
    &__header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(var(--color-gray-rgb), .4);
        height: 80px;

        svg.back {
            cursor: pointer;
            height: 22px;
        }

        &--title {
            font-family: var(--font-family-bold);
            width: 60%;
        }

        &--buttons {
            width: 40%;
            display: flex;
            align-items: center;
            column-gap: 34px;
            z-index: 2;
            justify-content: flex-end;

            &--save {
                width: 50%;
            }

            &--preview {
                cursor: pointer;
                text-align: right;
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    &__content {
        grid-area: content;
        display: grid;
        column-gap: 20px;
        row-gap: 14px;
        height: fit-content;
        justify-content: flex-end;
        grid-template-rows: auto;
        grid-template-areas:
            'content-timer content-timer dragg-components'
            'content-progress-bar content-progress-bar dragg-components'
            'content-header content-header dragg-components'
            'static static dragg-components'
            'static static dragg-components';

        &--preview {
            padding: 20px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            justify-content: center;
            max-width: 650px;
        }

        &__timer {
            grid-area: content-timer;
            border-radius: 10px;
            border: 1px dashed var(--color-primary);
            background: rgba(255, 255, 255, .10);
            width: 100%;
            height: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 10px;

            svg {
                width: 33.33%;
            }

            span {
                font-size: 16px;
                font-family: var(--font-family-bold);
                width: 33.33%;
                text-align: left;
            }
        }

        &__banner {
            display: flex;
            justify-content: center;
            position: relative;
            align-items: center;
            min-height: 168px;
            border-radius: 10px;
            border: 1px dashed var(--color-primary);
            cursor: pointer;

            &--select-image {
                min-height: 168px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                flex-direction: column;
                gap: 10px;
                cursor: pointer;

                * {
                    cursor: pointer;

                }
            }

            &--image-loading {
                width: 100%;
                position: relative;
                cursor: not-allowed;
                border-radius: 10px;
                min-height: 168px;
                background-color: var(--color-background);
                border: 1px dashed var(--color-primary);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &--banner-image {
                svg {
                    cursor: pointer;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 2;
                    background: var(--color-primary);
                    border-radius: 16px;
                }

                img {
                    width: 100%;
                }

                &--loading {
                    height: 100%;
                    position: absolute;
                    background: black;
                    border-radius: 10px;
                    width: 100%;
                    opacity: .8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--font-family-bold);
                }
            }

            svg {
                width: 24px;
            }
        }

        &__progress-bar {
            grid-area: content-progress-bar;
        }

        &__dragg-components {
            grid-area: dragg-components;
            width: 164px;
            height: 545px;
            border-radius: 10px;
            border: 1px dashed var(--color-primary);
            background: rgba(255, 255, 255, 0.10);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        &__static {
            padding: 30px 36px;
            grid-area: static;
            height: 388px;
            border-radius: 10px;
            background: #E5E2E3;

            &--square {
                background: #A69FA2;
                width: 92px;
                height: 88px;
                border-radius: 6px;
            }
        }
    }

    &__components {
        grid-area: components;
        width: 253px;
        height: 610px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.10);
        background: rgba(var(--color-primary-rgb), .2);
        z-index: 1;
        position: sticky;
        top: 0;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;

        &:hover .checkout__components__cursor {
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

        &__component {
            border: none;
            cursor: pointer;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            padding: 26px 16px;

            &__config {
                height: 100%;
                top: 0;
                position: absolute;
                width: 100%;
                background: rgba(255, 255, 255, .1);
                border-radius: 16px;
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                box-shadow: 0 4px 10px rgba(0, 0, 0, .2);

                height: 100%;
                padding: 26px 16px;
                display: grid;
                gap: 20px;
                grid-template-rows: 6% 74%;
                grid-template-areas:
                    'config-header config-header'
                    'config-content config-content'
                    'config-content config-content'
                    'config-footer config-footer';
                overflow: hidden;
                scrollbar-width: thin;
                scrollbar-color: var(--color-primary) transparent;

                &__header {
                    grid-area: config-header;
                    display: flex;
                    gap: 6px;
                    align-items: center;

                    svg.back {
                        cursor: pointer;
                        height: 22px;
                    }

                    label.title {
                        font-family: var(--font-family-bold);
                    }
                }

                &__content {
                    grid-area: config-content;
                }

                &__footer {
                    grid-area: config-footer;
                }
            }

            &--option {
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 6px;
                background: white;
                justify-content: center;
                flex: 0 0 calc(50% - 6px);
                padding: 8px 0;
                position: relative;

                &:hover {
                    opacity: .8;
                    cursor: pointer;
                    transition: .2s;
                }

                label {
                    font-size: 14px;
                }
            }
        }

    }

    &__order-bumps {

        &--list {
            max-height: 14rem;
            display: grid;
            gap: 16px;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 20px;

            &--delete {
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 2;
                background: var(--color-primary);
                border-radius: 0px .75rem 0px .75rem;
                height: 22px;
                width: 22px;
                padding: 4px;
            }


            &--title {
                font-size: 10px;
                font-family: var(--font-family-bold);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 15ch;
            }

            &--fake-price {
                text-decoration: line-through;
                font-family: var(--font-family-bold);
                color: var(--color-error);
                font-size: 10px;
                width: 100%;
            }

            &--image {
                display: flex;
                align-items: center;

                >img {
                    width: 45px;
                    height: 45px;
                    max-height: 45px;
                    max-width: 45px;

                }
            }

            &--price {
                font-family: var(--font-family-bold);
                color: var(--color-success);
                font-size: 10px;
                width: 100%;
            }

            scrollbar-width: thin;
            scrollbar-color: var(--color-primary) transparent;
            padding: 6px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-track {
                background: var(--color-transparent);
            }

            &::-webkit-scrollbar-thumb {
                background: var(--color-primary);
                border-radius: 20px;
            }
        }

        &--footer {
            height: 20vh;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

    }
}

.dialog {
    &__content {
        display: grid;
        row-gap: 20px;

    }

    &__footer {
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 10px;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);

        span {
            cursor: pointer;
        }

        &--add {
            width: 182px;
        }
    }
}


.v-enter-active,
.v-leave-active {
    transition: opacity .2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>