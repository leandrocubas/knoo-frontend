<script setup lang="ts">
import PurpleFade from '@/components/Fade.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import Close from '@/components/icons/Close.vue'
import Clock from '@/components/icons/Clock.vue'
import Steps from '@/components/Steps.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Checkbox from '@/components/Checkbox.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Dialog from '@/components/Dialog.vue'
import DocSelector from '@/components/DocSelector.vue'
import Grid from '@/components/Grid.vue'
import { useAccount } from '@/composables/useAccount'
import { computed, onMounted, ref, toValue, watch } from 'vue'
import Fingerprint from '@/components/icons/Fingerprint.vue'
import Bank from '@/components/icons/Bank.vue'
import { useStore } from 'vuex'
import type { IViaCEP } from '@/interfaces/viacep.interface'
import type { ISelect } from '@/interfaces/select.interface'
import { useUtils } from '@/composables/useUtils'
import type { ICNPJAccount } from '@/store/user/interface/cnpj-account.interface'
import type { ICNPJWS } from '@/interfaces/cnpjws.interface'
import { useToast } from 'vue-toast-notification'
import { useProfile } from '@/composables/useProfile'
import type { IStates } from '@/store/user/interface/states.interface'
import ValidateDocuments from '@/components/icons/ValidateDocuments.vue'
import SavingData from '@/components/icons/SavingData.vue'
import ValidateData from '@/components/icons/ValidateData.vue'

const emit = defineEmits(['closed'])
const store = useStore()
const {
  loggedUser
} = useProfile()

const {
    actualStepIndex,
    confirm,
} = useAccount()

const toast = useToast()

const { urlRegex, convertFileToBase64, convertDateToISOFormat } = useUtils()

const account_type_list = ref<ISelect[]>([
    { label: 'LTDA', value: 'ltda'},
    { label: 'EIRELI', value: 'eireli'},
    { label: 'SLU', value: 'slu'},
    { label: 'MEI', value: 'mei'},
    { label: 'Empreendedor Individual', value: 'individualEntrepreneur'},
])

const company_name = ref()
const account_type = ref()
const trade_name = ref()
const mother_name = ref()
const cnpj = ref()
const partner_cpf = ref()
const name_responsible = ref()
const birth_date = ref()
const phone = ref()
const cnae = ref()
const monthly_revenue = ref()
const website = ref()
const cep = ref()
const state = ref()
const neighborhood = ref()
const street = ref()
const complement = ref()
const city = ref()
const number = ref()
const companyDocument = ref<File>()
const documentBack = ref<File>()
const identityDoc = ref<File>()
const documentFront = ref<File>()
const isSendSuccess = ref<boolean>(false)
const about_company = ref()
const isLoading = ref(false)
const isLoadingCPF = ref(false)
const isLoadingCNPJ = ref(false)
const isLoadingStates = ref(false)

const state_list = computed<ISelect[]>(() =>
    store.getters['user/getAllStates']
        .map((el: IStates) => ({ value: el.sigla, label: el.nome })
))

const isFormDone = computed(() => 
        !!toValue(company_name) &&
        !!toValue(account_type) &&
        !!toValue(trade_name) &&
        !!toValue(cnpj) &&
        !!toValue(partner_cpf) &&
        !!toValue(phone) &&
        !!toValue(cnae) &&
        !!toValue(monthly_revenue) &&
        !!toValue(about_company) &&
        !!toValue(website) &&
        !!toValue(mother_name) &&
        urlRegex.test(toValue(website)) &&
        !!toValue(cep) &&
        !!toValue(neighborhood) &&
        !!toValue(street) &&
        !!toValue(number) &&
        !!toValue(birth_date) &&
        !!toValue(city)
)

const steps = ref([
    { completed: true, title: 'Identificação', disabled: false, icon: Fingerprint },
    { completed: false, title: 'Documentos', disabled: !toValue(isFormDone), icon: Bank }
])

