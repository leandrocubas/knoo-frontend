import type { Module } from 'vuex'
import type { IModuleState } from './interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { module_state } from './state'


export const area_module: Module<IModuleState, any> = {
    namespaced: true,
    state: module_state,
    getters,
    mutations,
    actions
};