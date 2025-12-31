<script setup lang="ts">
import { useRouter } from 'vue-router'

import Profile from '@/components/Profile.vue'
import Dialog from '@/components/Dialog.vue'
import { useSideMenu } from '@/composables/useSideMenu'
import { format, subDays } from 'date-fns'
import { useStore } from 'vuex'
import { useProfile } from '@/composables/useProfile'
import { ref } from 'vue'
import { Size } from '@/enums/size.enum'
import Knoo from '@/components/icons/Knoo.vue'
import ProgressBarStatic from '@/components/ProgressBarStatic.vue'
import { RouterLink } from 'vue-router'
import Product from '@/components/icons/Product.vue'
import Rings from '@/components/icons/Rings.vue'
import Money from '@/components/icons/Money.vue'
import Offer from '@/components/icons/Offer.vue'
import Wallet from '@/components/icons/Wallet.vue'
import Video from '@/components/icons/Video.vue'

const store = useStore()
const { loggedUser } = useProfile()

const today = new Date()
const formatt = 'yyyy-MM-dd'

const isCustomDate = ref(false)
const { replace } = useRouter()
const {
    toggleSideMenu,
    isOpened,
    isDashActive,
    isProductActive,
    isOfferActive,
    isSalesRecoveryActive,
    isMembersAreaActive,
    isWithdrawActive,
    isCupomActive,
} = useSideMenu()
const on_get_dashboard_filtered = (filters: { initial_date: string, finish_date: string } | string) => {

    if(typeof filters !== 'string'){
        isCustomDate.value = false
        store.commit('dashboard/SET_FILTERS', filters)
        store.dispatch('dashboard/on_get_dashboard_filtered')
        return
    }

    isCustomDate.value = true
}

const period_list = [
    { label: "Apenas hoje", value: null },
    { label: 'Últimos 7 dias', value: { initial_date: format(subDays(today, 7), formatt), finish_date: format(today, formatt) } },
    { label: 'Últimos 15 dias', value: { initial_date: format(subDays(today, 15), formatt), finish_date: format(today, formatt) } },
    { label: 'Últimos 30 dias', value: { initial_date: format(subDays(today, 30), formatt), finish_date: format(today, formatt) } },
    { label: 'Desde o início', value: { initial_date: loggedUser.value ? format(loggedUser.value.created_at, formatt) : '', finish_date: format(today, formatt) } },
    { label: 'Personalizar', value: 'custom' }
]

const goToDashboard = (): void => {
    replace('/')
}

</script>

