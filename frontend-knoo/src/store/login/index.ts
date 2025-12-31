import type { Module } from 'vuex'
import type { ILoginState } from './interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { login_state } from './state'


export const login: Module<ILoginState, any> = {
    namespaced: true,
    state: login_state,
    getters,
    mutations,
    actions
};