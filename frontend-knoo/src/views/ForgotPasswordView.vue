<script setup lang="ts">
import { Form } from 'vee-validate'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { useForgotPassword } from '@/composables/useForgotPassword'
import { onMounted } from 'vue'
import Fade from '@/components/Fade.vue'
import ImageCircle from '@/components/ImageCircle.vue'
import Knoo from '@/components/icons/Knoo.vue'
import { RouterLink, useRouter } from 'vue-router'

const {
    handleSubmit,
    email,
    hasCode,
    password_confirmation,
    password,
    isLoading,
    validate_code,
    isCodeValid
} = useForgotPassword()

const router = useRouter()

onMounted(() => validate_code())

</script>

<template>
    <section class="forgot-password" v-if="isCodeValid">
        <Fade bottom="30vw" right="80vw" />
        
        <header class="forgot-password__header">
            <Knoo @click="router.replace('/')" />
            <span class="forgot-password__header--login" v-if="!hasCode">
                <RouterLink to="/login">Já tem uma conta? <span>Login</span></RouterLink>
            </span>
        </header>
        
        <div class="forgot-password__body">
            <section class="forgot-password__body--title">
                <h1>{{hasCode ? 'Nova senha de acesso' : 'Recuperação de senha'}}</h1>
                <h3>{{ hasCode ? 'Crie uma senha segura para a sua conta' : 'Insira o email cadastrado para resetar sua senha.'}}</h3>
            </section>

            
            <Form @submit="handleSubmit" class="forgot-password__body--form">
                <ImageCircle v-if="!hasCode" src="../../src/assets/images/circle-1.png" left="0px" bottom="30%" />
                <ImageCircle v-if="!hasCode" src="../../src/assets/images/circle-2.png" left="12%" bottom="-8px" />
                <ImageCircle v-if="!hasCode" src="../../src/assets/images/circle-3.png" left="40%" bottom="-8px" />
                <ImageCircle v-if="!hasCode" src="../../src/assets/images/circle-4.png" left="68%" bottom="-8px" />
                <ImageCircle v-if="!hasCode" src="../../src/assets/images/circle-5.png" right="0px" bottom="30%" />
                <ImageCircle v-if="hasCode" src="../../src/assets/images/circle-6.png" right="0px" bottom="-6px" />
                <ImageCircle v-if="hasCode" src="../../src/assets/images/circle-7.png" left="0px" bottom="-6px" />
                <Input
                    v-if="!hasCode"
                    label="E-mail"
                    placeholder="E-mail de acesso"
                    type="email"
                    v-model="email" />

                <Input
                    v-if="hasCode"
                    label="Senha"
                    :min-length="8"
                    placeholder="Mínimo 8 caracteres"
                    type="password"
                    v-model="password" />

                <Input
                    v-if="hasCode"
                    label="Confirmar senha"
                    placeholder="Mínimo 8 caracteres"
                    :min-length="8"
                    type="password"
                    v-model="password_confirmation" />

                    <Button
                        v-if="hasCode"
                        type="submit"
                        :disabled="(!password || !password_confirmation || password !== password_confirmation || password.length < 8) || isLoading"
                        :is-loading="isLoading">Redefinir senha</Button>

                    <Button
                        v-else
                        type="submit"
                        :disabled="!email || isLoading"
                        :is-loading="isLoading">Enviar revisão de senha</Button>
            </Form>
        </div>
    </section>
</template>
<!-- <template>
    <div class="forgot-password" v-if="isCodeValid">
        <section class="forgot-password__image-side">
            <figure>
                <img src="@/assets/images/flame-pay-auth.png" />
            </figure>
            <PurpleFade left="13vw" bottom="12vh" />
        </section>
        <section class="forgot-password__form-side">
            <figure>
                <img class="forgot-password__form-side__logo" src="@/assets/svg/logo.svg" />
            </figure>

            <section class="forgot-password__info">
                <h1 class="forgot-password__info--title">{{hasCode ? 'Nova senha de acesso' : 'Recuperação de senha'}}</h1>
                <span class="forgot-password__info--description">
                    {{ hasCode ? 'Crie uma nova senha de acesso.' : 'Insira o e-mail cadastrado para recuperar sua senha.'}}
                </span>
            </section>

            <Form @submit="handleSubmit" class="forgot-password__form-side__form">
                <Input
                    v-if="!hasCode"
                    label="E-mail"
                    placeholder="E-mail de acesso"
                    type="email"
                    v-model="email" />

                <Input
                    v-if="hasCode"
                    label="Senha"
                    :min-length="8"
                    placeholder="Mínimo 8 caracteres"
                    type="password"
                    v-model="password" />

                <Input
                    v-if="hasCode"
                    label="Confirmar senha"
                    placeholder="Mínimo 8 caracteres"
                    :min-length="8"
                    type="password"
                    v-model="password_confirmation" />

                    <Button
                        v-if="hasCode"
                        type="submit"
                        :disabled="(!password || !password_confirmation || password !== password_confirmation || password.length < 8) || isLoading"
                        :is-loading="isLoading">Redefinir senha</Button>

                    <Button
                        v-else
                        type="submit"
                        :disabled="!email || isLoading"
                        :is-loading="isLoading">Recuperar senha</Button>
            </Form>
        </section>
    </div>
</template> -->

<style lang="scss" scoped>
.forgot-password {
    gap: 20px;
    max-width: 1920px;
    display: grid;
    grid-template-areas:
        "header header header"
        "body body body"
        "body body body";
    align-items: center;
    width: 100%;
    grid-template-rows: 50px;
    height: 100%;

    &__header {
        grid-area: header;
        display: flex;
        align-content: center;
        justify-content: space-between;
        z-index: 2;
        
        span {
            color: #6D39FF;
            font-weight: 600;
        }
    }

    &__body {
        grid-area: body;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &--title {
            h1 {
                font-size: 32px;
                color: #130F1C;
                font-weight: 600;
            }

            h3 {
                font-size: 14px;
                color: #8E8E8E;
                font-weight: 500;
            }
        }

        &--form {
            width: 59%;
            display: grid;
            row-gap: 20px;
            margin-bottom: 50px;
            max-width: 1920px;
        }
    }
}

@media only screen 
  and (min-width: 200px)
  and (max-width: 1300px) {
    .forgot-password {
        &__header {
            padding: 14px;
        }
    }
}

@media only screen 
  and (max-width: 1276px) {
    .forgot-password {
        &__body {
            &--form {
                .image-circle {
                    display: none;
                }
            }
        }
    }
}
</style>