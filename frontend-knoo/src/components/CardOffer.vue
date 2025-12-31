<script setup lang="ts">
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Shop from '@/components/icons/Shop.vue'
import Pencil from '@/components/icons/Pencil.vue'
import Backdrop from '@/components/Backdrop.vue'
import { TrashIcon, EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import { type PropType, computed } from 'vue'
import type { IOffer } from '@/store/offer/interface/offer.interface'
import { useUtils } from '@/composables/useUtils'
import { useOffer } from '@/composables/useOffer'

const { formatMoney } = useUtils()
const {
    is_options_opened,
    url_base_checkout,
    openCheckoutBuilder,
    toggle,
    copyLink
} = useOffer()

const props = defineProps({
  offer: {
    type: Object as PropType<IOffer>,
    required: false,
    default: null
  },
  productBlocked: {
    type: Boolean,
    required: false,
    default: false
  },
})

const emit = defineEmits(['delete', 'edit'])

const offerPriceFormatted = computed(() => formatMoney(+props.offer.price))
const offerFakePriceFormatted = computed(() => formatMoney(+props.offer.fake_price))
</script>

<template>
    <div class="card-offer">
        <Column>
            <Row column_gap="80px">
                <div class="card-offer__header">
                    <h3 class="card-offer__header--title">{{offer.offer_name}}</h3>
                    <span class="card-offer__header--description">{{offer.description}}</span>
                </div>
                <div class="card-offer__prices">
                    <div>
                        <span class="label">Valor fictício</span>
                        <span class="value label--scratched">{{offerFakePriceFormatted}}</span>
                    </div>
                    <div>
                        <span  class="label">Oferta</span>
                        <span class="value">{{offerPriceFormatted}}</span>
                    </div>
                </div>

                <div class="card-offer__actions" v-if="!productBlocked">
                    <div class="buttons" v-if="offer.active_checkout">
                        <Shop /><span @click="() => openCheckoutBuilder(offer)">Editar checkout</span>
                    </div>
                    <div class="buttons" @click="emit('edit')">
                        <Pencil /><span>Editar</span>
                    </div>
                    <div class="buttons" @click="emit('delete')">
                        <TrashIcon class="delete-icon" /><span>Excluir</span>
                    </div>
                    <div class="hamburguer">
                        <EllipsisVerticalIcon @click="toggle" />

                        <Transition>
                            <div class="hamburguer__content" v-if="is_options_opened">
                                <Column gap="16px">
                                    <div class="hamburguer__content--option">
                                        <Row align_items="center" column_gap="16px" @click="toggle(); emit('edit')">
                                            <Pencil color="#fff" />
                                            <span>Editar</span>
                                        </Row>
                                    </div>
                                    <div class="hamburguer__content--option">
                                        <Row align_items="center" column_gap="16px" @click="toggle(); emit('delete')">
                                            <TrashIcon class="delete-icon" />
                                            <span>Excluir</span>
                                        </Row>
                                    </div>
                                </Column>
                            </div>
                        </Transition>

                        <Backdrop v-if="is_options_opened" @click="toggle" />
                    </div>
                </div>
            </Row>

            <div class="card-offer__links">
                <span>Link da oferta</span>
                <div class="url" @click="() => copyLink(offer.active_checkout)">
                    <span>{{url_base_checkout}}/{{offer.active_checkout}}</span>
                    <span :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
                        Copiar
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_1950)">
                              <path d="M4.02051 6.61499C4.02051 5.08316 4.02051 4.3167 4.49663 3.84112C4.97222 3.36499 5.73867 3.36499 7.27051 3.36499H8.89551C10.4273 3.36499 11.1938 3.36499 11.6694 3.84112C12.1455 4.3167 12.1455 5.08316 12.1455 6.61499V9.32332C12.1455 10.8552 12.1455 11.6216 11.6694 12.0972C11.1938 12.5733 10.4273 12.5733 8.89551 12.5733H7.27051C5.73867 12.5733 4.97222 12.5733 4.49663 12.0972C4.02051 11.6216 4.02051 10.8552 4.02051 9.32332V6.61499Z" stroke="#2D797A"/>
                              <path d="M4.02051 10.9483C3.58953 10.9483 3.17621 10.7771 2.87146 10.4724C2.56671 10.1676 2.39551 9.7543 2.39551 9.32332V6.07332C2.39551 4.0307 2.39551 3.00912 3.03034 2.37482C3.66517 1.74053 4.68622 1.73999 6.72884 1.73999H8.89551C9.32648 1.73999 9.73981 1.9112 10.0446 2.21594C10.3493 2.52069 10.5205 2.93401 10.5205 3.36499" stroke="#2D797A"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1_1950">
                                <rect width="13" height="13" fill="white" transform="translate(0.770508 0.656738)"/>
                              </clipPath>
                            </defs>
                          </svg>
                    </span>
                </div>
            </div>
        </Column>
    </div>
    <!-- <Card>
        <div class="card-offer">
            <Row column_gap="10px" :class="{ 'border-bottom': offer.sale_completed_page_url }">
                <TagIcon class="tag" />
                
    
                <Column gap="10px">
                    <label class="card-offer__name">{{offer.offer_name}}</label>                    
                    <Column gap="20px">
                        <span class="card-offer__description">{{offer.description}}</span>

                        <Row row_gap="14px" column_gap="38px" class="card-offer__infos" flex_wrap="wrap">
                            <p class="card-offer__infos--fake-price">
                                <span class="label">Preço fictício:</span><span class="label--scratched red">{{offerFakePriceFormatted}}</span>
                            </p>

                            <p class="card-offer__infos--offer-price">
                                <span class="label">Valor da oferta: </span><span class="green">{{offerPriceFormatted}}</span>
                            </p>

                            <p class="card-offer__infos--payment-method">
                                <span class="label">Formas de pagamento:</span>
                                <Chip v-if="offer.enable_billet" :type="StatusEnum.SUCCESS">Boleto</Chip>
                                <Chip v-if="offer.enable_pix" :type="StatusEnum.SUCCESS">Pix</Chip>
                                <Chip v-if="offer.enable_card" :type="StatusEnum.SUCCESS">Cartão</Chip>
                            </p>
                        </Row>

                        <Dialog
                            @opened="() => chooseCheckoutBuilder(undefined)"
                            :open="is_checkout_choise_dialog">
                            <div class="dialog__content--delete-icon">
                                <div class="dialog__content--delete-icon--icon">
                                <Shop color="#fff" />
                                </div>
                            </div>
                            <div class="dialog__content--title">
                                <label>Selecione o checkout que deseja editar</label>
                                <div>
                                    listinha
                                </div>
                                <span>+Criar nova</span>
                            </div>
                            <div class="dialog__footer">
                                <span @click="chooseCheckoutBuilder(undefined)">Cancelar</span>

                                <div class="dialog__footer--delete">
                                    <Button @click="openCheckoutBuilder">Continuar</Button>
                                </div>
                            </div>
                        </Dialog>

                        <div class="card-offer__actions" v-if="!productBlocked">
                            <div class="buttons" v-if="offer.active_checkout">
                                <Shop /><span @click="() => openCheckoutBuilder(offer)">Editar checkout</span>
                            </div>
                            <div class="buttons" @click="emit('edit')">
                                <Pencil /><span>Editar</span>
                            </div>
                            <div class="buttons" @click="emit('delete')">
                                <TrashIcon class="delete-icon" /><span>Excluir</span>
                            </div>
                            <div class="hamburguer">
                                <EllipsisVerticalIcon @click="toggle" />

                                <Transition>
                                    <div class="hamburguer__content" v-if="is_options_opened">
                                        <Column gap="16px">
                                            <div class="hamburguer__content--option">
                                                <Row align_items="center" column_gap="16px" @click="toggle(); emit('edit')">
                                                    <Pencil color="#fff" />
                                                    <span>Editar</span>
                                                </Row>
                                            </div>
                                            <div class="hamburguer__content--option">
                                                <Row align_items="center" column_gap="16px" @click="toggle(); emit('delete')">
                                                    <TrashIcon class="delete-icon" />
                                                    <span>Excluir</span>
                                                </Row>
                                            </div>
                                        </Column>
                                    </div>
                                </Transition>

                                <Backdrop v-if="is_options_opened" @click="toggle" />
                            </div>
                        </div>
                    </Column>
                </Column>
            </Row>

            <div class="card-offer__checkout" v-if="offer.active_checkout">
                <Column>
                    <span>Link do checkout da oferta</span>

                    <div class="card-offer__checkout--row">
                        <span class="card-offer__checkout__link">{{url_base_checkout}}/{{offer.active_checkout}}</span>
                        <Row justify_content="flex-end" column_gap="10px" @click="() => copyLink(offer.active_checkout)">
                            <Copy color="var(--color-primary)" class="card-offer__checkout__copy--icon" />
                            <span class="card-offer__checkout__copy">Copiar link</span>
                        </Row>

                    </div>
                </Column>
            </div>
        </div>

    </Card> -->
