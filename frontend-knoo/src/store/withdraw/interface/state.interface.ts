import type { IPagination } from '@/interfaces/pagination.interface'
import type { IAccount } from './account.interface'
import type { IHistory } from './withdraw.interface'

export interface IWithdrawState {
    isLoading: boolean
    rowLength: number
    isLoadingAccountBank: boolean
    isLoadingHistory: boolean
    isWithdrawInfoLoading: boolean
    isLoadingAddAccount: boolean
    isRequestLoading: boolean
    history: Array<IHistory>
    accounts: Array<IAccount>
    history_pagination: IPagination | null
}