import type { Module } from 'vuex'
import type { IOfferState } from './interface/state.interface'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
import { offer_state } from './state'


export const offer: Module<IOfferState, any> = {
    namespaced: true,
    state: offer_state,
    getters,
    mutations,
    actions
};