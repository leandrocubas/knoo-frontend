<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'

// Define props recebendo os valores de venda
interface SalesData {
  total_pix_sales: number;
  total_card_sales: number;
  total_billet_sales: number;
  total_orderbump_sales: number;
}

const props = defineProps<{
  data: SalesData
}>()

const getTooltipStyle = (): string => `
    color: var(--color-white);
    padding: 10px;
    font-family: var(--font-family-bold);
    background: var(--color-primary);
    position: relative;
`

const options = {
    series: [0, 0, 0, 0], // Inicializamos com 0, pois vamos atualizar com base na prop
    labels: ['Cartão', 'Pix', 'Boleto', 'Orderbumps'],
    chart: {
        height: 239,
        type: 'donut',
        toolbar: {
            show: false
        }
    },
    stroke: {
        width: 0
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        custom: ({ series, seriesIndex, w }: any) => {
            return `<div style="${getTooltipStyle()}">
                        <span>${w.config.labels[seriesIndex]}: ${series[seriesIndex]} vendas</span>
                    </div>`
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
    }],
    grid: {
        show: false
    },
    colors: ['#EE135B', '#FF5D8B', '#8B0B35', '#FFFFFF',],
    plotOptions: {
        pie: {
            donut: {
                size: '90%'
            }
        }
    },
    legend: {
        show: false
    },
};

const pieChart = ref()

// Atualiza os dados no gráfico quando o componente for montado
onMounted(() => {
    const chart = new ApexCharts(pieChart.value, options)
    chart.render()

    // Atualiza as séries com base nas props
    chart.updateSeries([
      props.data.total_card_sales,
      props.data.total_pix_sales,
      props.data.total_billet_sales,
      props.data.total_orderbump_sales
    ])
})

// Também reativa as séries quando a prop "data" mudar
watch(() => props.data, (newData) => {
    if (pieChart.value) {
        const chart = new ApexCharts(pieChart.value, options)
        chart.updateSeries([
          newData.total_card_sales,
          newData.total_pix_sales,
          newData.total_billet_sales,
          newData.total_orderbump_sales
        ])
    }
}, { immediate: true })

</script>

<template>
    <div class="pie-chart" ref="pieChart"></div>
</template>

<style scoped lang="scss">
.pie-chart {
    display: flex;
    justify-content: center;
}
</style>
