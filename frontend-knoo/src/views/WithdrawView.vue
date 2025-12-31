<script setup lang="ts">
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import Table from '@/components/Table.vue'
import Chip from '@/components/Chip.vue'
import ListMobile from '@/components/ListMobile.vue'
import Column from '@/components/Column.vue'
import Dialog from '@/components/Dialog.vue'
import Alert from '@/components/Alert.vue'
import Toggle from '@/components/Toggle.vue'
import Input from '@/components/Input.vue'
import Spinner from '@/components/Spinner.vue'
import Pencil from '@/components/icons/Pencil.vue'
import AddNewAccountView from '@/views/AddNewAccountView.vue'
import { useWithdraw } from '@/composables/useWithdraw'
import { useUtils } from '@/composables/useUtils'
import { computed, onMounted } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { Size } from '@/enums/size.enum'
import { StatusEnum } from '@/enums/status.enum'
import GhostLoading from '@/components/GhostLoading.vue'

const { isMobile, formatMoney } = useUtils()

const {
    headers,
    withdrawHistory,
    withdrawHistorMobile,
    headersMobile,
    pagination_history,
    isNewWithdrawOpen,
    isNewAccountBankOpen,
    accountBankHeaders,
    accounts,
    isAddingNewAccount,
    amount,
    isRequestLoading,
    withdrawComp,
    totalComp,
    pendingComp,
    isWithdrawInfoLoading,
    isLoadingHistory,
    isLoadingAccountBank,
    accounts_pagination,
    logged_user,
    toggleWithdraw,
    requestWithdraw,
    addAccountBank,
    goToNewAccount,
    toggleAddingNewAccount,
    onDelete,
    toggleStatus,
    requestWithdrawInfos,
    getHistory
} = useWithdraw()

onMounted(() => {
    getHistory()
})

requestWithdrawInfos()

</script>

<template>
    <section class="withdraw">
        <Column gap="30px">
            <Alert></Alert>
            <div class="withdraw__cards">
                <Card :cursor-animate="true">
                    <div class="withdraw__cards--content">
                        <Column gap="10px">
                            <label class="withdraw__cards--content--text">Saque</label>
                            <h1 class="withdraw__cards--content--value-success" v-if="!isWithdrawInfoLoading">{{ withdrawComp }}</h1>
                            <GhostLoading :height="40" :width="80" v-else/>
                        </Column>
                    </div>
                </Card>
                <Card :cursor-animate="true" >
                    <div class="withdraw__card-content">
                        <Column gap="10px">
                            <label class="withdraw__card-content--text">Pendente</label>
                            <h1 class="withdraw__cards--content--value-pending" v-if="!isWithdrawInfoLoading">{{ pendingComp }}</h1>
                            <GhostLoading :height="40" :width="80" v-else/>
                        </Column>
                    </div>
                </Card>

                <Card :cursor-animate="true" >
                    <div class="withdraw__card-content">
                        <Column gap="10px">
                            <label class="withdraw__card-content--text">Total</label>
                            <h1 class="withdraw__cards--content--value" v-if="!isWithdrawInfoLoading">{{ totalComp }}</h1>
                            <GhostLoading :height="40" :width="80" v-else/>
                        </Column>
                    </div>
                </Card>
                
            </div>
            <div class="withdraw__subtitle">
                <p class="withdraw__subtitle__message">Histórico de saques</p>

                <div class="withdraw__subtitle__actions">
                    <Button type="secondary" @click="addAccountBank">Contas bancárias</Button>
                    <Button @click="toggleWithdraw">+Novo saque</Button>
                </div>
            </div>

            <div class="withdraw__table">
                <Table
                    v-if="!isMobile"
                    :headers
                    @page="getHistory($event)"
                    :rows="withdrawHistory"
                    :pagination="pagination_history"
                    :isLoading="isLoadingHistory">
                    <template #actions="{ row }">
                        <Chip v-if="row.status === 'pending' || row.status === 'approved_effect' " :type="StatusEnum.WARNING">Pendente</Chip>
                        <Chip v-if="row.status === 'rejected' " :type="StatusEnum.ERROR">Rejeitado</Chip>
                        <Chip v-if="row.status === 'effected' " :type="StatusEnum.SUCCESS">Efetuado</Chip>
                    </template>
                </Table>

                <ListMobile
                    :headers="headersMobile"
                    :rows="withdrawHistorMobile"
                    v-else>
                    <template #actions="{ row }">
                        <Chip v-if="row.status === 'pending' || row.status === 'approved_effect' " :type="StatusEnum.WARNING">Pendente</Chip>
                        <Chip v-if="row.status === 'rejected' " :type="StatusEnum.ERROR">Rejeitado</Chip>
                        <Chip v-if="row.status === 'effected' " :type="StatusEnum.SUCCESS">Efetuado</Chip>
                    </template>
                </ListMobile>
            </div>
        </Column>

        <Dialog
            title="Novo saque"
            @opened="toggleWithdraw"
            :open="isNewWithdrawOpen">
            <div class="withdraw__dialog__new">
                <!-- <div class="withdraw__dialog__new__account">
                    <span class="withdraw__dialog__new__account--label">Conta ativa: </span>
                    <span class=withdraw__dialog__new__account--number>Nubank 000000</span>
                    <Pencil color="var(--color-primary)" />
                </div> -->

                <Input v-model="amount" type="money" label="Valor do saque" />

                <div class="withdraw__dialog__new__account__available">
                    <span>Disponível:</span>
                    <span class="withdraw__dialog__new__account__available--value">{{ withdrawComp }}</span>
                </div>

                <div class="withdraw__dialog__new__account__tax">
                    <span>*Taxa de {{logged_user?.withdrawal_tax}} a cada saque. Prazo de até {{1}} dia útil.</span>
                </div>
            </div>
            <div class="withdraw__dialog__footer">
                <div class="withdraw__dialog__footer--cancel-button">
                    <span @click="toggleWithdraw">Cancelar</span>
                </div>
                <div class="withdraw__dialog__footer--confirm-button">
                    <Button :is-loading="isRequestLoading" type="success" @click="requestWithdraw">Solicitar saque</Button>
                </div>
            </div>
        </Dialog>

        <Dialog
            title="Contas bancárias"
            class="bank-accounts"
            :size="Size.XLARGE"
            @opened="addAccountBank"
            :open="isNewAccountBankOpen">
            <div class="bank-accounts__content">
                <Transition>
                    <Table
                        :headers="accountBankHeaders"
                        :rows="accounts"
                        :pagination="accounts_pagination"
                        :isLoading="isLoadingAccountBank">
                        <template #component="{ row }">
                            <Chip v-if="row.status === 'analysis' " :type="StatusEnum.WARNING">Em análise</Chip>
                            <Chip v-if="row.status === 'reproved' " :type="StatusEnum.ERROR">Reprovado</Chip>
                            <Chip v-if="row.status === 'approved' " :type="StatusEnum.SUCCESS">Aprovado</Chip>
                        </template>
    
                        <template #component2="{ row }">
                            <Toggle @toggle="toggleStatus(row)" v-model="row.is_active" />
                        </template>
    
                        <template #actions="{ row }">
                            <TrashIcon v-if="!row.is_loading" @click="onDelete(row)" class="bank-accounts__content--delete" />
                            <Spinner :size="20" v-else />
                        </template>
                    </Table>
                </Transition>
            </div>
            <div class="bank-accounts__footer" v-if="!isLoadingAccountBank">
                <div class="bank-accounts__footer--confirm-button">
                    <Button @click="goToNewAccount">+Nova conta</Button>
                </div>
            </div>
        </Dialog>

        <AddNewAccountView @closed="toggleAddingNewAccount" v-if="isAddingNewAccount" />
    </section>