onMounted(() => {
    isLoadingStates.value = true

    if(!loggedUser.value?.pay_configs_pendences?.configs_account){
        actualStepIndex.value = 1
        steps.value = [
            { completed: true, title: 'Identificação', disabled: true, icon: Fingerprint },
            { completed: false, title: 'Documentos', disabled: false, icon: Bank }
        ]
    }


    store.dispatch('user/get_all_states')
        .then(() => isLoadingStates.value = false)
})

const isFormDocumentDone = computed(() => 
        !!toValue(documentFront) &&
        !!toValue(identityDoc) &&
        !!toValue(documentBack) &&
        !!toValue(confirm) &&
        !!toValue(companyDocument)
)

const has_rg_front = computed(() => !!toValue(loggedUser)?.pay_configs_pendences?.documents.find((el: string) => el.includes('rg_front')))
const has_rg_back = computed(() => !!toValue(loggedUser)?.pay_configs_pendences?.documents.find((el: string) => el.includes('rg_back')))
const has_rg_selfie = computed(() => !!toValue(loggedUser)?.pay_configs_pendences?.documents.find((el: string) => el.includes('rg_selfie')))
const has_rg_address = computed(() => !!toValue(loggedUser)?.pay_configs_pendences?.documents.find((el: string) => el.includes('rg_address')))

const onFindAddressByCEP = (): void => {
        if(cep.value && cep.value.length === 9){
            isLoadingCPF.value = true
            store.dispatch('user/get_address_by_cep', cep.value).then(
                (res: IViaCEP) => {
                    if(res.erro) {
                        city.value = ''
                        neighborhood.value = ''
                        street.value = ''
                        state.value = ''
                        isLoadingCPF.value = false
                        return
                    }
                    
                    isLoadingCPF.value = false
                    if(res.bairro && res.localidade && res.uf && res.logradouro){
                        city.value = `${res.localidade} - ${res.uf}`
                        neighborhood.value = res.bairro
                        state.value = res.uf
                        street.value = res.logradouro
                    }
                }
            )
        }
}

const onFindCompanyByCNPJ = () => {
    if(cnpj.value && cnpj.value.length === 18){
            isLoadingCNPJ.value = true
            store.dispatch('user/get_company_by_cnpj', cnpj.value.replace(/[-,.,/]/g, '')).then(
                (res: ICNPJWS) => {
                    isLoadingCNPJ.value = false
                    if(res){
                        const socio = res?.socios.find((socio) => socio.qualificacao_socio.descricao.toLowerCase().includes('sócio-administrador'))
    
                        if(!socio) return
    
                        if(res.status === 429) return
    
                        if(res.status) {
                            name_responsible.value = ''
                            company_name.value = ''
                            trade_name.value = ''
                            cnae.value = ''
                            toast.error(res?.detalhes ?? '')
                            return
                        }
    
                        name_responsible.value = socio.nome
                        company_name.value = res.razao_social
                        trade_name.value = res.estabelecimento.nome_fantasia
                        cnae.value = res.estabelecimento.atividade_principal.subclasse
                    }
                }
            )
        }
}

watch(cnpj, () => onFindCompanyByCNPJ(), { immediate: true })

watch(cep, () => onFindAddressByCEP(), { immediate: true })

const clearLoading = () => {
    isLoading.value = false
    isLoadingFirst.value = false
    isLoadingSecond.value = false
    isLoadingThird.value = false

    isPendingFirst.value = false
    isPendingSecond.value = false
    isPendingThird.value = false

    isCompleteFirst.value = false
    isCompleteSecond.value = false
    isCompleteThird.value = false
}

