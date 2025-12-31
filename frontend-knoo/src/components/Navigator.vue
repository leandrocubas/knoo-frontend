<script setup lang="ts">

import { onMounted } from 'vue'
import { useCheckout } from '@/composables/useCheckout'

const { togglePreviewMode } = useCheckout(onMounted, false)

defineProps({
    slideOut: {
        type: Boolean,
        default: false
    },
    backgroundColor: {
        type: String,
        default: '#000'
    }
})
</script>

<template>
    <div class="navigator" :class="{ 'animate__animated animate__backInRight': !slideOut  }">
        <div class="navigator__header">
            <div class="navigator__header__buttons">
                <div class="navigator__header__buttons--close" @click="togglePreviewMode">x</div>
                <div class="navigator__header__buttons--minimize">o</div>
                <div class="navigator__header__buttons--maximize">o</div>
            </div>
            <div class="navigator__header__search-bar">
                <span></span>
            </div>
        </div>
        <div class="navigator__content" :style="{ backgroundColor, 'scrollbar-color': `${'var(--color-primary)'} transparent` }">
            <slot/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigator {
    width: 70%;
    border-radius: 6px;
    position: absolute;
    min-width: 40rem;

    &__header {
        display: flex;
        height: 60px;
        background-color: #E6E6E6;
        padding: 10px;
        gap: 14px;
        border-radius: 6px 6px 0px 0px;
        &__buttons {
            width: 8%;
            display: flex;
            align-items: center;
            gap: 12%;
            justify-content: center;

            &--close {
                background-color: #ED6A5D;
                color: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                border-radius: 100%;
                height: 14px;
                width: 14px;

                &:hover {
                    color: #AA3D32;
                    font-weight: 600;
                }
            }

            &--minimize {
                background-color: #F5C250;
                color: transparent;
                border-radius: 100%;
                height: 14px;
                width: 14px;
            }

            &--maximize {
                background-color: #62C755;
                color: transparent;
                border-radius: 100%;
                height: 14px;
                width: 14px;
            }
        }

        &__search-bar {
            display: flex;
            align-items: center;
            width: 100%;

            > span {
                width: 100%;
                background-color: var(--color-white);
                height: 30px;
                border-radius: 6px;
            }
        }
    }

    &__content {
        overflow-y: auto;
        padding: 14px;
        display: flex;
        justify-content: center;
        height: 100%;
        border-radius: 0px 0px 6px 6px;
        scrollbar-width: thin;
    }
}
</style>