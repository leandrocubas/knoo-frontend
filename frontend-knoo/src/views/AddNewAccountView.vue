<script setup lang="ts">
import PurpleFade from '@/components/Fade.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import Close from '@/components/icons/Close.vue'
import Clock from '@/components/icons/Clock.vue'
import Steps from '@/components/Steps.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Row from '@/components/Row.vue'
import Dialog from '@/components/Dialog.vue'
import Grid from '@/components/Grid.vue'
import { useAccount } from '@/composables/useAccount'
import { useUtils } from '@/composables/useUtils'
import { onMounted, watch } from 'vue'
const emit = defineEmits(['closed'])

const { format_pix } = useUtils()

const {
    actualStepIndex,
    steps,
    isFormBankDataDone,
    bank_list,
    accountType,
    accountTypeList,
    accountOwner,
    cpf,
    bank,
    agency,
    account,
    accountDigit,
    isSendSuccess,
    key_type,
    keyTypeList,
    key_pix,
    pix_mask,
    is_loading_add_account,
    submitReview,
    sendedSuccess,
    onGetAllBanks
} = useAccount()

onMounted(() => {
    onGetAllBanks()
})

watch(key_type, () => pix_mask.value = format_pix(key_type.value))
</script>

<template>
    <div class="new-account">
        <div class="new-account__header">
            <div>
                <Title text="Adicionar nova conta" />

                <Steps :steps="steps" v-model="actualStepIndex">
                    <template #step-0>
                        <Row column_gap="40px" flex_wrap="wrap" class="new-account__bank-data">
                            <Grid :columns="2" class="new-account__bank-data__form">
                                <Input v-model="accountOwner" placeholder="Nome completo" label="Títular da conta"/>
                                <Input v-model="cpf" type="cpf/cnpj" placeholder="Digite seu CPF ou CNPJ" label="CPF/CNPJ"/>
                                <Select v-model="bank" :items="bank_list" label="Banco" />
                                <Select v-model="accountType" :items="accountTypeList" label="Tipo de conta" />
                                <Input v-model="agency" placeholder="Agência" type="number" label="Agência"/>
                                <Row column_gap="12px">
                                    <Input v-model="account" placeholder="Conta" type="number" label="Conta"/>
                                    <Input v-model="accountDigit" placeholder="Dígito" label="Dígito verificador"/>
                                </Row>
                                <Select v-model="key_type" :items="keyTypeList" label="Tipo de chave PIX" />
                                <Input v-model="key_pix" :type="key_type === 'email' ? key_type : 'text'" :mask="pix_mask" placeholder="Digite seu PIX" label="Chave PIX"/>
                            </Grid>
                        </Row>
                        <div class="new-account__footer">
                            <span class="new-account__footer--cancel" @click="emit('closed')">Cancelar</span>
                            <div class="new-account__footer--confirm">
                                <Row align_items="center" justify_content="flex-end" column_gap="20px">                                    
                                    <div class="new-account__footer--confirm--send-to-analisys">
                                        <Button
                                            :is-loading="is_loading_add_account"
                                            :disabled="!isFormBankDataDone"
                                            @click="submitReview"
                                            >Enviar para análise</Button>
                                    </div>
                                </Row>

                            </div>
                        </div>
                    </template>
                  </Steps>
            </div>

            <Dialog
                @opened="sendedSuccess; emit('closed')"
                :open="isSendSuccess"
                :border="true">
                <div class="dialog-success__content--delete-icon">
                    <div class="dialog-success__content--delete-icon--icon">
                        <Clock />
                    </div>
                </div>

                <div class="dialog-success__content--title">
                    <label>Conta enviada para análise</label>
                    <span>Suas informações passarão por uma análise interna e em breve você receberá uma notificação sobre o resultado.</span>
                </div>

                <div class="dialog-success__footer">
                    <div class="dialog-success__footer--done">
                        <Button type="secondary" @click="sendedSuccess(); emit('closed')">Concluir</Button>
                    </div>
                </div>
            </Dialog>

        
            <Close @click="emit('closed')" />
        </div>
        <PurpleFade left="56vw" top="2rem" />
    </div>

</template>

<style scoped lang="scss">
.new-account {
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
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;

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
        border-bottom: 1px solid rgba(var(--color-gray-rgb), .3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1;
        transition: .4;

        > div {
            align-items: center;   
            display: flex;
            column-gap: 140px;
        }

        svg {
            width: 23px;
            height: 23px;
            cursor: pointer;
            position: relative;
        }
    }

    &__identity {
        &__content {
            &__common {
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, .10);
                background: rgba(255, 255, 255, .05);
                padding: 20px;
    
                .column {
                    height: 100%;
                }
            }
    
            &__proof-identity {
                @extend .new-account__identity__content__common;
    
                &__title {
                    font-family: var(--font-family-bold);
                    font-size: 16px;
                }
    
                &__doc {
                    height: 100%;
                }
    
                &__explanation {
                    &__message {
                        color: rgba(var(--color-white-rgb), .6);
                    }
                }
            }
    
            &__document-front {
                @extend .new-account__identity__content__common;
    
                &__title {
                    font-family: var(--font-family-bold);
                    font-size: 16px;
                }
    
                &__doc {
                    height: 100%;
                }
    
                &__explanation {
                    &__message {
                        color: rgba(var(--color-white-rgb), .6);
                    }
                }
            }
    
            &__document-back {
                @extend .new-account__identity__content__common;
    
                &__title {
                    font-family: var(--font-family-bold);
                    font-size: 16px;
                }
    
                &__doc {
                    height: 100%;
                }
    
                &__explanation {
                    &__message {
                        color: rgba(var(--color-white-rgb), .6);
                    }
                }
            }
        }
    
        &__footer {
            
            display: flex;
            align-items: center;
            justify-content: space-between;
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
    
                &--send-to-analisys {
                    min-width: 12rem;
                }
            }
        }
    }

    &__bank-data {
        &__form {
            flex: 2;

        }
    }
}

.dialog-success {
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
        justify-content: center;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 20px;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        span {
            cursor: pointer;
        }

        &--done {
            width: 182px;
        }
    }
}


@media only screen 
    and (max-width: 1024px) {

    .new-account {
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

    .new-account {
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

    .new-account {
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

    .new-account {
        width: 85%;
    }
}

@media only screen 
    and (min-width: 1371px) 
    and (max-width: 1459px) {

    .new-account {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1460px) 
    and (max-width: 1560px) {

    .new-account {
        width: 87%;
    }
}

@media only screen 
    and (min-width: 1560px) 
    and (max-width: 1700px){

    .new-account {
        width: 88%;
    }
}

@media only screen 
    and (min-width: 1701px) {

    .new-account {
        width: 100%;
    }
}



@media (max-width: 697px) {
    .new-account__footer {
        bottom: -210px;
    }
}

@media (max-width: 383px) {
    .new-account__footer {
        bottom: -280px;
    }
}

@media only screen 
    and (max-height: 568px){

    .new-account__footer {
        bottom: -530px;
    }
}

</style>