const sendedSuccess = async () => {

    const rg_selfie = await convertFileToBase64(identityDoc.value)
    const rg_front = await convertFileToBase64(documentFront.value)
    const rg_back = await convertFileToBase64(documentBack.value)
    const company_document_data = await convertFileToBase64(companyDocument.value)

    const document_type = account_type.value === 'ltda' || account_type.value === 'eireli' || account_type.value === 'slu' ? 'last_contract' : 'cnpj_card'

    isLoading.value = true

    const interval = setInterval(() => {
        isLoadingFirst.value = false
        isCompleteFirst.value = true

        isLoadingSecond.value = true
        isPendingSecond.value = false

        setInterval(() => {
            isLoadingSecond.value = false
            isCompleteSecond.value = true

            isLoadingThird.value = true
            isPendingThird.value = false

            setInterval(() => {
                isCompleteSecond.value = true
                isLoadingThird.value = false
                isCompleteThird.value = true
            }, 5000)
        }, 5000)
    }, 5000)

    store.dispatch('user/add_cnpj_account', {
        document_cpf: toValue(partner_cpf).replace(/[., -]/g, ''),
        document_cnpj: toValue(cnpj).replace(/[-,.,/]/g, ''),
        phone: toValue(phone).replace(/[(, ), -]/g, ''),
        cnae: toValue(cnae).replace(/[-, /]/g, ''),
        type_company_cnpj: toValue(account_type),
        address_zipcode: toValue(cep).replace(/[-]/g, ''),
        address_street: toValue(street),
        address_number: toValue(number),
        address_neighborhood: toValue(neighborhood),
        address_city: toValue(city),
        address_state: toValue(state),
        monthly_income: +toValue(monthly_revenue) * 100,
        about: toValue(about_company),
        social_media_link: toValue(website),
        name: toValue(company_name),
        responsible_name: toValue(name_responsible),
        name_display: toValue(trade_name),
        mother_name: toValue(mother_name),
        responsible_document_cpf: toValue(partner_cpf).replace(/[., -]/g, ''),
        birth_date: convertDateToISOFormat(toValue(birth_date)),
        rg_selfie,
        rg_front,
        rg_back,
        [document_type]: company_document_data

    } as ICNPJAccount).then((res) => {
        clearInterval(interval)
        isLoading.value = false
        isSendSuccess.value = !toValue(isSendSuccess)

        clearLoading()
    })
    .catch(() => clearLoading())
}

const isLoadingFirst = ref(true)
const isPendingFirst = ref(false)
const isCompleteFirst = ref(false)


const isLoadingSecond = ref(false)
const isPendingSecond = ref(true)
const isCompleteSecond = ref(false)

const isLoadingThird = ref(false)
const isPendingThird = ref(true)
const isCompleteThird = ref(false)

const nextStep = () => {
    actualStepIndex.value++
    steps.value = [
        { completed: true, title: 'Identificação', disabled: false, icon: Fingerprint },
        { completed: false, title: 'Documentos', disabled: false, icon: Bank }
    ]
}

</script>

