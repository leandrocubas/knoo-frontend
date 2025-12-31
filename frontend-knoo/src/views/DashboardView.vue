<script setup lang="ts">
import { onMounted } from 'vue'
import Alert from '@/components/Alert.vue'
import Card from '@/components/CardDash.vue'
import Info from '@/components/icons/Info.vue'
import Column from '@/components/Column.vue'
import AreaChart from '@/components/AreaChart.vue'
import { useDashboard } from '@/composables/useDashboard'
import { useUtils } from '@/composables/useUtils'
import GhostLoading from '@/components/GhostLoading.vue'
import PeriodFilter from '@/components/PeriodFilter.vue'
import { useRoute } from 'vue-router'

const {
    dashboard,
    isLoading,
    on_get_dashboard
} = useDashboard()

onMounted(() => on_get_dashboard())

const { formatMoney } = useUtils()
const route = useRoute()

</script>

<template>
    <section class="dashboard">
        <Column gap="20px">
            <Alert></Alert>
            
            <div class="dashboard__breadcrumb">
                <h1>{{route.name}}</h1>

                <div class="dashboard__filters">
                    <PeriodFilter />
                </div>
            </div>

            <div class="dashboard__cards">
                <Card
                    v-if="!isLoading"
                    font-header-color="#036C6D"
                    title="Faturamento"
                    sub-title="Receita líquida"
                    :value="dashboard.total_billed"
                    :percentage="25.9"
                    :cursor-animate="true">
                </Card>


                <Card
                    v-if="!isLoading"
                    bg-header-color="#EFE9FF"
                    font-header-color="#422692"
                    title="Vendas"
                    sub-title="Vendas confirmadas"
                    :value="5519000"
                    :percentage="-1.4"
                    :cursor-animate="true">
                </Card>
                
                <Card
                    v-if="!isLoading"
                    bg-header-color="linear-gradient(90deg, rgba(0, 208, 210, 0.10) 0%, rgba(109, 57, 255, 0.10) 100%)"
                    font-header-color="#089AC8"
                    title="Vendas no periodo"
                    :cursor-animate="true">
                    <AreaChart />
                </Card>

                <div class="dashboard__cards--second-line">
                    <Card
                        bg-header-color="#F7F7F7"
                        font-header-color="#0B1114"
                        title="Aprovação de Cartão de Crédito"
                        sub-title="Receita líquida"
                        :value="dashboard.total_card_sales"
                        :cursor-animate="true">
                    </Card>
    
                    <Card
                        bg-header-color="#F7F7F7"
                        font-header-color="#0B1114"
                        title="Aprovação de Pix"
                        sub-title="Receita líquida"
                        :value="dashboard.total_pix_sales"
                        :cursor-animate="true">
                    </Card>
    
                    <Card
                        bg-header-color="#F7F7F7"
                        font-header-color="#0B1114"
                        title="Aprovação de Boleto"
                        sub-title="Receita líquida"
                        :value="dashboard.total_billed"
                        :cursor-animate="true">
                    </Card>
    
                    <Card
                        bg-header-color="#F7F7F7"
                        font-header-color="#0B1114"
                        title="Reembolso"
                        sub-title="Por período"
                        symbol="%"
                        :value="dashboard.percentage_refund"
                        :cursor-animate="true">
                    </Card>
                </div>


                <!-- <Card :cursor-animate="true">
                    <div class="dashboard__card-content">
                        <Column gap="10px">
                            <label class="dashboard__card-content--text">Reembolso</label>
                            <h1 class="dashboard__cards--content--value-yellow" v-if="!isLoading">{{dashboard.total_refund}}%</h1>
                            <GhostLoading :height="40" :width="50" v-else/>
                        </Column>
                    </div>
                </Card> -->

                <!-- <Card :cursor-animate="true">
                    <div class="dashboard__card-content">
                        <Column gap="10px">
                            <label class="dashboard__cards--content--text">Chargeback
                                <Info messageTooltip="Compras contestadas junto à operadora do cartão." />
                            </label>
                            <h1 class="dashboard__cards--content--value-negative" v-if="!isLoading">{{dashboard.total_chargeback}}%</h1>
                            <GhostLoading :height="40" :width="50" v-else/>
                        </Column>
                    </div>
                </Card> -->
            </div>

            <!-- <div class="dashboard__cards">
                <Card
                    bg-header-color="#F7F7F7"
                    font-header-color="#0B1114"
                    title="Vendas de Orderbumps"
                    :value="dashboard.total_orderbump_sales"
                    :cursor-animate="true">
                </Card>
                
                <Card
                    bg-header-color="#F7F7F7"
                    font-header-color="#0B1114"
                    title="Vendas PIX"
                    :value="dashboard.total_pix_sales"
                    :cursor-animate="true">
                </Card>

                <Card
                    bg-header-color="#F7F7F7"
                    font-header-color="#0B1114"
                    title="Vendas Cartão"
                    :value="dashboard.total_card_sales"
                    :cursor-animate="true">
                </Card>
            </div> -->

            <!-- <div class="dashboard__cards">
                <Card
                    bg-header-color="#F7F7F7"
                    font-header-color="#0B1114"
                    title="Vendas Boleto"
                    :value="dashboard.total_billet_sales"
                    :cursor-animate="true">
                </Card>
            </div> -->
        </Column>
    </section>
