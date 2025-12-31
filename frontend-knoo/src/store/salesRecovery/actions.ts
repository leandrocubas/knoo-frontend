import type { ActionContext } from 'vuex'
import type { ISalesRecoveryState } from './interface/state.interface'
import { salesRecoveryService } from './service'
import { useToast } from 'vue-toast-notification'

const {
    onGetAbandonedCartData,
    onGetSales,
    onGetUnpaidSales,
} = salesRecoveryService()

const toast = useToast()

export const actions = {


    async onGetAbandonedCartData({ commit }: ActionContext<ISalesRecoveryState, any>) {
        commit('SET_LOADING', true)
        const { data } = await onGetAbandonedCartData()

        await commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async get_sales({commit }: ActionContext<ISalesRecoveryState, any>)
    {
        commit('SET_LOADING', true);

        const { data } = await onGetSales();

        await commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data.data);
        }

        return Promise.reject(data);
    },

    async get_unpaid_sales({commit }: ActionContext<ISalesRecoveryState, any>)
    {
        commit('SET_LOADING', true);

        const { data } = await onGetUnpaidSales();

        await commit('SET_LOADING', false)

        if (data) {
            return Promise.resolve(data.data);
        }

        return Promise.reject(data);
    }
};