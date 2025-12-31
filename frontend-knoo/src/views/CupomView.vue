<script setup lang="ts">
import Button from '@/components/Button.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import CardCupom from '@/components/CardCupom.vue'
import Column from '@/components/Column.vue'
import Row from '@/components/Row.vue'
import Toggle from '@/components/Toggle.vue'
import Dialog from '@/components/Dialog.vue'
import Alert from '@/components/Alert.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import { computed, onMounted } from 'vue'
import { useCupom } from '@/composables/useCupom'
import { Size } from '@/enums/size.enum'
import { useProduct } from '@/composables/useProduct'

const {
    is_loading,
    cupom_list,
    cupom,
    manage_cupom,
    list_offers,
    is_editing_cupom,
    is_deleting,
    onGetCupom,
    onToggleCupomDialog,
    onManageCupom,
    onChangeProduct,
    onDeleteCupom,
    onToggleConfirmDeleteDialog
} = useCupom()

const { onGet: onGetProducts, product_list } = useProduct()

const product_list_mapped = computed(() => {
    return product_list.value.map((product) => ({
        label: product.product_name,
        value: product.id
    }))
})

const list_offers_mapped = computed(() => {
    return list_offers.value.map((offer) => ({
        label: offer.offer_name,
        value: offer.id
    }))
})


onMounted(async() => {
    await Promise.all([
        onGetCupom(),
        onGetProducts()
    ])
})

</script>

<template>
    <section class="cupom">
        <Alert></Alert>


        <div class="cupom__header">
            <h3 class="cupom__header__title">Lista de cupons</h3>
            <div class="cupom__header__actions">
                <div class="cupom__header__actions--button">
                    <Button v-if="is_loading === false" @click="onToggleCupomDialog(true)">+ Adicionar Cupom</Button>
                </div>
            </div>
        </div>

        <div class="cupom__list" >
            
            <CardCupom
                v-for="(cupom) in cupom_list"
                v-if="!is_loading"
                @edit="onToggleCupomDialog(true, cupom)"
                @delete="onToggleConfirmDeleteDialog(true, cupom.id)"
                :name="cupom?.code"
                :description="cupom?.description"
                :id="cupom?.id?.toString() || ''" />

                <span v-if="!cupom_list?.length && is_loading === false">Não há cupons cadastrados</span>

                <Column gap="20px">
                    <GhostLoading min-height="188px" v-if="is_loading || is_loading === null && !cupom_list?.length"/>
                    <GhostLoading min-height="188px" v-if="is_loading || is_loading === null && !cupom_list?.length"/>
                </Column>
        </div>

        <Dialog
            :open="manage_cupom"
            @opened="(opened: boolean) => onToggleCupomDialog(opened)"
            :title="is_editing_cupom ? 'Editar cupom' : 'Adicionar cupom'"
            :size="Size.DEFAULT"
            :border="true"
        >
            <div class="dialog-payment-type__content">
                <Row column_gap="12px" align_items="center" class="dialog-payment-type__content--line" justify_content="center">
                    <Column gap="12px" class="dialog-payment-type__content--line--input">
                        <Input :disabled="is_editing_cupom" v-model="cupom.code" :maxLength="20" label="Código" />
                        <Input v-model="cupom.max_uses" type="number" :max="1000000" :min="0" label="Qtd. de cupons" />
                        <Input v-model="cupom.description" label="Descrição" :maxLength="100" />
                        <Select @changed="onChangeProduct" v-model="cupom.product_id" name="products" :items="product_list_mapped" label="Produtos" />
                    </Column>
                    <Column gap="12px" class="dialog-payment-type__content--line--input">
                        <Input v-model="cupom.percentage" type="number" :max="100" :min="0" label="Porcentagem" />
                        <Input v-model="cupom.expires_at" type="date" label="Data de expiração" />
                        
                        <Column gap="10px">
                            <span>Aplicar aos order bumps</span>
                            <Toggle
                                :label="`${cupom.applies_to_order_bumps ? 'Sim' : 'Não'}`"
                                v-model="cupom.applies_to_order_bumps"/>

                        </Column>
                        <Select v-model="cupom.product_offering_id" :disabled="!cupom.product_id" name="offers" :items="list_offers_mapped" label="Ofertas" />
                    </Column>
                </Row>
                <div class="dialog-payment-type__footer">
                    <span @click="onToggleCupomDialog(false)">Cancelar</span>
        
                    <div class="dialog-payment-type__footer--next">
                        <Button @click="onManageCupom">{{ is_editing_cupom ? 'Editar' : 'Adicionar' }}</Button>
                    </div>
                </div>
       
            </div>
        </Dialog>

        <Dialog
            mode="delete"
            @opened="(opened: boolean) => onToggleConfirmDeleteDialog(opened)"
            :open="is_deleting">
            <div class="dialog-delete__content--title">
                <label>Tem certeza que deseja excluir o cupom?</label>
                <span>Essa ação não poderá ser desfeita.</span>
            </div>

            <div class="dialog-delete__footer">
                <span @click="onToggleConfirmDeleteDialog(false)">Voltar</span>

                <div class="dialog-delete__footer--delete">
                    <Button type="error" @click="onDeleteCupom">Excluir</Button>
                </div>
            </div>
        </Dialog>
    </section>
</template>

<style scoped lang="scss">
.cupom {
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
            max-height: 150px;
        }

        // .card {
        //     flex: 0 0 calc(50% - 14px) !important;
        //     padding: 0 !important;

        //     svg {
        //         width: 35px;
        //         height: 35px;
        //     }
        // }
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
