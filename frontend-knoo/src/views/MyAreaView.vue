<script setup lang="ts">
import PurpleFade from '@/components/Fade.vue'
import Title from '@/components/Title.vue'
import Toggle from '@/components/Toggle.vue'
import Row from '@/components/Row.vue'
import Column from '@/components/Column.vue'
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Close from '@/components/icons/Close.vue'
import User from '@/components/icons/User.vue'
import Pencil from '@/components/icons/Pencil.vue'
import { useProfile } from '@/composables/useProfile'
import { Form } from 'vee-validate'

import { onMounted, ref, toValue } from 'vue'
const { loggedUser } = useProfile()

const name = ref()
const _name = ref()
const _email = ref()
const email = ref()
const password = ref()
const newPassword = ref()
const passwordConfirm = ref()
const newSalesNotification = ref(true)
const newWithdrawNotification = ref(true)
const isEditAccount = ref(true)
const showProductNameOnBuyNotify = ref(true)

onMounted(() => {
    if(loggedUser.value){
        name.value = loggedUser.value.name
        email.value = loggedUser.value.email
    }
})

const emit = defineEmits(['closed'])

const editAccountOpened = ref(false)

const onEditBasicInfo = () => {
    
    if(!toValue(isEditAccount)){
        isEditAccount.value = !toValue(isEditAccount)
        
        return
    }
    
    editAccountOpened.value = !toValue(editAccountOpened)
    if(toValue(editAccountOpened)){
        _name.value = toValue(name)
        _email.value = toValue(email)
    }
}
</script>

<template>
    <div class="my-area">

        <div class="my-area__header">
            <Title text="Sua Conta" />

            
            <Close @click="emit('closed')" />
        </div>

        <section class="my-area__container">
            <div class="my-area__container__photo-area">
                <Row column_gap="30px">
                    <div>
                        <input accept="image/png, image/jpeg" id="user-image" type="file" :hidden="true"/>
                        <label for="user-image">
                            <div class="my-area__container__photo-area__image">
                                <User />
                            </div>
                        </label>
                    </div>
                    <Column gap="16px">
                        <div class="my-area__container__photo-area__user--name">
                            <label>{{name}}</label>
                        </div>
                        <div class="my-area__container__photo-area__user--level">
                            <span>Nível Ouro</span>
                        </div>
                    
                    </Column>
                </Row>
            </div>
            <div class="my-area__container__infos-area">
                <section class="my-area__container__infos-area__basic-infos">
                    <div class="my-area__container__infos-area__basic-infos__header">
                        <label>Informações Básicas</label>
                        <Pencil @click="onEditBasicInfo" color="var(--color-primary)" />
                    </div>
                    <div class="my-area__container__infos-area__basic-infos__content">
                        <p>Nome</p>
                        <span class="my-area__container__infos-area__basic-infos__content--value">{{name}}</span>
                    </div>
                    <div class="my-area__container__infos-area__basic-infos__content">
                        <p>E-mail</p>
                        <span class="my-area__container__infos-area__basic-infos__content--value">{{email}}</span>
                    </div>
                    <div class="my-area__container__infos-area__basic-infos__content my-area__container__infos-area__basic-infos__content--no-border-bottom">
                        <p>Senha</p>
                        <span class="my-area__container__infos-area__basic-infos__content--value">●●●●●●●●●●●</span>
                    </div>
                </section>

                <section class="my-area__container__infos-area__account-type">
                    <div class="my-area__container__infos-area__account-type__header">
                        <label>Tipo de conta</label>
                        <Pencil color="var(--color-primary)" />
                    </div>
                    <div class="my-area__container__infos-area__account-type__content">
                        <span>Pessoa Física</span>
                    </div>
                </section>

                <section class="my-area__container__infos-area__notification">
                    <div class="my-area__container__infos-area__notification__header">
                        <label>Notificações</label>
                    </div>
                    <div class="my-area__container__infos-area__notification__content">
                        <Toggle label="Novas Vendas" v-model="newSalesNotification" />
                        <Toggle label="Novos Saques" v-model="newWithdrawNotification" />
                    </div>
                </section>

                <section class="my-area__container__infos-area__preferences">
                    <div class="my-area__container__infos-area__preferences__header">
                        <label>Preferências</label>
                    </div>
                    <div class="my-area__container__infos-area__preferences__content">
                        <Toggle label="Mostrar nome do produto nas notificações de venda" v-model="showProductNameOnBuyNotify" />
                    </div>
                    
                </section>
            </div>
            
        </section>
        <PurpleFade left="56vw" top="2rem" />

        <Dialog title="Editar" :open="editAccountOpened" @opened="onEditBasicInfo">
            <Form class="my-area__edit-form">
                <Input :placeholder="name" v-model="_name" label="Nome" v-if="isEditAccount" />
                <Input :placeholder="email" v-model="_email" type="email" v-if="isEditAccount" label="E-mail" />
                
                <Input type="password" v-model="password" label="Senha atual" v-if="!isEditAccount" />
                <Input type="password" v-model="newPassword" label="Nova senha" v-if="!isEditAccount" />
                <Input type="password" v-model="passwordConfirm" label="Confirmar nova senha" v-if="!isEditAccount" />

                <div class="my-area__edit-form__change-password" v-if="isEditAccount">
                    <span @click="isEditAccount = false">Editar senha</span>
                </div>
                <div class="my-area__edit-form__footer">
                    <span class="my-area__edit-form__footer--cancel" @click="onEditBasicInfo">{{isEditAccount ? 'Cancelar' : 'Voltar'}}</span>
                    <div class="my-area__edit-form__footer--save">
                        <Button>Salvar</Button>
                    </div>
                </div>
            </Form>
        </Dialog>
    </div>

