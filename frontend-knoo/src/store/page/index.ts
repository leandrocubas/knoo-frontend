import type { Module } from 'vuex'
import { getters } from './getters'
import { page_state } from './state'
import { mutations } from './mutations'
import type { IPageState } from '@/store/page/interface/state.interface';

export const page: Module<IPageState, any> = {
    namespaced: true,
    state: page_state,
    getters,
    mutations
};