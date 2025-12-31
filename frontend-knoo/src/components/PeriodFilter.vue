<script setup lang='ts'>
import { ref } from 'vue';
import { FunnelIcon } from '@heroicons/vue/24/outline'
import { format, subDays, subHours, subMonths } from 'date-fns'
import type { IPeriod } from '@/interfaces/period.interface';
import { useStore } from 'vuex';
const today = new Date()
const store = useStore()
const formatt = 'yyyy-MM-dd'

const period_list = ref<Array<IPeriod>>([
    { isSelected: true, label: "12 meses", id: 1, value: { initial_date: format(subMonths(today, 12), formatt), finish_date: format(today, formatt) } },
    { isSelected: false, label: '30 dias', id: 2, value: { initial_date: format(subDays(today, 30), formatt), finish_date: format(today, formatt) } },
    { isSelected: false, label: '7 dias', id: 3, value: { initial_date: format(subDays(today, 7), formatt), finish_date: format(today, formatt) } },
    { isSelected: false, label: '24 horas', id: 4 ,value: { initial_date: format(subHours(today, 24), formatt), finish_date: format(today, formatt) } },
])

const onToggleTimeFilter = ({ value, id }: IPeriod) => {
    
    const selected = period_list.value.find(period => period.isSelected)

    if(selected && selected.id !== id) on_get_dashboard_filtered(value)
    
    period_list.value.map(period => {
        period.isSelected = false

        if(period.id === id) period.isSelected = true
    })
}

const on_get_dashboard_filtered = (filters: { initial_date: string, finish_date: string } | string) => {
if(typeof filters !== 'string'){
    // isCustomDate.value = false
    store.commit('dashboard/SET_FILTERS', filters)
    store.dispatch('dashboard/on_get_dashboard_filtered')
    return
}

// isCustomDate.value = true
}
</script>

<template>
    <div class="period-filter">
        <div class="period-filter__times">
            <span @click="onToggleTimeFilter(period)" :class="{ 'period-filter__times--is-selected': period.isSelected }" v-for="period in period_list">{{period.label}}</span>
        </div>
        <div class="period-filter__selection">
            <FunnelIcon />
            Filtros
        </div>
    </div>
</template>

<style lang="scss" scoped>
.period-filter {
    display: flex;
    gap: 6px;

    &__times {
        display: flex;
        list-style: none;
        border-radius: 6px;
        border: 1px solid #EBEBEB;
        background: #F6F6F6;
        align-items: center;
        height: 36px;
        gap: 30px;
        
        &--is-selected {
            background-color: #fff;
            height: 30px;
            justify-content: center;
            border-radius: 6px;
            margin: 2px 0;
            
            color: #201E24 !important;
            display: flex;
            align-items: center;
        }

        span {
            padding: 10px;
            color: #8E8E8E;
        }
    }
    &__selection {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;

        svg {
            width: 16px;
            height: 16px;
            color: #8E8E8E;
        }
    }
}
</style>