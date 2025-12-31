import type { ActionContext } from 'vuex'
import type { IDashboardState } from './interface/state.interface'
import { dashboardService } from './service'

const {
    onGet
} = dashboardService()

export const actions = {
    
    async on_get_dashboard({ commit }: ActionContext<IDashboardState, any>) {
        commit('SET_LOADING', true)

        const { data } = await onGet()

        commit('SET_LOADING', false)

        if (data && data.success) {
            const {
                total_billed,
                total_sales,
                total_chargeback,
                total_refund,
                total_card_sales,
                total_orderbump_sales,
                total_pix_sales,
                total_billet_sales
            } = data.data

            commit('SET_DASHBOARD', {
                ...data.data,
                total_billed: total_billed * 100,
                total_sales: total_sales * 100,
                total_chargeback: total_chargeback * 100,
                total_refund: total_refund * 100,
                total_orderbump_sales: total_orderbump_sales * 100,
                total_card_sales: total_card_sales * 100,
                total_pix_sales: total_pix_sales * 100,
                total_billet_sales: total_billet_sales * 100,
            })
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async on_get_dashboard_filtered({ commit, state }: ActionContext<IDashboardState, any>) {
        commit('SET_LOADING', true)

        const { data } = await onGet(state.initial_date, state.finish_date)

        commit('SET_LOADING', false)

        if (data && data.success) {
            const {
                total_billed,
                total_sales,
                total_chargeback,
                total_refund,
                total_card_sales,
                total_orderbump_sales,
                total_pix_sales,
                total_billet_sales
            } = data.data
            
            commit('SET_DASHBOARD', {
                ...data.data,
                ...data.data,
                total_billed: total_billed * 100,
                total_sales: total_sales * 100,
                total_chargeback: total_chargeback * 100,
                total_refund: total_refund * 100,
                total_orderbump_sales: total_orderbump_sales * 100,
                total_card_sales: total_card_sales * 100,
                total_pix_sales: total_pix_sales * 100,
                total_billet_sales: total_billet_sales * 100,
            })
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    }
}