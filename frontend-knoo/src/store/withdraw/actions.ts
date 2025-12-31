import type { ActionContext } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { withdrawService } from './service'
import type { IWithdrawState } from './interface/state.interface'
import type { IAccount } from './interface/account.interface'

const toast = useToast()

const {
    onGet,
    onGetAccountBanks,
    onAddAccountBank,
    onDeleteAccountBank,
    onGetHistory,
    onRequestWithdraw,
    onRequestWithdrawInfos,
    onToggleStatus
} = withdrawService()

export const actions = {
    
    async get({ commit }: ActionContext<IWithdrawState, any>, id: number) {
        commit('SET_LOADING', true)
        const { data } = await onGet(id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async get_account_bank({ commit }: ActionContext<IWithdrawState, any>, id: number) {
        commit('SET_LOADING_ACCOUNT_BANK', true)
        const { data } = await onGetAccountBanks(id)

        commit('SET_LOADING_ACCOUNT_BANK', false)
        
        if (data && data.success) {
            commit('SET_ACCOUNTS', data.data)
            return Promise.resolve(data)
        }

        return Promise.reject(data)
    },
    async add_account_bank({ commit }: ActionContext<IWithdrawState, any>, account: IAccount) {
        commit('SET_LOADING_ADD_ACCOUNT', true)
        const { data } = await onAddAccountBank(account)

        commit('SET_LOADING_ADD_ACCOUNT', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },
    async delete_account_bank({ commit }: ActionContext<IWithdrawState, any>, id: number) {
        
        const { data } = await onDeleteAccountBank(id)
        if(data && data.success){
            commit('REMOVE_ACCOUNT_BANK', id)
            toast.success(data.message)
            return Promise.resolve(data.data)
        }
        
        return Promise.reject(data)
    },
    async get_history({ commit }: ActionContext<IWithdrawState, any>, page?: number) {
        
        commit('SET_LOADING_HISTORY', true)
        
        const { data } = await onGetHistory(page ? page : 1)
        
        commit('SET_LOADING_HISTORY', false)
        
        if (data && data.success) {
            
            commit('SET_HISTORY', data.data.data)
            commit('HISTORY_PAGINATION', {
                pageIndex: data.data.current_page,
                pageSize: data.data.per_page,
                totalItems: data.data.total
            })

            return Promise.resolve(data.data)
        }
        
        return Promise.reject(data)
    },

    async request_withdraw({ commit, dispatch }: ActionContext<IWithdrawState, any>, amount: number) {
        commit('SET_REQUEST_LOADING', true)
        const { data } = await onRequestWithdraw({ amount: +amount * 100 })

        commit('SET_REQUEST_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async request_withdraw_infos({ commit }: ActionContext<IWithdrawState, any>) {
        commit('SET_LOADING_WITHDRAW_INFOS', true)
        const { data } = await onRequestWithdrawInfos()

        commit('SET_LOADING_WITHDRAW_INFOS', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async toggle_status({ commit }: ActionContext<IWithdrawState, any>, { id, is_active } : { id: number, is_active: boolean }) {
        
        
        const { data } = await onToggleStatus({ id, is_active })
        
        if (data && data.success) {
            if(is_active){
                commit('UNCHECK_ALL_ACCOUNTS', id)
            }

            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },
}