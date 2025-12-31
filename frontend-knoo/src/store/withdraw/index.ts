import type { Module } from 'vuex'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { withdraw_state } from './state'
import type { IWithdrawState } from './interface/state.interface'


export const withdraw: Module<IWithdrawState, any> = {
    namespaced: true,
    state: withdraw_state,
    getters,
    mutations,
    actions
}