<template>
    <header class="header">
        
        <section class="header__left-side">
            <Knoo />
    
            <section class="header__menus">
                <div class="header__menus--option" :class="{ 'header__menus--option--active': isDashActive }">
                    <RouterLink
                        to="/dashboard">
                        <Rings color="var(--color-primary)" />Dashboard</RouterLink>
    
                        <span
                            :class="{ 'animate__animated animate__fadeIn': isDashActive}"
                            class="header__menus--option--marker" v-if="isDashActive"></span>
                </div>
                <div class="header__menus--option" :class="{ 'header__menus--option--active': isProductActive }">
                    <RouterLink
                        to="/produtos">
                        <Product color="var(--color-primary)" />Produtos</RouterLink>
                        <span
                            :class="{ 'animate__animated animate__fadeIn': isProductActive}"
                            class="header__menus--option--marker" v-if="isProductActive"></span>
                </div>
                <div class="header__menus--option" :class="{ 'header__menus--option--active': isOfferActive }">
                    <RouterLink 
                        to="/ofertas">
                        <Offer color="var(--color-primary)" />Ofertas</RouterLink>
                        <span
                            :class="{ 'animate__animated animate__fadeIn': isOfferActive}"
                            class="header__menus--option--marker" v-if="isOfferActive"></span>
                </div>
                <div class="header__menus--option" :class="{ 'header__menus--option--active': isSalesRecoveryActive }">
                    <RouterLink
                        to="/recuperacao-de-vendas">
                        <Money color="var(--color-primary)" />Vendas
                    </RouterLink>
                    <span
                        :class="{ 'animate__animated animate__fadeIn': isSalesRecoveryActive}"
                        class="header__menus--option--marker" v-if="isSalesRecoveryActive"></span>
                </div>
                <div class="header__menus--option" :class="{ 'header__menus--option--active': isMembersAreaActive }">
                    <RouterLink
                        to="/area-de-membros">
                        <Video color="var(--color-primary)" />Membros
                    </RouterLink>
                    <span
                        :class="{ 'animate__animated animate__fadeIn': isMembersAreaActive}"
                        class="header__menus--option--marker" v-if="isMembersAreaActive"></span>
                </div>
                <div class="header__menus--option" :class="{ 'side-menu--active': isWithdrawActive }">
                    <RouterLink
                        to="/saque">
                        <Wallet color="var(--color-primary)" />Carteira</RouterLink>
                        <span
                            :class="{ 'animate__animated animate__fadeIn': isWithdrawActive}"
                            class="header__menus--option--marker" v-if="isWithdrawActive"></span>
                </div>
                <div class="header__menus--option" :class="{ 'side-menu--active': isWithdrawActive }">
                    <RouterLink
                        to="/cupom">
                        <Offer color="var(--color-primary)" />Cupom
                    </RouterLink>
                        <span
                            :class="{ 'animate__animated animate__fadeIn': isCupomActive}"
                            class="header__menus--option--marker" v-if="isCupomActive"></span>
                </div>
            </section>
        </section>
        
        <section class="header__right-side">
            <div>
                <ProgressBarStatic />
            </div>

            <Profile />
        </section>
    </header>

    <Dialog
        title="Filtrar"
        :size="Size.SMALL"
        @opened="isCustomDate = !isCustomDate"
        :open="isCustomDate">
        <section class="custom-date">
            <Calendar @selected="on_get_dashboard_filtered" />
        </section>
        
    </Dialog>
    <!-- <header class="header">
        <div class="header__menu-side">
            <Hamburguer @click="toggleSideMenu(!isOpened)" color="var(--color-primary)" class="header__hamburguer" />
            <Logo class="header__logo" @click="goToDashboard" />
            <h1 class="header__menu-side--title">
                <PageTitle />
            </h1>
        </div>
        

        <div class="header__options">
            <div v-if="isDashActive">
    
                <Selectable
                    @selected_date="on_get_dashboard_filtered"
                    class="header__period-list"
                    label="Período"
                    :list="period_list" />
            </div>

            <Notification />

            <Profile />
        </div>
    </header> -->

</template>

<style lang="scss" scoped>
.header {
    grid-area: header;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(var(--color-gray-rgb), .3);
    position: relative;
    justify-content: space-between;
    gap: 32px;

    &__left-side {
        display: flex;
    }

    &__right-side {
        display: flex;
        align-items: center;
        gap: 100px;
    }

    &__menus {
        display: flex;
        gap: 20px;
        padding-left: 20px;
        &--option {
            a {
                display: flex;
                gap: 6px;
                font-size: 14px;
                font-weight: 500;
                color: #8E8E8E;
            }
            
            &--active {
                border-bottom-color: red;
                a {
                    color: #201E24;
                }
            }

            &--marker {
                width: 100px;
                height: 1px;
                background-color: var(--color-primary);
                position: absolute;
                bottom: -1px;
                transition: .3s;
            }
        }
    }

    &__hamburguer {
        display: none;
    }

    &__options {
        display: flex;
        column-gap: 40px;
        align-items: center;
        transition: .4;
    }

    &__logo {
        display: none;
        cursor: pointer;
    }

    &__menu-side {
        &--title {
            display: flex;
        }
    }
}

@media only screen 
    and (min-width: 200px)
    and (max-width: 1300px)
    and (min-height: 200px) {

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__menu-side {
            display: flex;
            align-items: center;
            column-gap: 40px;

            &--title {
                display: none;
            }
        }

        &__hamburguer {
            display: block;
            cursor: pointer;
        }

        &__options {
            display: flex;
        }

        &__period-list {
            display: none;
        }
        
        &__product-list {
            display: none;
        }

        &__logo {
            display: block;
        }
    }
}

.custom-date {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

@media only screen
    and (max-width: 320px){
        .header {
            &__options {
                column-gap: 20px;
            }
        }
    }
</style>