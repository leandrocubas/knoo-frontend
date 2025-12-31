import type { IPagination } from '@/interfaces/pagination.interface'
import type { IAccount } from './interface/account.interface'
import type { IWithdrawState } from './interface/state.interface'
import type { IHistory } from './interface/withdraw.interface'


export const getters = {
    isLoading: (state: IWithdrawState): boolean | null => state.isLoading,
    isRequestLoading: (state: IWithdrawState): boolean | null => state.isRequestLoading,
    isWithdrawInfoLoading: (state: IWithdrawState): boolean | null => state.isWithdrawInfoLoading,
    isLoadingHistory: (state: IWithdrawState): boolean | null => state.isLoadingHistory,
    isLoadingAddAccount: (state: IWithdrawState): boolean | null => state.isLoadingAddAccount,
    isLoadingAccountBank: (state: IWithdrawState): boolean | null => state.isLoadingAccountBank,
    pagination_history: (state: IWithdrawState): IPagination | null => state.history_pagination,
    history: (state: IWithdrawState): Array<IHistory> | null => state.history,
    accounts: (state: IWithdrawState): Array<IAccount> | null => state.accounts,
    rowLength: (state: IWithdrawState): number => state.rowLength,
}