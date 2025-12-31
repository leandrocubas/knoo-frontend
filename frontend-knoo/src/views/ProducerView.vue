<script setup lang="ts">
import Button from '@/components/Button.vue'
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'
import CardProduct from '@/components/CardProduct.vue'
import ProductConfigView from '@/views/ProductConfigView.vue'
import Dialog from '@/components/Dialog.vue'
import { useProduct } from '@/composables/useProduct'
import { TrashIcon } from '@heroicons/vue/24/outline'
import GhostLoading from '@/components/GhostLoading.vue'
import { onMounted, ref, toValue } from 'vue'
import { useRoute } from 'vue-router'

const {
    product_list,
    isSquareMode,
    isAddOpened,
    toggle_add_product,
    isDeleting,
    onToggleConfirmDeleteDialog,
    onDelete,
    isLoading,
    _product,
    onToggleEdit,
} = useProduct()

const route = useRoute()
const new_product_ref = ref<InstanceType<typeof Button> | null>(null);

onMounted(() => {
    if(route.query.new_product) toValue(new_product_ref)?.$el.click()
})

</script>

<template>
    <div class="producer__header">
        <h3 class="producer__header__title">Lista de produtos</h3>
        <div class="producer__header__actions">
            <!-- <Squares2X2Icon @click="isSquareMode = true" class="producer__header__actions--square-mode" v-if="!isSquareMode" /> -->
            <!-- <ListBulletIcon @click="isSquareMode = false" class="producer__header__actions--list-mode" v-if="isSquareMode" /> -->
            <div class="producer__header__actions--button">
                <Button ref="new_product_ref" @click="toggle_add_product">+ Adicionar Produto</Button>
            </div>
        </div>
    </div>


    <div :class="{ 'producer__content--list': !isSquareMode, 'producer__content--square': isSquareMode }">
        
        <CardProduct
            @edit="() => onToggleEdit(product)"
            @delete="() => onToggleConfirmDeleteDialog(product.id, true)"
            v-if="product_list.length && !isLoading"
            v-for="product in product_list"
            :key="product.id"
            :is_blocked="product.is_blocked"
            :image_url="product.media?.s3_url"
            :is_active="product.is_active"
            :id="product.id ?? 0"
            :description="product.product_description" :name="product.product_name" />

            <span v-if="!product_list.length && !isLoading">Não há produtos cadastrados</span>

            <GhostLoading min-height="188px" v-if="isLoading"/>
            <GhostLoading min-height="188px" v-if="isLoading"/>

    </div>

    <ProductConfigView :product="_product" @closed="() => onToggleEdit()" v-if="isAddOpened" />
    <Dialog
        @opened="(opened: boolean) => onToggleConfirmDeleteDialog(undefined, opened)"
        :open="isDeleting">
        <div class="dialog__content--delete-icon">
            <div class="dialog__content--delete-icon--icon">
              <TrashIcon />
            </div>
        </div>

        <div class="dialog__content--title">
            <label>Tem certeza que deseja excluir o produto?</label>
            <span>Essa ação não poderá ser desfeita.</span>
        </div>

        <div class="dialog__footer">
            <span @click="onToggleConfirmDeleteDialog(undefined, false)">Voltar</span>

            <div class="dialog__footer--delete">
                <Button type="error" @click="onDelete">Excluir</Button>
            </div>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.producer {
    display: grid;
    row-gap: 26px;
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
            font-weight: 500;
        }
    
        &__actions {
            display: flex;
            column-gap: 26px;
            &--square-mode {
                width: 20px;
                cursor: pointer;
                color: rgba(var(--color-gray-rgb), .9);
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

    &__content--square {
        display: flex;
        flex-wrap: wrap;
        row-gap: 22px;
        column-gap: 28px;

        .card {
            flex: 0 0 calc(50% - 14px) !important;
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

@media (max-width: 880px) {


    .producer__content--square {
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

@media only screen and
    (max-width: 753px) {
        .producer {
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