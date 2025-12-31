import type { Module } from 'vuex'
import type { IAreaState } from './interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { area_state } from './state'


export const area: Module<IAreaState, any> = {
    namespaced: true,
    state: area_state,
    getters,
    mutations,
    actions
}