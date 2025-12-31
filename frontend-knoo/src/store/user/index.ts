import type { Module } from 'vuex'
import type { IUserState } from '@/store/user/interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { user_state } from './state'

export const user: Module<IUserState, any> = {
    namespaced: true,
    state: user_state,
    getters,
    mutations,
    actions
}