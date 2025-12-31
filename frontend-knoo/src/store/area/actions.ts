import type { ActionContext } from 'vuex'
import type { IAreaState } from './interface/state.interface'
import { areaService } from './services'
import type { IArea } from './interface/area.interface'
import { useToast } from 'vue-toast-notification'

const { onGet, onCreate, onDelete, onEdit, getMediaId, onToggleArea } =
  areaService()
const toast = useToast()

export const actions = {
  async create({ commit }: ActionContext<IAreaState, any>, area: IArea) {
    commit('SET_LOADING', true)

    const { data } = await onCreate(area)
    commit('SET_LOADING', false)

    if (data && data.success) {
      const [area] = data.data.result
      return Promise.resolve(area)
    }
    return Promise.reject(data)
  },

  async get({ commit }: ActionContext<IAreaState, any>, id?: number) {
    commit('SET_LOADING', true)
    const { data } = await onGet(id)
    await commit('SET_LOADING', false)

    if (data && data.success) {
      const { data: area_list } = data.data
      commit('ADD_AREA_LIST', area_list)
      return Promise.resolve(data.data)
    }

    toast.error('Erro ao recuperar a área' ?? '')
    return Promise.reject(data)
  },

  async delete({ commit }: ActionContext<IAreaState, any>, id: string) {
    commit('SET_LOADING', true)
    const { data } = await onDelete(id)

    await commit('SET_LOADING', false)

    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    toast.error('Erro ao deletar a área' ?? '')
    return Promise.reject(data)
  },

  async edit({ commit }: ActionContext<IAreaState, any>, updated_area: IArea) {
    commit('SET_LOADING', true)
    const { data } = await onEdit(updated_area)

    commit('SET_LOADING', false)
    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async save_area({ commit }: ActionContext<IAreaState, any>, area: IArea) {
    commit('SET_LOADING', true)
    const { data } = await onCreate(area)

    commit('SET_LOADING', false)
    if (data && data.success) {
      toast.success(data.message)
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  async get_media_id({ commit }: ActionContext<IAreaState, any>, file: File) {
    commit('SET_LOADING', true)

    const formData = new FormData()

    formData.append('file', file)

    const { data } = await getMediaId(formData)

    commit('SET_LOADING', false)

    if (data && data.success && data.success) {
      return Promise.resolve({ id: data.data.id, s3_url: data.data.s3_url })
    }

    return Promise.reject(data)
  },

  async toggle_area(
    { commit }: ActionContext<IAreaState, any>,
    { is_active, id }: { is_active: number; id: string }
  ) {
    const { data } = await onToggleArea(id, is_active)

    if (data && data.success) {
      toast.success(data.message)
      commit('TOGGLE_AREA', { id, isActive: !!is_active })
      return Promise.resolve(data.data)
    }

    return Promise.reject(data)
  },

  addAreaToList: ({ commit }: ActionContext<IAreaState, any>, area: IArea) =>
    commit('ADD_AREA_LIST', area),
}
