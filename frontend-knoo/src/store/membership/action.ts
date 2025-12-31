import type { ActionContext } from 'vuex'
import { membershipService } from './service'
import type { IMembershipState } from './interface/state.interface'
import type {
  IMembership,
  IMembershipOffer,
} from './interface/membership.interface'
import { useToast } from 'vue-toast-notification'

const {
  onGet,
  onCreate,
  onGetMembershipOffer,
  onDelete,
  onEdit
} = membershipService()

const toast = useToast()

export const actions = {
  async create({ commit }: ActionContext<IMembershipState, any>, membership: IMembership) {
    commit('SET_LOADING', true)

    const { data } = await onCreate(membership)
    commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      commit('ADD_MEMBERSHIP_LIST', data.data)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async get({ commit }: ActionContext<IMembershipState, any>, id?: number) {
    commit('SET_LOADING', true)
    const { data } = await onGet(`${id}`)
    await commit('SET_LOADING', false)

    if (data && data.success) {
      commit('SET_MEMBERSHIP_LIST', data.data)
      return Promise.resolve(data.data)
    }
    toast.error(data.message)
    return Promise.reject(data)
  },

  async get_membership_offer_list(
    { commit }: ActionContext<IMembershipState, any>,
    id?: number
  ) {
    commit('SET_LOADING', true)
    
    const { data } = await onGetMembershipOffer(`${id}`)
    
    commit('SET_LOADING', false)
    
    if (data && data.success) {

      const result = (data.data as IMembershipOffer[]).map((el) => ({
        value: el.id,
        label: el.offer_name,
      }))

      commit('SET_MEMBERSHIP_OFFER_LIST', result)
      return Promise.resolve(data.data)
    }
    
    toast.error(data.message)
    return Promise.reject(data)
  },
  
  async delete(
    { commit }: ActionContext<IMembershipState, any>,
    { membership_id, offer_id }: { membership_id: string; offer_id: string }
  ) {
    commit('SET_LOADING', true)
    const { data } = await onDelete({ membership_id, offer_id })
    commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },
  async edit(
    { commit }: ActionContext<IMembershipState, any>,
    updated_membership: IMembership
  ) {
    commit('SET_LOADING', true)
    const { data } = await onEdit(updated_membership)

    commit('SET_LOADING', false)
    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },
}
