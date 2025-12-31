import type { IMembershipState } from '@/store/membership/interface/state.interface'

export const membership_state: IMembershipState = {
  memberships: [],
  membership: null,
  isLoading: false,
  membership_offer_list: [],
}
