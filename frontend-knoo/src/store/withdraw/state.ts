import type { IWithdrawState } from './interface/state.interface'

export const withdraw_state: IWithdrawState = {
    isLoading: false,
    isLoadingAccountBank: false,
    isRequestLoading: false,
    isWithdrawInfoLoading: false,
    isLoadingHistory: false,
    isLoadingAddAccount: false,
    rowLength: 10,
    history_pagination: null,
    history: [
        // { date: '2023-12-21T00:00:00.0000', price: 23567.87, account: 'Nubank - 0000', status: 'efetivado' },
        // { date: '2023-12-21T00:00:00.0000', price: 23567.87, account: 'Nubank - 0000', status: 'efetivado' },
        // { date: '2023-12-21T00:00:00.0000', price: 23567.87, account: 'Nubank - 0000', status: 'efetivado' },
    ],
    accounts: []
}