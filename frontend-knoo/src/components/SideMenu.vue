<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSideMenu } from '@/composables/useSideMenu'

import Logo from '@/components/Logo.vue'
import Product from '@/components/icons/Product.vue'
import Rings from '@/components/icons/Rings.vue'
import Money from '@/components/icons/Money.vue'
import Offer from '@/components/icons/Offer.vue'
import Wallet from '@/components/icons/Wallet.vue'
import Video from '@/components/icons/Video.vue'

const { 
    isDashActive,
    isProductActive,
    isOfferActive,
    isSalesRecoveryActive,
    isMembersAreaActive,
    isWithdrawActive,
} = useSideMenu()
</script>

<template>
    <aside class="side-menu">
        <Logo width="8vmax" />

        <div class="side-menu__links">
            <RouterLink
                :class="{ 'side-menu--active': isDashActive }"
                to="/dashboard">
                <Rings :color="isDashActive ? 'var(--color-primary)' : ''" />Dashboard</RouterLink>

            <RouterLink
                :class="{ 'side-menu--active': isProductActive }"
                to="/produtos">
                <Product :color="isProductActive ? 'var(--color-primary)' : ''" />Produtos</RouterLink>

            <RouterLink 
                :class="{ 'side-menu--active': isOfferActive }"
                to="/ofertas">
                <Offer :color="isOfferActive ? 'var(--color-primary)' : ''" />Ofertas</RouterLink>

            <RouterLink
                :class="{ 'side-menu--active': isSalesRecoveryActive }"
                to="/recuperacao-de-vendas">
                <Money :color="isSalesRecoveryActive ? 'var(--color-primary)' : ''" />Vendas
            </RouterLink>

            <RouterLink
                :class="{ 'side-menu--active': isMembersAreaActive }"
                to="/area-de-membros">
                <Video :color="isMembersAreaActive ? 'var(--color-primary)' : ''" />Área de memb.
            </RouterLink>

            <RouterLink
                :class="{ 'side-menu--active': isWithdrawActive }"
                to="/saque">
                <Wallet :color="isWithdrawActive ? 'var(--color-primary)' : ''" />Saque</RouterLink>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
.side-menu {
    grid-area: menu;
    border: 1px solid var(--color-primary);
    border-radius: var(--border-radius);
    background-color: rgba(var(--color-black-rgb), .05);
    padding: 10px;
    display: grid;
    justify-content: center;
    grid-template-rows: 14%;
    gap: 25px;
    height: 92vh;
    position: absolute;
    max-height: 44rem;

    &--active {
        color: var(--color-white);
        font-weight: 600;
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