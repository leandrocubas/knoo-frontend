import type { Module } from 'vuex'
import type { ICheckoutState } from './interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { checkout_state } from './state'


export const checkout: Module<ICheckoutState, any> = {
    namespaced: true,
    state: checkout_state,
    getters,
    mutations,
    actions
};