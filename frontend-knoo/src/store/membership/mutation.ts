import type {
    IMembership,
    IMembershipOffer,
  } from './interface/membership.interface'
  import type { IMembershipState } from '@/store/membership/interface/state.interface'
  
  export const mutations = {
    SET_LOADING(state: IMembershipState, isLoading: boolean) {
      state.isLoading = isLoading
    },
    SET_MEMBERSHIP_LIST(
      state: IMembershipState,
      memberships: Array<IMembership>
    ) {
      state.memberships = memberships
    },
    ADD_MEMBERSHIP_LIST(state: IMembershipState, membership: IMembership) {
      state.memberships = [membership, ...state.memberships]
    },
    SET_MEMBERSHIP_OFFER_LIST(
      state: IMembershipState,
      offers: Array<IMembershipOffer>
    ) {
      state.membership_offer_list = offers
    },
    REMOVE_MEMBERSHIP(state: IMembershipState, id: string) {
      state.memberships = state.memberships.filter(
        (membership) => membership.id !== id
      )
    },
    REPLACE_MEMBERSHIP(state: IMembershipState, updated_membership: IMembership) {
      const oldIndex = state.memberships.findIndex(
        (_membership) => updated_membership.id === _membership.id
      )
      state.memberships[oldIndex] = { ...updated_membership }
    },
  }
  