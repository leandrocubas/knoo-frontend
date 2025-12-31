import type { Module } from 'vuex'
import { getters } from './getters'
import { menu_state } from './state'
import { mutations } from './mutations'

export const menu: Module<{ isOpened: boolean }, any> = {
    namespaced: true,
    state: menu_state,
    getters,
    mutations
};