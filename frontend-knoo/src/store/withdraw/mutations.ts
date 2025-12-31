import type { IPagination } from '@/interfaces/pagination.interface'
import type { IAccount } from './interface/account.interface'
import type { IWithdrawState } from './interface/state.interface'
import type { IHistory } from './interface/withdraw.interface'

export const mutations = {
    SET_LOADING(state: IWithdrawState, isLoading: boolean){
        state.isLoading = isLoading
    },
    SET_LOADING_ACCOUNT_BANK(state: IWithdrawState, isLoading: boolean){
        state.isLoadingAccountBank = isLoading
    },
    SET_LOADING_HISTORY(state: IWithdrawState, isLoading: boolean){
        state.isLoadingHistory = isLoading
    },
    SET_REQUEST_LOADING(state: IWithdrawState, isLoading: boolean){
        state.isRequestLoading = isLoading
    },
    SET_LOADING_WITHDRAW_INFOS(state: IWithdrawState, isLoading: boolean){
        state.isWithdrawInfoLoading = isLoading
    },
    REMOVE_ACCOUNT_BANK(state: IWithdrawState, id: number){
        state.accounts = state.accounts.filter(account => account.id !== id)
    },
    SET_ACCOUNTS(state: IWithdrawState, accounts: Array<IAccount>){
        state.accounts = accounts.map(account => {
            return {
                account: account.account_check_digit ? `${account.account_number}-${account.account_check_digit}` : account.account_number,
                type: account.account_type === 'current' ? 'Conta Corrente' : 'Conta poupança',
                bank: account?.banks_code?.name ?? '',
                ...account
            }
        })
    },
    SET_HISTORY(state: IWithdrawState, history: Array<IHistory>){
        
        state.history = history.map(el => {
            el.withdrawal_amount = el.withdrawal_amount / 100
            el.bank_name = el?.account_bank?.banks_code?.name ?? ''
            return el
        })
    },
    HISTORY_PAGINATION(state: IWithdrawState, pagination: IPagination){   
        state.history_pagination = pagination
    },
    SET_LOADING_ADD_ACCOUNT(state: IWithdrawState, isLoading: boolean){   
        state.isLoadingAddAccount = isLoading
    },
    UNCHECK_ALL_ACCOUNTS(state: IWithdrawState, id: number){   
        state.accounts = state.accounts
            .map(account => {
                if(account.id !== id){
                    return {
                        ...account,
                        is_active: false
                    }
                }

                return account
            })
    }
}