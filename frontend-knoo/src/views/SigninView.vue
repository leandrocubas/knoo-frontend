<script setup lang="ts">
import Fade from '@/components/Fade.vue'
import { Form } from 'vee-validate'
import Input from '@/components/Input.vue'
import Grid from '@/components/Grid.vue'
import Button from '@/components/Button.vue'
import Row from '@/components/Row.vue'
import Arrow from '@/components/icons/Arrow.vue'
import { RouterLink } from 'vue-router'
import { useSignin } from '@/composables/useSignin'
import { useUtils } from '@/composables/useUtils'
import Knoo from '@/components/icons/Knoo.vue'

const { handleSubmit, email, password, isLoading } = useSignin()

const { isValidEmail } = useUtils()

</script>

<template>
    <div class="sign-in">
        <header class="sign-in__header">
            <Knoo />
        </header>
        <section class="sign-in__left-side">
            <section class="sign-in__left-side--form">
    
                <section class="sign-in__left-side--form--title">
                    <h1>Login</h1>
                    <h3>Entre em sua conta e comece a vender.</h3>
                </section>
                <Form @submit="handleSubmit">
                    <Grid>
                        <Grid>
                            <Input
                                label="Email"
                                placeholder="Email de acesso"
                                type="email"
                                :disabled="isLoading"
                                
                                v-model="email" />
                            <Input
                                label="Senha"
                                placeholder="Senha de acesso"
                                :disabled="isLoading"
                                type="password"
                                v-model="password" />
                        </Grid>
    
                        <span class="sign-in__left-side--form--forgot-password">
                            <RouterLink to="/recuperar-senha">Esqueci minha senha</RouterLink>
                        </span>
                        <Button :is-loading="isLoading" :disabled="!email || !password || !isValidEmail(email)" type="submit">Acessar minha conta</Button>
                        <span class="sign-in__left-side--form--create-account">
                            <RouterLink to="/cadastro">Ainda não tem uma conta? <span>Criar agora</span></RouterLink>
                        </span>
                    </Grid>
    
                </Form>
            </section>
        </section>
        <section class="sign-in__image">
            <Fade top="0" right="30%" />
            <div class="sign-in__image--blurred-space">
                <div class="sign-in__image--blurred-space__comment">
                    <p>“Construimos uma escola dos sonhos para os nossos alunos, tanto no Brasil, quanto em portugal, amamos a Knoo!”</p>
                </div>
                <div class="sign-in__image--blurred-space__arrows">
                    <Row align_items="center" justify_content="center">
                        <Arrow :to="180" :size="20" />                        
                    </Row>
                    <Row align_items="center" justify_content="center">
                        <Arrow :size="20" />                        
                    </Row>
                </div>
                <div class="sign-in__image--blurred-space__author">
                    <h4 class="sign-in__image--blurred-space__author--name">Amadeu Trabuco</h4>
                    <h5 class="sign-in__image--blurred-space__author--position">Co-founder da Astera</h5>
                </div>
            </div>
            <img src="@/assets/images/image-login.png" alt="Imagem de homem sorrindo" />
        </section>
        <section class="sign-in__footer">
            <p>Knoo, Sharing Knowledge</p>
            <p>2025 ©</p>

            <Fade right="90%" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.sign-in {
    max-width: 1920px;
    overflow: hidden;
    flex-wrap: wrap;
    transition: .5s;
    width: 100vw;
    display: grid;
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

            &--forgot-password {
                display: flex;
                justify-content: flex-end;
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

        &--blurred-space {
            bottom: 10px;
            height: 32%;            
            color: #fff;
            position: absolute;
            width: 94%;
            padding: 20px;
            background: rgba(255, 255, 255, .1);
            border-radius: 16px;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
            display: grid;
            column-gap: 40px;
            grid-template-areas:
                "comment comment arrows"
                "comment comment arrows"
                "author author author";

            &__comment {
                grid-area: comment;
            }

            &__author {
                grid-area: author;
                display: flex;
                align-items: flex-start;
                flex-direction: column;

                &--name {
                    font-size: 20px;
                    color: #FFFFFF;
                    font-weight: 500;
                }
                
                &--position {
                    font-size: 12px;
                    color: #FFFFFF;
                    font-weight: 300;
                }
            }

            &__arrows {
                grid-area: arrows;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 20px;
                
                svg {
                    border: 1px solid rgba(255,255,255, .2);
                    display: flex;
                    border-radius: 100%;
                    width: 36px;
                    height: 36px;
                    padding: 0 6px;
                }
            }

            p {
                font-weight: 500;
                font-size: 20px;
                line-height: 22px;
                text-align: justify;
            }
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
    .sign-in {
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