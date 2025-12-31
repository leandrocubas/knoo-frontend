import type { IDashboard } from '@/interfaces/dashboard.interface'
import type { IDashboardState } from './interface/state.interface'

export const mutations = {
    SET_LOADING(state: IDashboardState, isLoading: boolean){
        state.isLoading = isLoading
    },
    SET_DASHBOARD(state: IDashboardState, dashboard: IDashboard){
        state.dashboard = dashboard
    },
    SET_FILTERS(state: IDashboardState, filter: { initial_date: string, finish_date: string }){
        if(filter){
            state.finish_date = filter.finish_date
            state.initial_date = filter.initial_date
            return
        }

        state.finish_date = ''
        state.initial_date = ''
    }
}