<script setup lang="ts">
import Backdrop from '@/components/Backdrop.vue'
import Column from '@/components/Column.vue'
import Row from '@/components/Row.vue'
import Arrow from '@/components/icons/Arrow.vue'
import Chip from '@/components/Chip.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Button from '@/components/Button.vue'
import { onMounted, ref, toValue } from 'vue'
import { useProduct } from '@/composables/useProduct'
import { format } from 'date-fns'
import { StatusEnum } from '@/enums/status.enum'
import { type IProduct } from '@/store/product/interface/product.interface'
import { useRouter } from 'vue-router'

const emit = defineEmits(['productSelected'])

const { onGet, product_list, isLoading:isProductLoading } = useProduct()

const isOpened = ref(false)
const product_selected = ref<IProduct>()
const router = useRouter()

onMounted(() => onGet().then(({ data }) => {
    if(data.length){
        const [ product ] = data
        product_selected.value = product
        emit('productSelected', toValue(product_selected))
        return
    }
}))

const create_product = () => {
    router.push({ path: '/produtos', query: { new_product: 'open' } })
}

const toggle = () => {
    if(product_selected.value){
        isOpened.value = !toValue(isOpened)
        return
    }
}

const selectProduct = (product: IProduct): void => {
    product_selected.value = product
    toggle()
    emit('productSelected', toValue(product_selected))
}

</script>

<template>

    <section class="product-dropdown" v-if="!isProductLoading">
        <div class="product-dropdown__panel" @click="toggle">
            <figure class="product-dropdown__panel--image" v-if="product_selected?.media">
                <img :src="product_selected?.media.s3_url" />
            </figure>
            <figure class="product-dropdown__panel--image" v-else>
                <img src="@/assets/images/none.png" />
            </figure>

            <div class="product-dropdown__panel--infos">
                <Column gap="12px" v-if="product_selected">
                    <Row column_gap="10px" align_items="center" flex_wrap="nowrap">
                        <label>{{product_selected?.product_name}}</label>
                        <Arrow class="product-dropdown__panel--infos--arrow" />
                    </Row>
                    <Row column_gap="12px" flex_wrap="wrap">
                        <Chip :type="product_selected?.is_blocked ? StatusEnum.ERROR : StatusEnum.SUCCESS">{{ product_selected?.is_blocked ? 'Bloqueado' : 'Aprovado' }}</Chip>
                        <div class="product-dropdown__panel--infos--id-date">
                            <span v-if="product_selected?.created_at">Data criação: {{ format(product_selected.created_at, 'dd/MM/yyyy') }}</span>
                        </div>
                    </Row>
                </Column>
                <div v-else class="product-dropdown__panel--no-product">
                    <span>Você não possui nenhum produto cadastrado</span>
                    <div class="product-dropdown__panel--no-product--action">
                        <Button @click="create_product">Cadastre um produto</Button>
                    </div>
                </div>
            </div>
        </div>
        
        <Transition>
            <div class="product-dropdown__dropdown" v-if="isOpened">

                <div class="product-dropdown__dropdown--products">
                    <div class="product" v-for="(product) in product_list" @click="() => selectProduct(product)">
                        <label class="product__name">{{product.product_name}}</label>
                        <div class="product__id">
                            <span>Data criação: {{format(product.created_at ?? '', 'dd/MM/yyyy')}}</span>
                        </div>
                    </div> 
                </div>
            </div>
        </Transition>

        
        <Backdrop v-if="isOpened" @click="toggle" />
    </section>

    <GhostLoading min-height="100px" :flex="0" v-else />

</template>

<style lang="scss" scoped>
.product-dropdown {
    position: relative;
    display: inline-block;
    width: 100%;

    &__panel {
        width: 100%;
        padding: 14px;
        column-gap: 32px;
        display: grid;
        grid-template-columns: 62px;
        grid-auto-flow: column;
        border-radius: 20px;

        outline: 2px solid transparent;
        outline-offset: 2px;
        border: double 1px transparent;
        background-image: linear-gradient(white, white), 
                          linear-gradient(to right, #6D39FF, #00D0D2);
                  
        background-origin: border-box;
        background-clip: padding-box, border-box;
        transition: .3s;
        cursor: pointer;

        &--image {
            cursor: pointer;
            img {
                width: 62px;
                height: 62px;
                max-height: 62px;
                max-width: 62px;
            }
        }

        &--infos {
            cursor: pointer;
            display: flex;
            align-items: center;

            label {
                cursor: pointer;
                font-family: var(--font-family-bold);
            }

            &--id-date {
                display: flex;
                align-items: center;
                span {
                    font-size: 14px;
                }
            }

            .row {
                label {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100vw;
                    font-size: 18px;
                }
            }
        }

        &--no-product {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &--action {
                max-width: 300px;
            }
        }
    }

    &__dropdown {
        position: absolute;
        top: 100%;
        z-index: 10;
        border-radius: 20px;
        padding: 21px 17px;
        width: 100%;
        display: grid;
        gap: 27px;
        margin-top: 8px;
        max-height: 322px;
        overflow: hidden;

        border: 1px solid var(--color-primary);
        background: rgba(var(--color-primary-rgb), .6);
        

        &--products {
            display: grid;
            gap: 16px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--color-primary) transparent;
            cursor: pointer;
            max-height: 290px;
            overflow-x: hidden;
              
            .product {
                cursor: pointer;
                display: flex;
                align-items: center;
                column-gap: 20px;
                flex-wrap: wrap;
                
                &:not(:last-child){
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(var(--color-gray-rgb), .4);
                }

                &__name {
                    font-family: var(--font-family-bold);
                    font-size: 18px;
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--color-white);
                }

                &__id {
                    color: var(--color-white);
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
    }
}

@media only screen 
  and (min-width: 320px)
  and (max-width: 420px) {

    
    .product-dropdown {
        &__dropdown {
            &--products {
                .product {
                    &__name {
                        white-space: normal;
                        max-width: 100%;
                    }
                }
            }
        }
    }
}

@media only screen 
  and (max-width: 335px) {
    .product-dropdown {
        &__panel {
            &--infos {
                &--arrow {
                    display: none;
                }
            }
        }
    }
}
</style>