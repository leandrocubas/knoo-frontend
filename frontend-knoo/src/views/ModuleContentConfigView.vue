<script setup lang="ts">
import { Form } from 'vee-validate'
import PurpleFade from '@/components/Fade.vue'
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Upload from '@/components/Upload.vue'
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import Close from '@/components/icons/Close.vue'
import Loader from '@/components/Loader.vue'
import Avatar from '@/components/Avatar.vue'
import { useModule } from '@/composables/useModule'
import { Size } from '@/enums/size.enum'

import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"

const { 
    contentImage,
    content_image,
    isReleaseExceptionOpened,
    complementaryContentFiles,
    complementary_content_files,
    content_files,
    content_name,
    content_description,
    can_add_module_content,
    module_selected,
    isLoadingAddLesson,
    is_processing_file,
    toggleReleaseException,
    add_lesson,
    storage_file
} = useModule()

const emit = defineEmits(['closed'])

</script>

<template>
    <div class="module-content-config">
        <div class="module-content-config__header">
            <Title text="Criar novo conteúdo" />
            <Close @click="emit('closed')" />
        </div>

        <div class="card-area">
            <div class="card-area__header">
                <label>Informações Básicas</label>
            </div>

            <!-- <Loader v-if="is_processing_file"/> -->

            <div id="uppy-dashboard"></div>

            
            <div class="module-content-config__content">
                <div class="module-content-config__content--image-side">
                    <Upload 
                        @edit="contentImage = ''" 
                        :image-path="contentImage" 
                        v-model="content_image" 
                        id="content-photo"
                        label="Imagem de capa"
                        description="Tamanho recomendado: 1200×1500px (proporção 4:5)"
                    />
                </div>
                <div class="module-content-config__content--form-side">
                    <Form>
                        <Input
                            label="Nome do conteúdo"
                            placeholder="Até 50 caracteres"
                            :max-length="50"
                            v-model="content_name"
                        />
    
                        <Input
                            label="Descrição"
                            placeholder="Até 500 caracteres"
                            :max-length="500"
                            v-model="content_description"
                        />
                        
                    </Form>
                </div>
            </div>
        </div>

        <div class="card-area" v-class="{ disabled: !content_name  }">
            <div class="card-area__header">
                <div>
                    <label>Seleção de Arquivo</label>
                    <p>Escolha um novo em seu computador.</p>
                </div>
            </div>

            <div>
                <div class="module-content-config__content--files">
                    <Upload
                        v-if="module_selected?.area_type?.toLowerCase() === 'stream' "
                        :disabled="!content_name"
                        @edit="storage_file"
                        :max-length="false"
                        v-model="content_files"
                        accept=".mp4, .avi, .mov"
                        id="content-files"
                        label="Selecionar novo arquivo"
                        description="Formatos aceitos: AVI, MP4, MOV"
                        :size="Size.SMALL"
                        :icon="false" />
                    <Upload
                        v-else
                        :disabled="!content_name"
                        @edit="storage_file"
                        :max-length="false"
                        v-model="content_files"
                        accept=".txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpeg,.gif"
                        id="content-files"
                        label="Selecionar novo arquivo"
                        description="Formatos aceitos: TXT, PDF, DOC, DOCX, XLS, XLSX, PNG, JPEG, GIF"
                        :size="Size.SMALL"
                        :icon="false"
                    />
                </div>
                <!-- <div class="module-content-config__content--upload">
                    <span>Escolher arquivo existente</span>
                </div> -->
            </div>
        </div>

        <div class="card-area">
            <div class="card-area__header">
                <div>
                    <label>Anexos / Complementos</label>
                    <p>Caso o conteúdo tenha anexos complementares, insira o arquivo aqui.</p>
                </div>
            </div>

            <div>
                <div class="module-content-config__content--files">
                    <Upload
                        @edit="complementaryContentFiles = ''" 
                        :image-path="complementaryContentFiles" 
                        v-model="complementary_content_files"
                        :max-length="false"
                        id="content-complementary"
                        accept=".txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpeg,.gif"
                        label="Selecionar novo arquivo"
                        description="Formatos aceitos: TXT, PDF, DOC, DOCX, XLS, XLSX, PNG, JPEG, .GIF"
                        :size="Size.SMALL"
                        :icon="false"
                    />
                </div>
                <!-- <div class="module-content-config__content--upload">
                    <span>Escolher arquivo existente</span>
                </div> -->
            </div>
        </div>

        <!-- <div class="card-area">
            <div class="card-area__header">
                <div>
                    <label>Configurações adicionais</label>
                </div>
            </div>

            <div>
               <div class="module-content-config__content--config">
                    <div class="module-content-config__content--left">
                        <CalendarDaysIcon width="24px" />
                        <span>Programar liberação do conteúdo</span>
                    </div>

                    <div class="module-content-config__content--release">
                        <Select v-model="content_release" :items="content_release_options" label="Liberação padrão" />
                        <span @click="toggleReleaseException">+ Incluir exceção</span>
                    </div>
               </div>

               <div class="module-content-config__content--config">
                    <div class="module-content-config__content--left">
                        <ChatBubbleOvalLeftEllipsisIcon />
                        <span>Ativar ou desativar comentários</span>
                    </div>

                    <div>
                        <Toggle v-model="order_bump" label="Permitir comentários" />
                    </div>
               </div>

               <div class="module-content-config__content--config">
                    <div class="module-content-config__content--left">
                        <TagIcon />
                        <span>Inserir um order bump</span>
                        <InformationCircleIcon />
                    </div>

                    <div>
                        <Select :items="order_bump_list" label="Produto à venda" />
                    </div>
               </div>
            </div>
        </div> -->

        <div class="module-content-config__footer">

            <span class="module-content-config__footer--cancel" @click="emit('closed')">Cancelar</span>

            <div class="module-content-config__footer--confirm">
                <Button
                    @click="add_lesson"
                    :loading="isLoadingAddLesson"
                    :disabled="!can_add_module_content">Criar conteúdo</Button>
            </div>
        </div>
        <PurpleFade left="56vw" top="2rem" />
    </div>

    <Dialog
        @opened="toggleReleaseException"
        :open="isReleaseExceptionOpened"
        title="Incluir exceção de liberação"
        :size="Size.LARGE"
    >
        <div class="dialog__content">
            <span class="dialog__content-label">Configure outra regra de liberação para os membros desejados</span>

            <div class="dialog__content-search">
                <MagnifyingGlassIcon />
                <input type="email" placeholder="Buscar e-mail..." />
            </div>

            <div class="members-list">
                <strong class="members-list__title">Membros</strong>

                <div>
                    <ul class="members-list__items">
                        <li v-for="i in 4" class="members-list__item">
                            <div class="members-list__item--info">
                                <Avatar name="Leandro Cubas" />
                                <div>
                                    <strong>Leandro Cubas</strong>
                                    <p>(leandro@email.com.br)</p>
                                </div>
                            </div>
                            <div class="members-list__item--release">
                                Após 7 dias de compra
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="dialog__footer">
            <span @click="toggleReleaseException">Cancelar</span>

            <div class="dialog__footer--button">
                <Button @click="toggleReleaseException">Salvar</Button>
            </div>
        </div>
    </Dialog>

