//getters.ts

import type {
    IMembership,
    IMembershipOffer,
  } from './interface/membership.interface'
  import type { IMembershipState } from '@/store/membership/interface/state.interface'
  
  export const getters = {
    isLoading: (state: IMembershipState): boolean => state.isLoading,
    membership_list: (state: IMembershipState) => state.memberships,
    membership_offer_list: (state: IMembershipState): Array<IMembershipOffer> => state.membership_offer_list,
  }
  