import type { Module } from 'vuex'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { dashboard_state } from './state'
import type { IDashboardState } from './interface/state.interface'


export const dashboard: Module<IDashboardState, any> = {
    namespaced: true,
    state: dashboard_state,
    getters,
    mutations,
    actions
};