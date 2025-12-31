<script setup lang="ts">
import ProductDropdown from '@/components/ProductDropdown.vue'
import Button from '@/components/Button.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import CardOffer from '@/components/CardOffer.vue'
import Column from '@/components/Column.vue'
import Row from '@/components/Row.vue'
import Dialog from '@/components/Dialog.vue'
import Alert from '@/components/Alert.vue'
import Select from '@/components/Select.vue'
import { useOffer } from '@/composables/useOffer'
import OfferConfigView from './OfferConfigView.vue'
import type { IProduct } from '@/store/product/interface/product.interface'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import RadioButton from '@/components/RadioButton.vue'


const {
    offer_list,
    is_add_opened,
    is_loading,
    is_capturing_payment_type,
    offer_payment_type_unique,
    offer_payment_type_recurrent,
    _offer,
    is_deleting,
    cleanForm,
    onToggleDelete,
    toggle_add_offer,
    onToggleConfirmDeleteDialog,
    on_toggle_edit,
    onGetOfferByProductId,
    onToggleProductTypeDialog,
} = useOffer()

const _product = ref()
const product_selected = (product: IProduct) => {
    if(product.id){
        _product.value = product
        onGetOfferByProductId(product.id)
    }
}
</script>

<template>
    <section class="offer">
        <Alert></Alert>
        <ProductDropdown @product-selected="product_selected" />

        <div class="offer__header" v-if="_product">
            <h3 class="offer__header__title" v-if=_product>Lista de ofertas</h3>
            <div class="offer__header__actions" v-if="!_product?.isBlocked">
                <div class="offer__header__actions--button">
                    <Button v-if="is_loading === false" @click="onToggleProductTypeDialog(true)">+ Adicionar Oferta</Button>
                </div>
            </div>
        </div>

        <div class="offer__list" v-if="_product">
            <CardOffer
                :product-blocked="_product?.isBlocked"
                @delete="() => onToggleConfirmDeleteDialog(offer.id, true)"
                @edit="on_toggle_edit(offer)"
                v-if="offer_list.length && !is_loading"
                :offer="offer"
                v-for="(offer) in offer_list" />

                <span v-if="!offer_list.length && is_loading === false">Não há ofertas cadastradas</span>

                <Column gap="20px">
                    <GhostLoading min-height="188px" v-if="is_loading || is_loading === null && !offer_list.length"/>
                    <GhostLoading min-height="188px" v-if="is_loading || is_loading === null && !offer_list.length"/>
                </Column>
        </div>

        <OfferConfigView
            v-if="is_add_opened"
            @clean-offer="cleanForm"
            :offer="_offer"
            :product_id="_product?.id"
            @closed="on_toggle_edit" />

        <Dialog
            @opened="(opened: boolean) => onToggleProductTypeDialog(opened)"
            :open="is_capturing_payment_type">

            <Row align_items="center" class="dialog-payment-type__content--line" justify_content="center">
                <Column gap="12px">
                    <Select v-model="offer_payment_type_unique" :items="[ { label: 'Único', value: 'unique' } ]" label="Selecione o tipo de pagamento de sua oferta" />
                    <!-- <RadioButton
                        id="unique"
                        @toggle="offer_payment_type_unique = true; offer_payment_type_recurrent = false"
                        v-model="offer_payment_type_unique"
                        label="Único" />
        
                    <RadioButton
                        :disabled="true"
                        id="recurrent"
                        @toggle="offer_payment_type_recurrent = true; offer_payment_type_unique = false"
                        v-model="offer_payment_type_recurrent"
                        label="Recorrente (em breve)" /> -->
                </Column>
            </Row>

    
            <div class="dialog-payment-type__footer">
                <span @click="onToggleProductTypeDialog(false)">Cancelar</span>
    
                <div class="dialog-payment-type__footer--next">
                    <Button :disabled="!offer_payment_type_unique" @click="toggle_add_offer">Continuar</Button>
                </div>
            </div>
        </Dialog>

        <Dialog
            mode="delete"
            @opened="(opened: boolean) => onToggleConfirmDeleteDialog(undefined, opened)"
            :open="is_deleting">
            <div class="dialog-delete__content--title">
                <label>Tem certeza que deseja excluir a oferta?</label>
                <span>Essa ação não poderá ser desfeita.</span>
            </div>

            <div class="dialog-delete__footer">
                <span @click="onToggleConfirmDeleteDialog(undefined, false)">Voltar</span>

                <div class="dialog-delete__footer--delete">
                    <Button type="error" @click="onToggleDelete">Excluir</Button>
                </div>
            </div>
        </Dialog>
    </section>
</template>

<style scoped lang="scss">
.offer {
    row-gap: 20px;
    display: flex;
    flex-direction: column;
    &__header {
        display: flex;
        justify-content: space-between;
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
                color: rgba(var(--color-gray-rgb), .9);
            }
    
            &--active {
                color: var(--color-white) !important;
            }
    
            &--list-mode {
                width: 20px;
                cursor: pointer;
                color: rgba(var(--color-gray-rgb), .9);
            }
    
            &--button {
                width: 211px;
            }
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;

        .card {
            flex: 0 0 calc(50% - 14px) !important;
            padding: 0 !important;

            svg {
                width: 35px;
                height: 35px;
            }
        }
    }
}

.dialog-payment-type {
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
              background: var(--linear-gradient-primary);

              svg {
                width: 24px;
              }
            }
        }

        &--line {
            margin-bottom: 37px;
        }

        &--title {
            flex-direction: column;
            align-items: center;
            gap: 24px;
            display: flex;
            justify-content: center;
            margin-top: 10px;

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
        justify-content: space-around;
        padding: 10px 16px;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        background: var(--color-white);
        gap: 10px;

        span {
            cursor: pointer;
            padding: 10px;
            border: 1px solid #E8E8E8;
            border-radius: 8px;
            width: calc(50% - 10px);
            text-align: center;
        }

        &--next {
            width: calc(50% - 10px);
        }
    }
}

.dialog-delete {
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
        padding: 10px 16px;
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