</template>

<style scoped lang="scss">
.module-content-config {
    background-color: var(--color-background);
    position: fixed;
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) transparent;
    top: 0;
    width: 100%;
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
        width: 2px;
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

        svg {
            width: 23px;
            height: 23px;
            cursor: pointer;
            position: relative;
        }
    }
    
    &__content {
        display: flex;
        flex-direction: column;
        gap: 36px;

        &--config {
            display: grid;
            grid-template-columns: 100%;
            row-gap: 18px;
            align-items: center;
            
            padding: 24px 0;

            &:not(:last-child) {
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }

            svg:not(:last-child) {
                stroke: var(--color-primary);
                width: 23px;
            }

            svg:last-child {
                stroke: var(--color-gray);
                width: 16px;
                cursor: pointer;
            }
        }

        &--release {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 20px;
            

            .select {
                max-width: 100%;
            }

            span {
                color: var(--color-primary);
                font-size: 14px;
                cursor: pointer;
                align-self: center;
            }
        }

        &--left {
            display: flex;
            align-items: center;
            gap: 18px;
        }

        &--files {
            height: 93px;
            width: 100%;
        }

        &--upload {
            display: flex;
            justify-content: center;
            padding-top: 20px;

            span {
                color: var(--color-primary);
                font-size: 14px;
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &--image-side {
            display: flex;
            justify-content: center;
        }

        &--form-side {
            form {
                display: flex;
                flex-direction: column;
                gap: 40px;
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
        }

        &--confirm {
            width: 182px;
            cursor: pointer;
        }
    }
}

.card-area {
    padding: 28px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: rgba(255, 255, 255, 0.05);
    transition: .4s;
    display: grid;
    row-gap: 30px;

    &--disabled {
        opacity: .6;
        cursor: not-allowed;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: .4s;

        label {
            font-family: var(--font-family-bold);
            font-size: 16px;
            transition: .4s;
        }

        p {
            font-size: 14px;
            color: var(--color-gray);
        }
    }
}

.members-list {
    display: grid;
    gap: 16px;

    &__title {
        font-size: 14px;
        font-weight: 700;
        color: var(--color-primary);
        font-family: var(--font-family-bold);
    }

    &__items {
        list-style: none;
        padding-left: 0;
        display: grid;
        gap: 20px;
        max-height: 218px;
        overflow-y: scroll;
    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
       

        &:not(:last-child) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 12px;
        }
    }

    &__item--info {
        display: flex;
        align-items: center;
        gap: 12px;

        strong {
            font-size: 14px;
            font-family: var(--font-family-bold);
        }

        p {
            color: var(--color-secondary)
        }
    }
}

.dialog {
    &__content {
        display: grid;
        gap: 24px;

        &-label {
          font-size: 14px;
        }

        &-search {
            display: flex;
            gap: 12px;
            border-bottom: 1px solid var(--color-gray);
            padding-bottom: 6px;

            input {
                border: none;
                background: none;
                font-size: 14px;
                box-sizing: inherit;
                outline: none;
                color: var(--color-white);
                appearance: none;
            }
            
            svg {
                width: 23px;
                height: 23px;
                color: var(--color-gray);
            }
        }
    }

    &__footer {
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 20px;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        span {
            cursor: pointer;
        }

        &--button {
            width: 182px;
        }
    }
}

@media only screen 
    and (min-width: 200px) 
    and (max-width: 1300px) {

    .module-content-config {
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
                font-size: 24px;
            }
        }
    }
}

