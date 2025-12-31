<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import Header from '@/components/Header.vue'
import Subheader from '@/components/Subheader.vue'
import SideMenuMobile from '@/components/SideMenuMobile.vue'
import { RouterView } from 'vue-router'
import { useProfile } from '@/composables/useProfile'
import { onMounted } from 'vue'

const { getLoggedUser } = useProfile()

onMounted(() => {
    getLoggedUser()
})
</script>

<template>
    <main class="home">
        <!-- <SideMenu class="home__side-menu" /> -->
        <!-- <SideMenuMobile/> -->

        <!-- <Subheader class="home__sub-header" /> -->
        
        <Header />
        <section class="home__main">
            <RouterView />
        </section>
    </main>

</template>

<style lang="scss" scoped>
.home {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-areas:
            'header header header'
            'main main main'
            'main main main';
    
    grid-template-columns: 10vw auto auto;
    grid-template-rows: 66px auto auto;
    column-gap: 50px;
    padding: 16px 22px;
    row-gap: 18px;
    justify-content: center;

    &__sub-header {
        display: none;
    }


    &__main {
        display: flex;
        grid-area: main;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        scrollbar-color: var(--color-primary) transparent;
        padding-right: 10px;

        justify-content: center;
        section {
            max-width: 108em;
            width: 100vw;
        }

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: var(--color-transparent);
        }

        &::-webkit-scrollbar-thumb {
            background: var(--color-primary);
            border-radius: 20px;
        }
    }

    &__mobile-menu {
        display: none;
    }
}

  
@media only screen 
    and (min-width: 200px) 
    and (max-width: 1300px) 
    and (min-height: 200px) {

    .home {
        padding: 15px;

        &__side-menu {
            display: none;
        }

        grid-template-areas:
            'header header header'
            'subheader subheader subheader'
            'main main main';
            grid-template-rows: 66px 3em;

            &__sub-header {
                display: flex;
            }
    }
}
</style>