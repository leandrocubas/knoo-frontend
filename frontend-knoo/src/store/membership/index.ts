import type { Module } from 'vuex'
import { getters } from './getter'
import { mutations } from './mutation'
import { actions } from './action'
import { membership_state } from './state'
import type { IMembershipState } from './interface/state.interface'

export const membership: Module<IMembershipState, any> = {
  namespaced: true,
  state: membership_state,
  getters,
  mutations,
  actions,
}
