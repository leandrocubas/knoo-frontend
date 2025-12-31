<script setup lang="ts">
import ApexCharts from 'apexcharts'
import { computed, onMounted, ref, toValue, watch } from 'vue'

import { useUtils } from '@/composables/useUtils'
import { useStore } from 'vuex'
import type { IDashboard } from '@/interfaces/dashboard.interface'

const { formatMoney } = useUtils()
const store = useStore()
const dashboard = computed<IDashboard>(() => store.getters['dashboard/dashboard'])

watch(dashboard, () => {
    options.series[0].data = dashboard.value.graphics.sales_period_graphic.data
    options.xaxis.categories = dashboard.value.graphics.sales_period_graphic.categories

    new ApexCharts(toValue(areaChart), options).render()
})

const getTooltipStyle = (): string => `
    color: var(--color-white);
    padding: 10px;
    font-family: var(--font-family-bold);
    background: var(--color-primary);
    position: relative;
`

let options = {
    series: [
        {
            name: 'value1',
            data: dashboard.value.graphics.sales_period_graphic.data,
            color: "var(--color-primary)",
            zIndex: 1
        },
    ],
    chart: {
        height: 202,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        curve: 'smooth'
    },
    xaxis: {
        type: 'category',
        categories: dashboard.value.graphics.sales_period_graphic.categories,
        labels: {
            style: {
                fontSize: 12,
                fontFamily: 'var(--font-family)'
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    legend: {
        show: false
    },
    grid: {
        show: false
    },
    fill: {
        colors: undefined,
        opacity: .1,
        type: 'gradient',

        gradient: {
            shade: 'light',
            shadeIntensity: 0,
        }
    },
    tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex }: any) => {
            return (
                `<div style="${getTooltipStyle()}">
                    <span>${formatMoney(series[seriesIndex][dataPointIndex])}</span>
                </div>`
            )
        },
    },
}

const areaChart = ref()
onMounted(() => new ApexCharts(toValue(areaChart), options).render())
</script>

<template>
    <div ref="areaChart"></div>
</template>