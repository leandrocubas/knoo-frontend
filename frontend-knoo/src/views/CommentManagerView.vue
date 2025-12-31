<script setup lang="ts">
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'
import Avatar from '@/components/Avatar.vue'
import Button from '@/components/Button.vue'
import GhostLoading from '@/components/GhostLoading.vue'
import Paginator from '@/components/Paginator.vue'

import { useCommentManager } from '@/composables/useCommentManager'

const emit = defineEmits(['page'])

const {
    items,
    isLoading,
    onFail,
    onSuccess
} = useCommentManager()

</script>

<template>
    <section class="comment-manager">
        <div class="comment-manager__header">
            <div class="comment-manager__header__actions">
                <div class="comment-manager__header__actions--button">
                    <Button>+ Adicionar comentário</Button>
                </div>
            </div>
        </div>
    
    
        <div class="comment-manager__content">
            <div v-for="item in items" class="comment__card">
                <div class="comment__card--left">
                    <div class="comment__card--avatar">
                        <Avatar type="darken" name="Marcos Almeida" />
                    </div>

                    <div class="comment__card--info">
                        <h4>Marcos Almeida - Nome da Área - Aula #5</h4>
                        <span>Espaço para comentário. Espaço para comentário.</span>
                        <p class="comment__card--answer-link">
                            <ArrowUturnLeftIcon />
                            Responder
                        </p>
                    </div>
                </div>
                <div class="comment__card--right">
                    <span class="comment__card--date">DD/MM 00:00</span>
                    <div class="comment__card--actions">
                        <Button @click="onFail" type="error">Reprovar</Button>
                        <Button @click="onSuccess" type="success">Aprovar</Button>
                    </div>
                </div>
            </div>
           
            <span v-if="!items.length && !isLoading">Não há comentários ainda</span>

            <GhostLoading min-height="188px" v-if="isLoading"/>
            <GhostLoading min-height="188px" v-if="isLoading"/>

            <div class="comment-manager__paginator" v-if="items.length">
                <Paginator @page="emit('page', $event)" />
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
.comment-manager {
    display: grid;
    row-gap: 26px;

    &__content {
        display: grid;
        row-gap: 18px;
    }

    &__header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        flex-wrap: wrap;
        row-gap: 14px;

        &__title {
            font-family: var(--font-family-bold);
            font-size: 16px;
        }
    
        &__actions {
            display: flex;
            column-gap: 26px;
    
            &--active {
                color: var(--color-white) !important;
            }
    
            &--button {
                width: 211px;
            }
        }
    }

    &__paginator {
        display: flex;
        justify-content: center;
        margin-top: 26px;
    }
}

.comment {
    &__card {
        border: 1px;
        border-style: solid;
        border-color: rgba(var(--color-gray-rgb), .2);
        padding: 18px;
        border-radius: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        transition: .4;

        &:hover {
            background-color: rgba(var(--color-primary-rgb), .1);
            transition: .4;
            cursor: pointer;

            .comment__card--actions {
                display: flex;
                transition: .4;
            }
        }

        &--avatar {
            width: 47px;
            height: 47px;
        }

        &--info {
            h4 {
                font-size: 18px;
                font-family: var(--font-family-bold);
            }

            span {
                font-size: 14px;
                color: var(--color-secondary);
            }
        }

        &--left {
            display: flex;
            gap: 24px;
            padding: 8px 0; 
        }

        &--right {
            display: flex;
            row-gap: 18px;
            flex-direction: column;
            align-items: start;  
            width: 100%;
            transition: .4;
        }

        &--date {
            font-size: 14px;
            color: var(--color-gray);
        }

        &--actions {
            display: flex;
            gap: 12px;
            width: 100%;
            display: none;
            transition: .4;

            button {
                height: 32px;
                width: 100%;
                min-width: 120px;
                &:hover {
                    opacity: .6;
                }
            }
        }

        &--answer-link {
            display: flex;
            align-items: center;
            gap: 6px;
            margin: 12px 0;
            color: var(--color-primary);
            cursor: pointer;
            transition: .4;

            &:hover {
                opacity: .6;
            }

            svg {
                width: 23px;
                height: 23px;
            }
        }
    }
}

@media (min-width: 768px) {
    .comment {
        transition: .4;
        &__card {
            transition: .4;
            flex-wrap: nowrap;

            &--right {
                align-items: end;
                transition: .4;
                width: auto;
            }

            &--actions {
                width: auto;
                transition: .4;

                button {
                    width: 120px;
                    transition: .4;
                }
            }
        }
    }
}


</style>