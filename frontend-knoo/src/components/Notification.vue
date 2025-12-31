<script setup lang="ts">
import Bell from '@/components/icons/Bell.vue'
import { useNotifications } from '@/composables/useNotification'
import Notify from '@/components/Notify.vue'

const {
    isOpened,
    toggle,
    notifications
} = useNotifications() 


</script>

<template>

    <section class="notification">
        <div class="notification__bell" @click="toggle">
            <Bell />
        </div>
        <Transition>
            <div class="notification__messages" v-if="isOpened">
                <div class="notification__messages__header">
                    <label class="notification__messages__header--title">Notificações</label>
                    <span class="notification__messages__header--all-read">Marcar todas como lidas</span>
                </div>

                <div class="notification__messages--notify">
                    <Notify v-for="(notify) in notifications" :data="notify" />
                </div>
            </div>
        </Transition>

        <div v-if="isOpened" @click="toggle" class="notification--backdrop"></div>
    </section>

</template>

<style lang="scss" scoped>
.notification {
    position: relative;
    display: inline-block;

    &__bell {
    }

    &__messages {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 10;
        border: none;
        border-radius: 20px;
        padding: 21px 17px;
        background-color: var(--color-white);
        width: 408px;
        display: grid;
        gap: 27px;

        &__header {
            display: flex;
            justify-content: space-between;
            &--title {
                color: var(--color-white);
                font-size: 14px;
                font-family: var(--font-family-bold);
            }

            &--all-read {
                font-size: 12px;
                color: var(--color-gray-100);
                cursor: pointer;
            }
        }

        &--notify {
            display: grid;
            gap: 18px;
            max-height: 420px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--color-primary) transparent;
              
            .notify {
                &:not(:last-child){
                    border-bottom: 1px solid var(--color-gray);
                }
            }
        }

    }

    &--backdrop {
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 2;
        position: fixed;
        background-color: rgb(var(--color-backdrop-rgb), .2);
    }
}
</style>