@media only screen 
    and (min-width: 811px) {

    .module-content-config {
        &__content {
            &--config {
                grid-template-columns: 50% 50%;
            }

            &--release {
                flex-direction: row;
                align-items: end;
            
                .select {
                    max-width: 270px;
                }

                span {
                    align-self: right;
                }
            }
        }
    }
}



@media only screen 
    and (min-width: 1301px) 
    and (max-width: 1370px) {

    .module-content-config {
        width: 100%;
    }
}



@media only screen 
    and (min-width: 1371px) 
    and (max-width: 1459px) {

    .module-content-config {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1460px) 
    and (max-width: 1560px) {

    .module-content-config {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1560px) 
    and (max-width: 1700px){

    .module-content-config {
        width: 100%;
    }
}

@media only screen 
    and (min-width: 1701px) {

    .module-content-config {
        width: 100%;
    }
}

@media only screen and
(min-width: 900px) and
(min-height: 200px) {
    .module-content-config {
        &__content {
            flex-direction: row;
            &--image-side {
                display: flex;
                justify-content: flex-start;
                width: 197px;
                height: 251px;
            }

            &--form-side {
                width: calc(100% - 328px - 36px);
            }
        }
    }
}

@media only screen 
    and (min-width: 200px) 
    and (max-width: 1300px) {

    .module-content-config {
        &__content {
            &--image-side {
                height: 251px;
            }
        }
    }
}

</style>