<script setup lang="ts">
import PurpleFade from '@/components/Fade.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import Close from '@/components/icons/Close.vue'
import { type PropType } from 'vue'
import { useOffer } from '@/composables/useOffer'
import { type IOffer } from '@/store/offer/interface/offer.interface'
import Steps from '@/components/Steps.vue'
import Row from '@/components/Row.vue'
import OfferBasicData from './OfferBasicData.vue'
import OfferIntegration from './OfferIntegration.vue'

const {
    toggle_add_offer,
    onCreate,
    is_loading,
    can_go_to_next_step,
    _offer,
    onEdit,
    storaged_offer,
    nextStep,
    prevStep,
    actualStepIndex,
    steps
} = useOffer()

defineProps({
  offer: {
    type: Object as PropType<IOffer>,
    required: false,
    default: undefined
  },
  product_id: {
    type: Number,
    required: true
  },
})

const emit = defineEmits(['closed', 'cleanOffer'])

const _onEdit = () => onEdit(_offer.value).then((res: IOffer) => {
    emit('cleanOffer', res)
})

const onCancel = () => {
    
    toggle_add_offer()
    emit('closed')
}

</script>

<template>
    <div class="offer-config">
        <div class="offer-config__header">
            <div>
                <!-- <Title :text="storaged_offer ? 'Editar oferta' : 'Criar nova oferta'" /> -->
                <Steps :steps="steps" v-model="actualStepIndex">
                    <template #step-0>
                        <div :style="{ display: 'flex', justifyContent: 'center' }">
                            <OfferBasicData :offer="offer" v-model="_offer" />
                        </div>
                    </template>
                    <template #step-1>
                        <OfferIntegration :offer />
                    </template>
                    
                  </Steps>
            </div>
        
            <div class="buttons">
                <Button v-if="actualStepIndex === 0" @click="onCancel" type="secondary">Cancelar</Button>
                <Button @click="prevStep" v-if="actualStepIndex === 1" type="secondary">Voltar</Button>
                <Button
                    v-if="actualStepIndex === 0"
                    @click="nextStep"
                    :is-loading="is_loading"
                    :disabled="!can_go_to_next_step">Continuar</Button>
                <Button
                    :disabled="!can_go_to_next_step"
                    v-if="actualStepIndex === 1 && !storaged_offer?.id"
                    @click="() => onCreate(_offer, product_id)"
                    :is-loading="is_loading">Criar oferta</Button>
                <Button
                    :disabled="!can_go_to_next_step"
                    v-if="actualStepIndex === 1 && storaged_offer?.id"
                    @click="_onEdit"
                    :is-loading="is_loading">Editar oferta</Button>
            </div>
        </div>
        <PurpleFade left="56vw" top="2rem" />
    </div>

</template>

<style scoped lang="scss">
.offer-config {
    background-color: var(--color-background);
    position: fixed;
    top: 0;
    width: 100%;
    height: 96vh;
    right: 0;
    display: flex;
    flex-direction: column;
    row-gap: 34px;
    padding-left: 54px;
    padding-right: 54px;
    transition: .3s;
    z-index: 2;
    overflow-y: auto;
    height: 100vh;
    overflow-x: hidden;

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

    &__header {
        padding-top: 38px;
        padding-bottom: 19px;
        border-bottom: 1px solid rgba(235, 235, 235, 0.48);
        
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: .4;

        display: grid;
        grid-template-columns: repeat(3, 1fr);

        > div {
            align-items: center;   
            display: flex;
            grid-column-start: 1;
            grid-column-end: 4;
            justify-content: flex-end;

            .steps {
                width: 56% !important;
            }

            .button {
                width: 144px !important;
            }
        }

        > .buttons {
            position: relative;
            grid-column-start: 4;
            gap: 12px;
        }
    }
    
    &__content {
        display: flex;
        flex-direction: column;
        gap: 36px;
        justify-content: center;        
    }

    &__footer {
        position: absolute;
        bottom: -10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 93%;
        padding: 20px 0;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        z-index: 2;
        &--cancel {
            cursor: pointer;
        }

        &--confirm {
            width: 242px;
            cursor: pointer;
            &--create-offer {
                width: 80%;
            }

            &--back {
                width: 20%;
            }
        }
    }
}


@media only screen 
    and (max-width: 1024px) {

    .offer-config {
        &__header {
            transition: .4;
            > div {
                
                column-gap: 130px;
            }
        }
    }
}

@media only screen 
    and (max-width: 854px) {

    .offer-config {
        &__header {
            transition: .4;
            > div {
                column-gap: 30px;
            }
        }
    }
}


@mixin w-100 {
    width: 100%;
}

@media only screen 
    and (min-width: 200px) 
    and (max-width: 1300px) {

    .offer-config {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        overflow-y: auto;
        row-gap: 20px;
        overflow-x: hidden;

        &__header {
            padding-top: 58px;
            padding-left: 10px;
            padding-bottom: 19px;
            border-bottom: 1px solid rgba(var(--color-gray-rgb), .3);
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 1;
    
            
        }
    }
}

@media only screen 
    and (min-width: 1301px) 
    and (max-width: 1370px) {

    .offer-config {
        width: 85%;
    }
}

@media only screen 
    and (min-width: 1371px) 
    and (max-width: 1459px) {

    .offer-config {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1460px) 
    and (max-width: 1560px) {

    .offer-config {
        width: 87%;
    }
}

@media only screen 
    and (min-width: 1560px) 
    and (max-width: 1700px){

    .offer-config {
        width: 88%;
    }
}

@media only screen 
    and (min-width: 1701px) {

    .offer-config {
        width: 100%;
    }
}



@media (max-width: 697px) {
    .offer-config__footer {
        bottom: -210px;
    }

    .offer-config__footer--confirm--back {
        display: none;
    }
}

@media (max-width: 383px) {
    .offer-config__footer {
        bottom: -280px;
    }
}

@media only screen 
    and (max-height: 568px){

    .offer-config__footer {
        bottom: -530px;
    }
}

</style>