<template>
    <div class="new-account-cnpj">
        <div class="new-account-cnpj__header">
            <div>
                <Title text="Adicionar conta CNPJ" />

                <Steps :steps="steps" v-model="actualStepIndex">
                    <template #step-0>
                        <Grid :columns="3" class="new-account-cnpj__bank-data__form">
                            <Select v-model="account_type" :items="account_type_list" label="Tipo de Empresa" />
                            <Input name="cnpj" v-model="cnpj" mask="##.###.###/####-##" placeholder="Digite o CNPJ da empresa" label="CNPJ"/>
                            <Input name="company_name" v-model="company_name" :is-loading="isLoadingCNPJ" placeholder="Empresa LTDA" label="Razão Social"/>
                            <Input name="trade_name" v-model="trade_name" :is-loading="isLoadingCNPJ" placeholder="Empresa Fantasia" label="Nome Fantasia"/>
                            <Input name="partner_cpf" v-model="partner_cpf" mask="###.###.###-##" placeholder="CPF Sócio majoritário" label="CPF"/>
                            <Input name="name_responsible" v-model="name_responsible" :is-loading="isLoadingCNPJ" placeholder="Nome completo" label="Nome do sócio majoritário"/>
                            <Input name="birth_date" v-model="birth_date" mask="##/##/####" placeholder="DD/MM/AAAA" label="Data de nascimento"/>
                            <Input name="mother_name" v-model="mother_name" placeholder="Nome completo da sua mãe" label="Nome da mãe"/>
                            <Input name="phone" v-model="phone" mask="(##) #####-####" placeholder="(00) 00000-0000" label="Telefone"/>
                            <Input name="cnae" v-model="cnae" :is-loading="isLoadingCNPJ" mask="####-#/##" placeholder="2599-5/04" label="CNAE"/>
                            <Input name="monthly_revenue" v-model="monthly_revenue" type="money" placeholder="R$ 0,00" label="Faturamento médio mensal"/>
                            <Input name="website" v-model="website" placeholder="https://meusite.com" label="Link da mídia social"/>
                            <Input name="cep" v-model="cep" mask="#####-###" placeholder="00000-000" label="CEP"/>
                            <Input name="city" v-model="city" :is-loading="isLoadingCPF" :placeholder="isLoadingCPF ? '' : 'Digite...'" label="Cidade"/>
                            <Select name="state" v-model="state" :items="state_list" label="Estado" />
                            <Input name="neighborhood" v-model="neighborhood" :is-loading="isLoadingCPF" :placeholder="isLoadingCPF ? '' : 'Digite...'" label="Bairro"/>
                            <Input name="street" v-model="street" :is-loading="isLoadingCPF" :placeholder="isLoadingCPF ? '' : 'Digite...'" label="Logradouro"/>
                            <Input name="number" v-model="number" placeholder="Digite..." label="Número"/>
                            <Input name="complement" v-model="complement" placeholder="Digite..." label="Complemento"/>
                            <Input name="about_company" v-model="about_company" placeholder="Impulsionadora de anúncios" label="Sobre sua empresa"/>
                        </Grid>
                        <div class="new-account-cnpj__identity__footer">
                            <span class="new-account-cnpj__identity__footer--cancel" @click="emit('closed')">Cancelar</span>
                            <div class="new-account-cnpj__identity__footer--confirm">
                                
                                <Button
                                    @click="nextStep"
                                    :disabled="!isFormDone">Continuar</Button>
                                    
                                <Row align_items="center" justify_content="flex-end" column_gap="20px">
                                    <span v-if="actualStepIndex === 1" class="new-account-cnpj__identity__footer--confirm--back">
                                        Voltar
                                    </span>
                                </Row>
                            </div>
                        </div>
                    </template>
                    <template #step-1>
                        <Column gap="26px" class="new-account-cnpj__identity__content">
                            <Row v-if="has_rg_selfie" align_items="center" column_gap="6rem" justify_content="space-between" class="new-account-cnpj__identity__content__proof-identity">
                                <Column gap="26px" :style="{ flex: .8 }">
                                    <div>
                                        <h2 class="new-account-cnpj__identity__content__proof-identity__title">Comprovante de identidade</h2>
                                    </div>
                                    <div class="new-account-cnpj__identity__content__proof-identity__doc">
                                        <DocSelector v-model="identityDoc" :accept="['application/pdf', 'image/png', 'image/jpeg']" placeholder="Formatos aceitos: JPG, PNG e PDF" id="identity-document" />
                                    </div>
                                </Column>

                                <div :style="{ flex: 1 }" class="new-account-cnpj__identity__content__proof-identity__explanation">
                                    <Row column_gap="28px" align_items="center" justify_content="space-between">
                                        <figure>
                                            <img src="@/assets/images/proof-identity.png" />
                                        </figure>

                                        <p class="new-account-cnpj__identity__content__proof-identity__explanation__message">Uma selfie segurando o documento RG aberto, mostrando o seu rosto. Tire uma foto clara, com fácil leitura dos dados e visualização do rosto.</p>
                                    </Row>
                                </div>
                            </Row>

                            <Row v-if="has_rg_front" align_items="center" column_gap="6rem" justify_content="space-between" class="new-account-cnpj__identity__content__document-front">
                                <Column gap="26px" :style="{ flex: .8 }">
                                    <div>
                                        <h2 class="new-account-cnpj__identity__content__document-front__title">Frente do documento</h2>
                                    </div>
                                    <div class="new-account-cnpj__identity__content__document-front__doc">
                                        <DocSelector v-model="documentFront" :accept="['application/pdf', 'image/png', 'image/jpeg']" placeholder="Formatos aceitos: JPG, PNG e PDF" id="document-front" />
                                    </div>
                                </Column>

                                <div :style="{ flex: 1 }" class="new-account-cnpj__identity__content__document-front__explanation">
                                    <Row column_gap="28px" align_items="center" justify_content="space-between">
                                        <figure>
                                            <img src="@/assets/images/document-front.png" />
                                        </figure>

                                        <p class="new-account-cnpj__identity__content__document-front__explanation__message">Parte frontal do seu documento RG, contendo informações como: Fotografia, assinatura e digital.</p>
                                    </Row>
                                </div>
                            </Row>

                            <Row v-if="has_rg_back" align_items="center" column_gap="6rem" justify_content="space-between" class="new-account-cnpj__identity__content__document-back">
                                <Column gap="26px" :style="{ flex: .8 }">
                                    <div>
                                        <h2 class="new-account-cnpj__identity__content__document-back__title">Verso do documento</h2>
                                    </div>
                                    <div class="new-account-cnpj__identity__content__document-back__doc">
                                        <DocSelector v-model="documentBack" :accept="['application/pdf', 'image/png', 'image/jpeg']" id="document-back" />
                                    </div>
                                </Column>

                                <div :style="{ flex: 1 }" class="new-account-cnpj__identity__content__document-back__explanation">
                                    <Row column_gap="28px" align_items="center" justify_content="space-between">
                                        <figure>
                                            <img src="@/assets/images/document-back.png" />
                                        </figure>

                                        <p class="new-account-cnpj__identity__content__document-back__explanation__message">Parte de trás do seu documento RG, contendo informações como: Orgão expedidor, nome completo, data de nascimento, naturalidade, filiação...</p>
                                    </Row>
                                </div>
                            </Row>

                            <Row v-if="has_rg_address" align_items="center" column_gap="6rem" justify_content="space-between" class="new-account-cnpj__identity__content__document-back">
                                <Column gap="26px" :style="{ flex: .8 }">
                                    <div>
                                        <h2 class="new-account-cnpj__identity__content__document-back__title">Contrato Social ou Cartão CNPJ</h2>
                                    </div>
                                    <div class="new-account-cnpj__identity__content__document-back__doc">
                                        <DocSelector v-model="companyDocument" :accept="['application/pdf', 'image/png', 'image/jpeg']" id="company-document" />
                                    </div>
                                </Column>

                                <div :style="{ flex: 1 }" class="new-account-cnpj__identity__content__document-back__explanation">
                                    <Row column_gap="28px" align_items="center" justify_content="space-between">
                                        <figure>
                                            <img src="@/assets/images/company-document.png" />
                                        </figure>

                                        <p class="new-account-cnpj__identity__content__document-back__explanation__message">Para empresas do tipo LTDA e Eireli, enviar para análise, o Contrato Social. Para empresas EI (Empresário Individual) e MEI, enviar o Cartão CNPJ.</p>
                                    </Row>
                                </div>
                            </Row>

                            <div class="new-account-cnpj__identity__confirm">
                                <Checkbox
                                    v-model="confirm"
                                    text="Confirmo que os documentos pertencem ao títular do cadastro" id="confirm-doc"/>
                            </div>

                            <div class="new-account-cnpj__footer">
                                <span class="new-account-cnpj__footer--cancel" @click="emit('closed')">Cancelar</span>
                                <div class="new-account-cnpj__footer--confirm">
                                    <Row align_items="center" justify_content="flex-end" column_gap="20px">
                                        <span v-if="loggedUser?.pay_configs_pendences?.configs_account" @click="actualStepIndex--" class="new-account-cnpj__footer--confirm--back">
                                            Voltar
                                        </span>
                                        <div class="new-account-cnpj__footer--confirm--send-to-analisys">
                                            <Button
                                                :is-loading="isLoading"
                                                :disabled="!isFormDocumentDone"
                                                @click="sendedSuccess"
                                                >Enviar para análise</Button>
                                        </div>
                                    </Row>
    
                                </div>
                            </div>
                        </Column>
                    </template>
                  </Steps>
            </div>

            <Dialog
                @opened="sendedSuccess"
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

            <Dialog
                v-if="isLoading"
                :border="true"
                title="Estamos cadastrando a sua conta"
                :open="isLoading"
                :hasClose="false">

                <Row class="steps-loader" column_gap="20px">
                    <section class="steps-loader__step" v-class="{ pending: isPendingFirst, loading: isLoadingFirst, completed: isCompleteFirst }">
                        <div class="icon">
                            <ValidateData :color="isCompleteFirst ? '#fff' : 'var(--color-primary)' " />
                        </div>
                        <span class="loader"></span>
                        <label class="label">Validando dados</label>
                    </section>

                    <section class="steps-loader__step" v-class="{ pending: isPendingSecond, loading: isLoadingSecond, completed: isCompleteSecond }">
                        <div class="icon">
                            <ValidateDocuments :color="isCompleteSecond ? '#fff' : isPendingSecond ? '#505050' : 'var(--color-primary)' " />
                        </div>
                        <span class="loader"></span>
                        <label class="label">Validando documentos</label>
                    </section>

                    <section class="steps-loader__step" v-class="{ pending: isPendingThird, loading: isLoadingThird, completed: isCompleteThird }">
                        <div class="icon">
                            <SavingData :color="isCompleteThird ? '#fff' : isPendingThird ? '#505050' : 'var(--color-primary)' " />
                        </div>
                        <span class="loader"></span>
                        <label class="label">Salvando seus dados</label>
                    </section>

                </Row>
                <span class="steps-loader--message">Esse processo pode levar até 1 minuto!</span>

            </Dialog>

        
            <Close @click="emit('closed')" />
        </div>
        <PurpleFade left="56vw" top="2rem" />
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/steps-loader.scss';
@import url('@/assets/keyframes/spinner.scss');

