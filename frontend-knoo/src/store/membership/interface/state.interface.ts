import type { IMembership, IMembershipOffer } from './membership.interface'

export interface IMembershipState {
  memberships: Array<IMembership>
  membership: IMembership | null
  isLoading: boolean
  membership_offer_list: Array<IMembershipOffer>
}