</template>

<style lang="scss" scoped>
.withdraw {
    &__cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .card {
            flex: 0 0 calc(34% - 25px) !important
        }

        &--content {
            display: grid;

            &--text {
                font-size: 16px;
            }

            &--value {
                font-size: 24px;
                font-family: var(--font-family-bold);
                font-weight: normal;
                color: var(--color-black);
            }

            &--value-success {
                font-size: 24px;
                font-family: var(--font-family-bold);
                font-weight: normal;
                color: var(--color-success);
            }

            &--value-pending {
                font-size: 24px;
                font-family: var(--font-family-bold);
                color: var(--color-primary);
            }
        }
    }

    &__subtitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
        row-gap: 20px;

        &__message {
            font-family: var(--font-family-bold);
            font-size: 16px;
        }

        &__actions {
            display: flex;
            column-gap: 20px;
            width: 30%;
            min-width: 20rem;
        }
    }

    &__table {

    }

    &__dialog {
        &__new {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            &__account {
                width: 256px;
                height: 38px;
                background-color: rgba(113, 95, 100, .2);
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                border-radius: 10px;
                padding: 2px 8px;

                &--label {
                    font-family: var(--font-family-bold);
                    font-size: 12px;
                }

                &--number {
                    font-size: 12px;
                    color: var(--color-primary);
                }

                &__available {
                    display: flex;
                    gap: 6px;

                    &--value {
                        color: var(--color-success);
                    }
                
                }
                &__tax {
                    color: var(--color-gray-100);
                }
            }
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &--cancel-button {
                flex-grow: 1;
                color: var(--color-gray-100);
                cursor: pointer;
            }

            &--confirm-button {
                flex-grow: .6;
                max-width: 250px;
            }

        }
    }

}

.bank-accounts {
    &__content {
        &--edit {
            height: 23px;
            width: 23px;
            cursor: pointer;
        }

        &--delete {
            height: 23px;
            width: 23px;
            color: var(--color-error);
            cursor: pointer;
        }
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        &--confirm-button {
            flex-grow: .6;
            max-width: 250px;
        }

    }
}

@media only screen and (min-width: 200px) and (max-width: 1300px) and (min-height: 200px) {
    .withdraw {
        &__cards {
            display: flex;
            flex-wrap: wrap;
            .card {
                flex: 1 !important;
            }
        }


        &__graphs {
            flex-wrap: wrap;
            &--graph {
                width: 30%;
            }
        }
    }
}

@media only screen and (min-width: 200px) and (max-width: 754px) {
    .withdraw {
        height: 100vh;

        &__cards {
            display: flex;
            flex-wrap: wrap;

            .card {
                flex: 0 0 100% !important;
            }
        }
    }
}

@media only screen and (max-width: 320px) {
    .withdraw {
        height: 100vh;

        &__cards {
            display: flex;
            flex-wrap: wrap;

            .card {
                flex: 0 0 100% !important;
            }
        }

        &__subtitle {
    
            &__actions {
                min-width: 18rem !important;
                row-gap: 20px;;
                flex-wrap: wrap !important;
            }
        }
    }
}
@media only screen and (min-width: 2080px) {
    .withdraw {

        &__cards {
            display: flex;

            .card {
                display: flex;
                flex: 1 !important;
            }
        }
    }
}
</style>