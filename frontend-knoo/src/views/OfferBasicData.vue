<script setup lang="ts">
import { Form } from 'vee-validate'
import Input from '@/components/Input.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Checkbox from '@/components/Checkbox.vue'
import RadioButton from '@/components/RadioButton.vue'
import { useOffer } from '@/composables/useOffer'
import { ref, type PropType, onMounted, toValue, computed } from 'vue'
import { Offer, type IOffer } from '@/store/offer/interface/offer.interface'
import { SaleCompletedPageType } from '@/enums/offer.enum'

const {
    offer_name,
    offer_description,
    offer_fake_price,
    offer_price,
    offer_thanks_page_custom,
    offer_enable_pix,
    offer_enable_card,
    offer_enable_billet,
    offer_id,
    initForm,
    actual_offer
} = useOffer()

const offer = ref(new Offer())
const emit = defineEmits(['update:modelValue', 'createOffer'])
const errorText = computed(() => {
    return +offer_fake_price.value < +offer_price.value ? 'Valor da oferta precisa ser menor que o valor fictício' : ''
})
const props = defineProps({
    modelValue: Object as PropType<IOffer>,
    offer: {
        type: Object as PropType<IOffer>,
        required: false
    }
})

onMounted(() => {
        if(!props.offer && !actual_offer.value){
            offer_price.value = 9
            offer_fake_price.value = 9.01
        }
        
        initForm(props.offer ? props.offer : actual_offer.value ? actual_offer.value : null)
        
        isDefault.value =
            props.offer ? props.offer.page_type === SaleCompletedPageType.Knoo || props.offer.page_type === undefined
            : actual_offer.value ?
                actual_offer.value?.page_type === SaleCompletedPageType.Knoo
                : true
        isCustom.value = props.offer ? props.offer.page_type === SaleCompletedPageType.Personalized : actual_offer.value ? actual_offer.value?.page_type === SaleCompletedPageType.Personalized : false
        offer_id.value = props.offer ? props.offer.id : actual_offer.value ? actual_offer.value?.id : null

        emitValue('page_type', isDefault.value ? SaleCompletedPageType.Knoo : SaleCompletedPageType.Personalized)
        if(isCustom.value){
            offer_thanks_page_custom.value = props.offer ? props.offer.sale_completed_page_url : actual_offer.value?.sale_completed_page_url
        }
    
})


const emitValue = (key: string, value: any): void => {
    (offer as any).value[key] = value
    offer.value.enable_billet = offer_enable_billet.value
    offer.value.enable_card = offer_enable_card.value
    offer.value.enable_pix = offer_enable_pix.value

    emit('update:modelValue', toValue(offer))
}

const toggleDefaultPage = () => {
    isDefault.value = !isDefault.value
    isCustom.value = false
    emitValue('page_type', isDefault.value ? SaleCompletedPageType.Knoo : SaleCompletedPageType.Personalized)
}

const toggleCustomPage = () => {
    isCustom.value = !isCustom.value
    isDefault.value = false
    emitValue('page_type', isCustom.value ? SaleCompletedPageType.Personalized : SaleCompletedPageType.Knoo)
}

const isDefault = ref(true)
const isCustom = ref(false)
</script>

<template>
    
    <div class="offer-basic-data">
        <span style="font-size: 16px; color: #000; font-weight: 500;">Descrição da oferta</span>
        <Column gap="50px">
            <Form>             
                <Input
                    @update:model-value="() => emitValue('offer_name', offer_name)"
                    label="Nome da oferta"
                    :max="50"
                    placeholder="Até 50 caracteres"
                    v-model="offer_name" />

                <Input
                    @update:model-value="() => emitValue('description', offer_description)"
                    label="Descrição"
                    :max="500"
                    placeholder="Até 500 caracteres"
                    v-model="offer_description" />

                <Row column_gap="26px" row_gap="40px" flex_wrap="wrap">
                    <div class="offer-basic-data--fake-price">
                        <Input
                            @update:model-value="() => emitValue('fake_price', offer_fake_price)"
                            type="money"
                            :min-value="9.01"
                            label="Preço fictício"
                            v-model="offer_fake_price" />
                    </div>
                    <div class="offer-basic-data--price">
                        <Input
                            @update:model-value="() => emitValue('price', offer_price)"
                            type="money"
                            :min-value="9"
                            :error-text="errorText"
                            label="Valor da oferta"
                            v-model="offer_price" />
                    </div>
                </Row>
            </Form>
            
            <div class="offer-basic-data__options">
                <Column gap="26px">
                    <span>Formas de pagamento</span>
                    <Row column_gap="26px">
                        <Checkbox
                            v-model="offer_enable_pix"
                            text="Pix" id="pix"/>
                        <Checkbox
                            v-model="offer_enable_card"
                            text="Cartão" id="card"/>
                        <Checkbox
                            v-model="offer_enable_billet"
                            text="Boleto" id="billet"/>
                    </Row>
                </Column>

                <Column gap="26px">
                    <span>Página de obrigado</span>
                    <Row align_items="center" flex_wrap="wrap" row_gap="20px" column_gap="46px">
                        <RadioButton
                            id="default_knoo"
                            @toggle="toggleDefaultPage"
                            v-model="isDefault"
                            label="Padrão Knoo" />
                            
                        <RadioButton
                            id="custom_page"
                            @toggle="toggleCustomPage"
                            v-model="isCustom"
                            label="Personalizada" />
                    </Row>

                    <div v-if="isCustom">
                        <Input
                            @update:model-value="() => emitValue('sale_completed_page_url', offer_thanks_page_custom)"
                            label="Digite sua URL"
                            placeholder="https://meudominio.com.br/obrigado"
                            v-model="offer_thanks_page_custom" />
                    </div>
                </Column>
            </div>
        </Column>

    </div>
</template>

<style lang="scss" scoped>
.offer-basic-data {
    max-width: 490px;
    align-items: center;
    display: flex;
    flex-direction: column;


    form {
        display: flex;
        flex-direction: column;
        gap: 40px;

    }

    &--fake-price {
        width: calc(50% - 13px);
    }
    
    &--price {
        width: calc(50% - 13px);
    }

    &__options {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 20px 250px;
        flex-wrap: wrap;
    }
}

@media (max-width: 454px) {
    .offer-basic-data--fake-price, .offer-basic-data--price {
        width: 100%;
    }
}

@media (max-width: 923px) {
    .offer-basic-data__options {
        gap: 20px 190px;
    }
}

@media (max-width: 858px) {
    .offer-basic-data__options {
        gap: 20px 140px;
    }
}

@media (max-width: 818px) {
    .offer-basic-data__options {
        gap: 20px 130px;
    }
}

@media (max-width: 794px) {
    .offer-basic-data__options {
        gap: 20px 100px;
    }
}

@media (max-width: 761px) {
    .offer-basic-data__options {
        gap: 20px 60px;
    }
}

@media (max-width: 718px) {
    .offer-basic-data__options {
        gap: 20px 40px;
    }
}
</style>