</template>

<style scoped lang="scss">
.my-area {
    background-color: var(--color-background);
    position: fixed;
    top: 0;
    width: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    row-gap: 34px;
    padding-left: 54px;
    padding-right: 54px;
    transition: .4s;
    z-index: 2;
    height: 100vh;
    overflow-y: auto;
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
        border-bottom: 1px solid rgba(var(--color-gray-rgb), .3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1;
        transition: .4s;

        svg {
            width: 23px;
            height: 23px;
            cursor: pointer;
            position: relative;
            z-index: 2;
        }
    }
    
    &__container {
        display: flex;
        column-gap: 146px;
        row-gap: 40px;
        flex-wrap: wrap;
        margin: 30px 0;

        &__photo-area {

            &__image {
                border: 1px solid var(--color-primary);
                cursor: pointer;
                border-radius: 100%;
                width: 128px;
                height: 128px;
                background-color: rgba(var(--color-primary-rgb), .1);

                display: flex;
                align-items: center;
                justify-content: center;
            }

            &__user {

                &--name {
                    label {
                        font-family: var(--font-family-bold);
                        font-size: 24px; 
                    }
                }

                &--level {
                    width: 84px;
                    height: 22px;
                    border-radius: 100px;
                    background: linear-gradient(97deg, var(--color-pink) 13.57%, var(--color-primary) 89.34%);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        font-family: var(--font-family-bold);
                        font-size: 12px;
                    }
                }
            }
        }
        
        &__infos-area {
            flex: 1;
            display: grid;
            row-gap: 20px;

            &__common {
                padding: 28px;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.10);
                background: rgba(255, 255, 255, 0.05);
                transition: .4s;
                display: grid;
                row-gap: 30px;

                &__header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: .4s;

                    label {
                        font-family: var(--font-family-bold);
                        color: var(--color-primary);
                        font-size: 16px;
                        transition: .4s;
                    }

                    svg {
                        width: 23px;
                        height: 23px;
                        cursor: pointer;
                        z-index: 1;
                    }
                }
            }
            
            &__basic-infos {
                @extend .my-area__container__infos-area__common;

                &__header {
                    @extend .my-area__container__infos-area__common__header;
                }

                &__content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 14px;
                    border-bottom: 1px solid rgba(var(--color-gray-rgb), .3);

                    &--no-border-bottom {
                        border-bottom: 0px !important;
                    }

                    &--value {
                        color: rgb(var(--color-gray-rgb));
                    }
                }
            }

            &__account-type {
                @extend .my-area__container__infos-area__common;

                &__header {
                    @extend .my-area__container__infos-area__common__header;
                }

                &__content {
                    span {
                        color: rgb(var(--color-gray-rgb));
                    }
                }
            }

            &__notification {
                @extend .my-area__container__infos-area__common;

                &__header {
                    @extend .my-area__container__infos-area__common__header;
                }

                &__content {
                    display: grid;
                    row-gap: 20px;
                }
            }

            &__preferences {
                @extend .my-area__container__infos-area__common;

                &__header {
                    @extend .my-area__container__infos-area__common__header;
                }
            }
        }
    }

    &__edit-form {
        display: flex;
        flex-direction: column;
        row-gap: 30px;

        &__change-password {
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 14px;
                font-family: var(--font-family-bold);
                color: var(--color-primary);
                cursor: pointer;

                &:hover {
                    opacity: .8;
                }
            }
        }

        &__footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &--save {
                width: 30%;
            }

            &--cancel {
                color: var(--color-gray);
                cursor: pointer;
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

    .my-area {
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

            h1 {
                font-size: 16px;
            }
    
            
        }

        &__content {
            &--form-side {
                &--product-type {
                    @include w-100;
                }

                &--card-invoice {
                    @include w-100;
                }

                &--refund-deadline {
                    @include w-100;
                }

                &--support {
                    @include w-100;
                }
            }
        }
    }
}

@media only screen 
    and (min-width: 200px) 
    and (max-width: 810px) {

    .my-area {
        &__content {
            &--form-side {
                &--product-type {
                    @include w-100;
                }

                &--card-invoice {
                    @include w-100;
                }

                &--refund-deadline {
                    @include w-100;
                }

                &--support {
                    @include w-100;
                }
            }
        }
    }
}

@media only screen 
    and (min-width: 811px) {

    .my-area {
        &__content {
            &--form-side {
                &--product-type {
                    width: calc(50% - 13px);
                }

                &--card-invoice {
                    width: calc(50% - 7px);
                }

                &--refund-deadline {
                    width: calc(50% - 13px);
                }

                &--support {
                    width: calc(50% - 10px);
                }
            }
        }
    }
}

@media only screen 
    and (min-width: 1301px) 
    and (max-width: 1370px) {

    .my-area {
        width: 85%;
    }
}



@media only screen 
    and (min-width: 1371px) 
    and (max-width: 1459px) {

    .my-area {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1460px) 
    and (max-width: 1560px) {

    .my-area {
        width: 87%;
    }
}

@media only screen 
    and (min-width: 1560px) 
    and (max-width: 1700px){

    .my-area {
        width: 88%;
    }
}

@media only screen 
    and (min-width: 1701px) {

    .my-area {
        width: 89%;
    }
}

@media only screen and
(min-width: 900px) and
(min-height: 200px) {
    .my-area {
        &__content {
            flex-direction: row;
            &--image-side {
                display: flex;
                justify-content: flex-start;
                width: 328px;
            }

            &--form-side {
                width: calc(100% - 328px - 36px);
            }
        }
    }
}

</style>