</template>

<style lang="scss" scoped>
.dashboard {
    width: 100%;
    max-width: 108em;

    &__action {
        &--action {
            width: 100px;
        }
    }

    &__cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .card {
            flex: 1 1 calc(33.33% - 1rem);
        }
        
        &--second-line {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            width: 100%;
            .card {
                flex: 1 1 calc(25% - 1rem);
            }
        }

        &--content {
            display: grid;

            &--text {
                font-size: 16px;
            }

            &--data {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &--infos {
                    p {
                        font-size: 16px;
                        color: #FF5D8B;
                    }

                    span {
                        font-weight: 650;
                        color: #FFF;
                    }
                }
            }

            &--value {
                font-size: 24px;
                font-family: var(--font-family-bold);
                font-weight: normal;
                color: var(--color-success);
            }

            &--value-white {
                font-size: 24px;
                font-family: var(--font-family-bold);
                color: #FFFFFF;
            }

            &--value-yellow {
                font-size: 24px;
                font-family: var(--font-family-bold);
                color: #EA9D2B;
            }

            &--value-blue {
                font-size: 24px;
                font-family: var(--font-family-bold);
                color: #89CDFF;
            }

            &--value-negative {
                font-size: 24px;
                font-family: var(--font-family-bold);
                color: var(--color-error);
            }
        }
    }

    &__graphs {
        display: flex;
        gap: 20px;

        &--graph {
            //width: 50%;
            width: 100%;
        }
    }

    &__breadcrumb {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 24px;
        }
    }
}

.dialog-account-type {
    &__content {
        &--delete-icon {
            justify-content: center;
            display: flex;
            &--icon {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              border-radius: 100%;
              background: var(--linear-gradient-primary);

              svg {
                width: 24px;
              }
            }
        }

        &--line {
            margin-bottom: 58px;
        }

        &--title {
            flex-direction: column;
            align-items: center;
            gap: 24px;
            display: flex;
            justify-content: center;
            margin-top: 10px;
            padding-bottom: 36px;

            span {
                font-size: 14px;
                text-align: center;
            }
            label {
                font-size: 16px;
                font-family: var(--font-family-bold);
                text-align: center;
            }
        }
    }

    &__footer {
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 20px;
        border-top: 1px solid rgba(var(--color-gray-rgb), .3);
        span {
            cursor: pointer;
        }

        &--next {
            width: 182px;
        }
    }
}

@media only screen and (min-width: 200px) and (max-width: 1300px) and (min-height: 200px) {
    .dashboard {
        &__cards {
            display: flex;
            flex-wrap: wrap;
        }

        &__graphs {
            flex-wrap: wrap;
            &--graph {
                width: 100%;
            }
        }
    }
}

@media only screen and (min-width: 200px) and (max-width: 754px) {
    .dashboard {
        height: 100vh;

        &__cards {
            display: flex;
            flex-wrap: wrap;

            &--content {
                &--data {
                    flex-direction: column-reverse;
                    gap: 30px;
                    margin-top: 30px;

                    &--infos {
                        width: 100%;
                        p {
                            font-size: 16px;
                            color: #FF5D8B;
                        }
                    }
                }
            }
        }
    }
}
</style>