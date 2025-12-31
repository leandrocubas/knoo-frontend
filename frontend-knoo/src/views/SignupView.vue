<script setup lang="ts">
import Fade from '@/components/Fade.vue'
import { Form } from 'vee-validate'
import Input from '@/components/Input.vue'
import Grid from '@/components/Grid.vue'
import Button from '@/components/Button.vue'
import Checkbox from '@/components/Checkbox.vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUtils } from '@/composables/useUtils'
import Knoo from '@/components/icons/Knoo.vue'
import { useSignup } from '@/composables/useSignup'

const {
    handleSubmit,
    name,
    email,
    password,
    terms_use,
    checkbox_message,
    isLoading
} = useSignup()

const router = useRouter()

const { isValidEmail } = useUtils()

</script>

<template>
    <div class="sign-up">
        <header class="sign-up__header">
            <Knoo @click="router.replace('/')" />
        </header>
        <section class="sign-up__left-side">
            <section class="sign-up__left-side--form">
    
                <section class="sign-up__left-side--form--title">
                    <h1>Criar conta</h1>
                    <h3>Preencha os dados nos campos abaixo e crie sua conta.</h3>
                </section>
                <Form @submit="handleSubmit">
                    <Grid>
                        <Input
                            label="Nome"
                            placeholder="Exemplo: Lucas Silva"
                            class="signup__form-side__form--name"
                            v-model="name" />
                        <Grid>
                            <Input
                                label="Email"
                                placeholder="Digite seu email"
                                type="email"
                                :disabled="isLoading"
                                
                                v-model="email" />
                            <Input
                                label="Senha"
                                placeholder="Digite sua senha"
                                :disabled="isLoading"
                                type="password"
                                v-model="password" />
    
                            <Checkbox
                                v-model="terms_use"
                                :text="checkbox_message" id="terms_use" />
                        </Grid>
    
                        <Button
                            :is-loading="isLoading"
                            :disabled="(!terms_use || !name || !email || !password) || isLoading || !isValidEmail(email)"
                            type="submit">Criar minha conta
                        </Button>
                        <span class="sign-up__left-side--form--create-account">
                            <RouterLink to="/login">Já tem uma conta? <span>Login</span></RouterLink>
                        </span>
                    </Grid>
    
                </Form>
            </section>
        </section>
        <section class="sign-up__image">
            <Fade top="0" right="30%" />
            <img src="@/assets/images/image-register.png" alt="Imagem de uma tela inicial com dashboard" />
        </section>
        <section class="sign-up__footer">
            <p>Knoo, Sharing Knowledge</p>
            <p>2025 ©</p>

            <Fade right="90%" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.sign-up {
    overflow: hidden;
    flex-wrap: wrap;
    transition: .5s;
    width: 100vw;
    display: grid;
    max-width: 1920px;
    grid-template-rows: 28px;
    border-radius: 16px;
    grid-template-columns: 69%;
    gap: 80px 0;
    grid-template-areas:
        "header header image"
        "form form image"
        "footer footer image";

    &__header {
        grid-area: header;
        height: fit-content;
    }

    &__left-side {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-area: form;
        margin: 0 160px;

        &--form {
            width: 100%;
            max-width: 840px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            justify-content: center;
    
            &--title {
                justify-content: flex-start;
                display: flex;
                flex-direction: column;
                gap: 0;
    
                h1 {
                    font-weight: 600;
                }
                h3 {
                    font-weight: 400;
                    color: #8E8E8E;
                }
    
            }
    
            &--create-account {
                border: 1px solid #E8E8E8;
                padding: 10px;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                font-size: 14px;
                color: #5B5764;
                font-weight: 700;
    
                span {
                    color: #6D39FF;
                    font-weight: 600;
                }
            }
            
    
        }
    }


    &__image {
        grid-area: image;
        transition: .3s;
        border-radius: 16px;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;

        img { 
            max-width: 30vw;
            height: 100%;
            object-fit: cover;
        }
        
        img, figure {
            border-radius: 16px;
        }
    }

    &__footer {
        grid-area: footer;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin: 0 30px;
        p {
            color: #A3A3A3;
            font-size: 12px;
            font-weight: 500;
        }
    }

}


@media only screen and (max-width: 999px) {
    .sign-up {
        justify-content: center;
        &__image {
            transition: .3s;
            display: none;
        }

        &__left-side {
            margin: 0;
            &--form {
                max-width: 100%;

            }
        }

        &__footer {
            margin: 0;
        }
    }
}
</style>