</template>

<style lang="scss" scoped>

.card-offer {
    position: relative;
    border-radius: 8px;
    border: 1px solid #B59AFF;
    background: #FAF9FF;
    padding: 20px;
    max-height: 148px;

    &__header {
        font-family: var(--font-family-bold);
        font-size: 18px;
        max-width: 62%;
        display: column;

        &--title {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            color: var(--color-black);
        }

        &--description {
            font-size: 14px;
            color: var(--color-black);
            font-style: normal;
            line-height: normal;
        }
    }

    &__prices {
        display: flex;
        gap: 20px;
        
        > div {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .label {
                color: #A8B0CB;
                font-size: 12px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }

            .value {
                color: #000;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }
  
        }
    }

    &__links {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        
        
        .url {
            color: #2D797A;
            padding-left: 14px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 14px;
            cursor: pointer;
        }

        > div {
            border-radius: 250px;
            border: 1px solid #04CA68;
            background: #DBFAE6;
            height: 28px;
        }
    }



    &__actions {
        padding: 20px 20px;
        width: 50%;
        display: flex;
        align-items: center;
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 0;
        column-gap: 30px;
        color: var(--color-black);
        justify-content: flex-end;

        > div.hamburguer {
            display: none;
        }

        > div.buttons {
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: flex-end;
            cursor: pointer;
            span {
                white-space: nowrap;
                cursor: pointer;
                display: flex;
                align-items: center;
            }

            a {
                display: flex;
                gap: 6px;
            }
        }

        .delete-icon {
            width: 19px;
            color: var(--color-error);
        }
    }

    &__infos {
        &--payment-method {
            display: flex;
            column-gap: 8px;
            align-items: center;
            @extend .label;
        }

        &--fake-price {
            font-size: 14px;
            display: flex;
            column-gap: 4px;
            @extend .label;
        }

        &--offer-price {
            font-size: 14px;
            display: flex;
            column-gap: 4px;
            @extend .label;
        }
    }

    &__checkout {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(var(--color-primary-rgb), .6);
        max-width: 80%;
        margin-top: 28px;

        &--row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
        }
        
        &__link {
            font-size: 14px;
            display: flex;
            white-space: nowrap;
            color: var(--color-primary);
        }
        
        &__copy {
            color: var(--color-primary);
            font-size: 14px;
            cursor: pointer;
            white-space: nowrap;
            
            &--icon {
                cursor: pointer;

            }
        }
    }
}


