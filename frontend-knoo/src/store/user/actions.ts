import type { ActionContext } from 'vuex'
import { useToast } from 'vue-toast-notification'
import { userService } from './service'
import type { IUserState } from './interface/state.interface'
import type { ICPFAccount } from './interface/cpf-account.interface'
import type { ICNPJAccount } from './interface/cnpj-account.interface'

const {
    onGet,
    onLogout,
    onGetAddressByCEP,
    onGetAllBanks,
    onAddCPFAccount,
    onAddCNPJAccount,
    onGetCompanyByCNPJ,
    onGetAllStates
} = userService()

const toast = useToast()

export const actions = {
    
    async get({ commit, state }: ActionContext<IUserState, any>) {
       
        if(!state.user){
            commit('SET_LOADING', true)
            const { data } = await onGet()
            
            commit('SET_LOADING', false)
             if (data && data.success) {
                commit('ADD_USER', data.data)
                return Promise.resolve(data.data)
             }
     
             return Promise.reject(data)
        }

        return Promise.resolve(state.user)

    },

    async get_address_by_cep({ }: ActionContext<IUserState, any>, cep: string) {
       
        const { data } = await onGetAddressByCEP(cep)

        return Promise.resolve(data)

    },

    

    async get_company_by_cnpj({ }: ActionContext<IUserState, any>, cnpj: string) {
       
        const { data } = await onGetCompanyByCNPJ(cnpj)

        return Promise.resolve(data)

    },

    async get_all_banks({ commit }: ActionContext<IUserState, any>, cnpj: string) {
       
        const { data } = await onGetAllBanks()

        if(data && data.success){
            commit('SET_BANK_LIST', data.data)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)

    },

    async logout({ commit }: ActionContext<IUserState, any>,) {

        onLogout()
        commit('LOGOUT')
        return Promise.resolve(true)
    },

    async add_cpf_account({ commit }: ActionContext<IUserState, any>, cpf_account: ICPFAccount){
        const { data } = await onAddCPFAccount(cpf_account)
        if (data && data.success) {
            return Promise.resolve(data.data)
        }
        return Promise.reject(data)
    },

    async add_cnpj_account({ commit }: ActionContext<IUserState, any>, cnpj_account: ICNPJAccount){
        
        const { data } = await onAddCNPJAccount(cnpj_account)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }
        return Promise.reject(data)
    },

    async get_all_states({ commit }: ActionContext<IUserState, any>){
        
        const { data } = await onGetAllStates()

        if (data) {
            commit('SET_STATES', data)
            return Promise.resolve(data)
        }
        return Promise.reject(data)
    },


    
};