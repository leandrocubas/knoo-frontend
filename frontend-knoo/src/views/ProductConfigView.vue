<script setup lang="ts">
import { useProduct } from '@/composables/useProduct'
import Input from '@/components/Input.vue'
import TextArea from '@/components/TextArea.vue'
import Row from '@/components/Row.vue'
import Select from '@/components/Select.vue'
import Upload from '@/components/Upload.vue'
import Button from '@/components/Button.vue'
import Column from '@/components/Column.vue'
import { Form } from 'vee-validate'
import { onMounted, type PropType } from 'vue'
import type { IProduct } from '@/store/product/interface/product.interface'

const {
    onCreate,
    toggle_add_product,
    product_name,
    product_description,
    product_type,
    product_category,
    product_description_card_invoice,
    product_refund_deadline,
    product_support_email,
    product_support_whatsapp,
    product_image,
    canAddProduct,
    isLoading,
    product_type_list,
    product_category_list,
    product_refund_deadline_list,
    product_refund_deadline_custom,
    initForm,
    onEdit,
    imagePath,
    onGetProductTypes,
    onGetProductCategories
} = useProduct()

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: false,
    default: undefined
  },
})

const emit = defineEmits(['closed'])

onMounted(() => {

    if(props.product?.media)
        imagePath.value = props.product?.media?.s3_url ?? ''

    onGetProductTypes()
    onGetProductCategories()

    if(props.product)
        initForm(props.product)
    
})
</script>

<template>
    <div class="product-config">
        <div class="product-config__content">
                <div class="product-config__content--form-side">
                    <Column gap="44px">
                        <span style="font-size: 16px; font-weight: 500; color: #000;">{{!props.product ? 'Criar novo produto' : 'Editar produto'}}</span>
                        <Form>
                            
                            <Input
                                label="Nome do produto"
                                :max-length="50"
                                placeholder="Até 50 caracteres"
                                v-model="product_name" />
                
                                <TextArea
                                    label="Descrição"   
                                    :max-length="500"
                                    placeholder="Até 500 caracteres"
                                    v-model="product_description" />
    
                            
                                    <Select
                                        :is-loading="isLoading"
                                        v-model="product_type"
                                        :items="product_type_list" label="Tipo de produto" />
                            
                                <Select
                                    :is-loading="isLoading"
                                    v-model="product_category"
                                    :items="product_category_list" label="Categoria" />
                            

                                <Input
                                    placeholder="Até 10 caracteres"
                                    :max-length="10"
                                    :disabled="true"
                                    v-model="product_description_card_invoice"
                                    label="Descrição da fatura do cartão" />
                                <Select
                                    v-model="product_refund_deadline"
                                    :items="product_refund_deadline_list" label="Prazo para reembolso" />

                                <Input
                                    v-if="product_refund_deadline === 'CUSTOM'"
                                    label="Prazo"
                                    type="number"
                                    mask="###"
                                    :min-value="7"
                                    placeholder="Digite o prazo em dias"
                                    v-model="product_refund_deadline_custom"/>

                                <Input
                                    v-else
                                    type="email"
                                    placeholder="E-mail para suporte"
                                    v-model="product_support_email"
                                    label="E-mail para suporte" />
    
                            <Input
                                v-if="product_refund_deadline === 'CUSTOM'"
                                type="email"
                                placeholder="E-mail para suporte"
                                v-model="product_support_email"
                                label="E-mail para suporte" />

                            <Input
                                v-else
                                mask="(##) #####-####"
                                placeholder="DDD + Número"
                                v-model="product_support_whatsapp"
                                label="WhatsApp para suporte" />
                            
                            <Input
                                v-if="product_refund_deadline === 'CUSTOM'"
                                mask="(##) #####-####"
                                placeholder="DDD + Número"
                                v-model="product_support_whatsapp"
                                label="WhatsApp para suporte" />
                        </Form>
                    </Column>
                </div>
                <div class="product-config__content--image-side">
                    <Column gap="44px" style="width: 100%;">
                        <span style="font-size: 16px; font-weight: 500; color: #000;">Upload de foto do produto</span>
                        <Upload min-height="230px" description="Tamanho máximo: 5MB" @edit="imagePath = ''" :image-path="imagePath" v-model="product_image" id="product-photo" />
                    </Column>

                    <Row column_gap="12px" justify_content="flex-end">
                        <span class="product-config__footer--cancel" @click="toggle_add_product(), emit('closed')">Cancelar</span>
                        <div>
                            <Button v-if="!props.product" :is-loading="isLoading" @click="onCreate" :disabled="!canAddProduct || isLoading">Criar produto</Button>
                            <Button v-else :is-loading="isLoading" @click="onEdit(), emit('closed')" :disabled="!canAddProduct || isLoading">Editar produto</Button>
                        </div>
                    </Row>

                </div>
        </div>

        
    </div>

</template>

<style scoped lang="scss">
.product-config {
    max-width: 108em;
    background-color: var(--color-background);
    padding-bottom: 6vh;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 34px;
    padding-left: 54px;
    padding-right: 54px;
    transition: .3s;
    z-index: 1;
    overflow-y: auto;
    height: calc(100vh - 84px);
    overflow-x: hidden;
    position: fixed;

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
    
    &__content {
        display: flex;
        gap: 36px;

        &--image-side {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            width: 50%;
            gap: 40px;
        }

        &--form-side {
            width: 50%;
            form {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        padding: 30px 0;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        
        &--cancel {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 10px;
            border: 1px solid #E8E8E8;
            border-radius: 8px;
            width: 144px;
            justify-content: center;

        }

        &--confirm {
            width: 182px;
            cursor: pointer;
        }
    }
}
</style>