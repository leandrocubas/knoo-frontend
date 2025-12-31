import type { Module } from 'vuex'
import type { ISalesRecoveryState } from './interface/state.interface.ts'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { sales_recovery_state } from './state'

export const salesRecovery: Module<ISalesRecoveryState, any> = {
    namespaced: true,
    state: sales_recovery_state,
    getters,
    mutations,
    actions
};