@media screen
    and (max-width: 466px) {
        .card-offer {
            &__infos {
                &--payment-method {
                    flex-wrap: wrap;
                }
            }

            &__checkout {

                &__link {
                    font-size: 12px;
                }
            }
        }
    }

@media screen
    and (max-width: 576px) {
        .card-offer {
            &__checkout {
                &--row {
                    flex-wrap: wrap-reverse;
                }
            }
        }
    }

@media screen
    and (max-width: 408px) {
        .card-offer {
            &__checkout {
                &__link {
                    white-space: normal;
                    font-size: 14px;
                }
            }
        }
    }
    
@media screen
    and (max-width: 711px) {
        .card-offer {
            &__checkout {
                max-width: 100%;
            }
        }
    }

@media screen
    and (max-width: 497px) {
        .card-offer {
            &__checkout {
                &--row {
                    flex-wrap: wrap-reverse;
                }
            }
        }
    }

@media screen
    and (max-width: 828px){
    .card-offer__actions {
        div.buttons {
            display: none;
        }

        div.hamburguer {
            display: flex;
            position: absolute;
            cursor: pointer;
            right: 0;
            top: 0;
            
            svg {
                width: 24px;
                z-index: 1;
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

@media only screen 
  and (max-width: 335px) {
    
}

.border-bottom {
    border-bottom: 1px solid rgba(var(--color-gray-rgb), .3);
    padding-bottom: 20px;
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
              background: linear-gradient(97deg, var(--color-pink) 13.57%, var(--color-primary) 89.34%);

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
                text-align: center;
                color: var(--color-white);
                font-family: var(--font-family-bold);
                font-size: 14px;
                text-decoration: underline;
                cursor: pointer;
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
        padding-top: 10px;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        span {
            cursor: pointer;
        }

        &--delete {
            width: 182px;
        }
    }
}

</style>