<script setup lang="ts">
import { useSideMenu } from '@/composables/useSideMenu'
import Logo from '@/components/Logo.vue'
import Close from '@/components/icons/Close.vue'
import Product from '@/components/icons/Product.vue'
import Rings from '@/components/icons/Rings.vue'
import Money from '@/components/icons/Money.vue'
import Offer from '@/components/icons/Offer.vue'
import Wallet from '@/components/icons/Wallet.vue'
import Video from '@/components/icons/Video.vue'

const {
    isOpened,
    toggleSideMenu,
    isDashActive,
    isProductActive,
    isOfferActive,
    isSalesRecoveryActive,
    isMembersAreaActive,
    isWithdrawActive,
} = useSideMenu()
</script>

<template>
    <Transition name="slide">
        <div class="mobile-menu" v-if="isOpened">
            <div class="mobile-menu--menu">
                <div  class="mobile-menu--menu__header">
                    <Logo width="7rem" />

                    <Close @click="toggleSideMenu(!isOpened)" />
                </div>

                <div class="mobile-menu__links">
                    <RouterLink
                        @click="toggleSideMenu(!isOpened)"
                        :class="{ 'mobile-menu--active': isDashActive }"
                        to="/dashboard">
                        <Rings :color="isDashActive ? 'var(--color-primary)' : ''" />Dashboard</RouterLink>

                    <RouterLink
                        @click="toggleSideMenu(!isOpened)"
                        :class="{ 'mobile-menu--active': isProductActive }"
                        to="/produtos">
                        <Product :color="isProductActive ? 'var(--color-primary)' : ''" />Produtos</RouterLink>

                    <RouterLink 
                        @click="toggleSideMenu(!isOpened)"
                        :class="{ 'mobile-menu--active': isOfferActive }"
                        to="/ofertas">
                        <Offer :color="isOfferActive ? 'var(--color-primary)' : ''" />Ofertas</RouterLink>

                    <RouterLink
                        @click="toggleSideMenu(!isOpened)"
                        :class="{ 'mobile-menu--active': isSalesRecoveryActive }"
                        to="/recuperacao-de-vendas">
                        <Money :color="isSalesRecoveryActive ? 'var(--color-primary)' : ''" />Vendas
                    </RouterLink>

                    <RouterLink
                        @click="toggleSideMenu(!isOpened)"
                        :class="{ 'mobile-menu--active': isMembersAreaActive }"
                        to="/area-de-membros">
                        <Video :color="isMembersAreaActive ? 'var(--color-primary)' : ''" />Área de memb.
                    </RouterLink>

                    <RouterLink
                        @click="toggleSideMenu(!isOpened)"
                        :class="{ 'mobile-menu--active': isWithdrawActive }"
                        to="/saque">
                        <Wallet :color="isWithdrawActive ? 'var(--color-primary)' : ''" />Saque</RouterLink>
                </div>

            </div>

        </div>
    </Transition>
    <div v-if="isOpened" class="mobile-menu--backdrop" @click="toggleSideMenu(!isOpened)"></div>
</template>

<style lang="scss" scoped>
@import url('@/assets/slide-left-to-right.scss');

.mobile-menu {
    display: grid;
    position: fixed;
    left: 0;
    top: 0;
    width: 224px;
    height: 100vh;
    z-index: 3;

    &--active {
        color: var(--color-white);
        font-weight: 600;
    }
    

    &--menu {
        background-color: #231419;
        padding: 51px 18px 0 25px;
        display: flex;
        flex-direction: column;
        row-gap: 30px;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 10px;

            &--close {
                cursor: pointer;
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
        background-color: rgb(var(--color-backdrop-rgb), .8);
    }

    &__links {
        display: flex;
        flex-direction: column;
        gap: 20px;

        > a {
            display: flex;
            gap: 10px;
        } 
    }
}
</style>