import type { ActionContext } from 'vuex'
import { useToast } from 'vue-toast-notification'
import type { ICupom } from './interface/cupom.interface'
import { cupomService } from './service'
import type { ICupomState } from './interface/state.interface'

const toast = useToast()

const {
    onCreate,
    onGet,
    onDelete,
    onEdit
} = cupomService()

export const actions = {
    

    async create({ commit }: ActionContext<ICupomState, any>, cupom: ICupom){
        commit('SET_LOADING', true)

        const { data } = await onCreate(cupom)
        
        commit('SET_LOADING', false)
        
        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },
    
    async get({ commit }: ActionContext<ICupomState, any>, id?: number) {
        commit('SET_LOADING', true)
        const { data } = await onGet(id)

        commit('SET_LOADING', false)

        if (data && data.success) {
            commit('SET_CUPOM_LIST', data.data.data)
            return Promise.resolve(data.data.data)
        }

        return Promise.reject(data)
    },

    async delete({ commit }: ActionContext<ICupomState, any>, id: number) {
        commit('SET_LOADING', true)
        const { data } = await onDelete(id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async edit({ commit }: ActionContext<ICupomState, any>, cupom: ICupom) {
        commit('SET_LOADING', true)

        const { data } = await onEdit(cupom)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    }
}