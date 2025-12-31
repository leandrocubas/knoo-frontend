<script setup lang="ts">
import Filter from '@/components/icons/Filter.vue'
import PageTitle from '@/components/PageTitle.vue'
import Dialog from '@/components/Dialog.vue'
import { useSideMenu } from '@/composables/useSideMenu'
import { ref } from 'vue'
import { format, subDays } from 'date-fns'
import { useProfile } from '@/composables/useProfile'
import { useStore } from 'vuex'
import { Size } from '@/enums/size.enum'
import Calendar from '@/components/Calendar.vue'

const { isDashActive } = useSideMenu()
const { loggedUser } = useProfile()
const store = useStore()

const isMobileFilterOpen = ref(false)

const toggle_filter = () => {
    isMobileFilterOpen.value = !isMobileFilterOpen.value
}

const today = new Date()
const formatt = 'yyyy-MM-dd'
const isCustomDate = ref(false)

const period_list = [
    { label: "Apenas hoje", value: null },
    { label: 'Últimos 7 dias', value: { initial_date: format(subDays(today, 7), formatt), finish_date: format(today, formatt) } },
    { label: 'Últimos 15 dias', value: { initial_date: format(subDays(today, 15), formatt), finish_date: format(today, formatt) } },
    { label: 'Últimos 30 dias', value: { initial_date: format(subDays(today, 30), formatt), finish_date: format(today, formatt) } },
    { label: 'Desde o início', value: { initial_date: loggedUser.value ? format(loggedUser.value.created_at, formatt) : '', finish_date: format(today, formatt) } },
    { label: 'Personalizar', value: 'custom' }
]


const on_get_dashboard_filtered = (filters: { initial_date: string, finish_date: string } | string | null) => {
    store.commit('dashboard/SET_FILTERS', filters)
    store.dispatch('dashboard/on_get_dashboard_filtered')
    
    isCustomDate.value = !isCustomDate.value
}

const on_get_dashboard = (filters: { initial_date: string, finish_date: string } | string | null) => {
    toggle_filter()
    if(!filters){
        store.dispatch('dashboard/on_get_dashboard')
        return
    }

    if(typeof filters !== 'string'){
        isCustomDate.value = false
        store.commit('dashboard/SET_FILTERS', filters)
        store.dispatch('dashboard/on_get_dashboard_filtered')
        return
    }

    isCustomDate.value = true
}

</script>
<template>
    <div class="sub-header">
        <h1><PageTitle /></h1>

        <div  class="sub-header__filter" @click="toggle_filter" v-if="isDashActive">
            <Filter />
            <span>Filtrar</span>
        </div>

        <Dialog
            title="Filtrar"
            :size="Size.SMALL"
            @opened="isCustomDate = !isCustomDate"
            :open="isCustomDate">
            <section class="custom-date">
                <Calendar @selected="on_get_dashboard_filtered" />
            </section>
            
        </Dialog>

        <Dialog
            :border="true"
            title="Filtrar"
            @opened="toggle_filter"
            :open="isMobileFilterOpen">
            <div>
                <label>Periodo</label>

                <ul class="list">
                    <li
                        class="list__item"
                        @click="on_get_dashboard(item.value)"
                        v-for="(item, index) in period_list" :key="index">
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped>
.sub-header {
    display: flex;
    grid-area: subheader;
    justify-content: space-between;

    &__filter {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        position: relative;

        > span {
            color: var(--color-primary);
            font-weight: 600;
        }
    }
}

.list {
    top: 100%;
    left: 0;
    width: 100%;
    padding: 17px 19px;
    display: grid;
    background-color: var(--color-popups);
    border-radius: 16px;
    min-width: 180px;
    
    &__item {
        list-style-type: none;
        text-align: center;
        cursor: pointer;

        &:first-child {
            padding-bottom: 15px;
        }

        &:last-child {
            padding-top: 15px;
        }

        &:not(:last-child) {
            border-bottom: 1px solid var(--color-gray);
        }

        &:not(:first-child):not(:last-child) {
            padding: 15px 0;
        }
    }
}
</style>