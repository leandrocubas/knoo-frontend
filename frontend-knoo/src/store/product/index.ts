import type { Module } from 'vuex'
import type { IProductState } from './interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { login_state } from './state'


export const product: Module<IProductState, any> = {
    namespaced: true,
    state: login_state,
    getters,
    mutations,
    actions
};