.new-account-cnpj {
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
                @extend .new-account-cnpj__identity__content__common;
    
                &__title {
                    font-family: var(--font-family-bold);
                    font-size: 16px;
                }
    
                &__doc {
                    height: 100%;
                }
    
                &__explanation {
                    &__message {
                        color: rgba(var(--color-black-rgb), .6);
                    }
                }
            }
    
            &__document-front {
                @extend .new-account-cnpj__identity__content__common;
    
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
                @extend .new-account-cnpj__identity__content__common;
    
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
    
                &--back {
                    width: 20%;
                }
            }
        }
    }

    &__bank-data {
        &__document {
            flex: 1;
            min-width: 14em;
            &__description {
                font-size: 14px;
                color: rgba(var(--color-white-rgb), .8);
            }

            &__capture {
                height: 36vh;   
            }

            &__see-example {
                font-size: 14px;
                color: var(--color-primary);
                font-family: var(--font-family-bold);
                text-decoration: underline;
                cursor: pointer;
                &:hover {
                    opacity: .6;
                    transition: .6;
                }
            }
        }
        
        &__form {
            flex: 2;

        }
    }

    &__footer {
        align-items: center;
        display: flex;
        justify-content: space-between;
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

    .new-account-cnpj {
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

    .new-account-cnpj {
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

    .new-account-cnpj {
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

    .new-account-cnpj {
        width: 85%;
    }
}

@media only screen 
    and (min-width: 1371px) 
    and (max-width: 1459px) {

    .new-account-cnpj {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1460px) 
    and (max-width: 1560px) {

    .new-account-cnpj {
        width: 87%;
    }
}

@media only screen 
    and (min-width: 1560px) 
    and (max-width: 1700px){

    .new-account-cnpj {
        width: 88%;
    }
}

@media only screen 
    and (min-width: 1701px) {

    .new-account-cnpj {
        width: 89%;
    }
}



@media (max-width: 697px) {
    .new-account-cnpj__footer {
        bottom: -210px;
    }

    .new-account-cnpj__footer--confirm--back {
        display: none;
    }
}

@media (max-width: 383px) {
    .new-account-cnpj__footer {
        bottom: -280px;
    }
}

@media only screen 
    and (max-height: 568px){

    .new-account-cnpj__footer {
        bottom: -530px;
    }
}

</style>