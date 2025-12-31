import type { Module } from 'vuex'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { area_state } from './state'
import type { IPixelState } from './interface/state.interface'


export const pixel: Module<IPixelState, any> = {
    namespaced: true,
    state: area_state,
    getters,
    mutations,
    actions
}