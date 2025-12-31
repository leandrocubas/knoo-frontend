import type { IArea } from './interface/area.interface'
import type { IAreaState } from './interface/state.interface'

export const mutations = {
  SET_LOADING(state: IAreaState, isLoading: boolean) {
    state.isLoading = isLoading
  },
  SET_AREA_LIST(state: IAreaState, areas: Array<IArea>) {
    state.areas = areas
  },
  ADD_AREA_LIST(state: IAreaState, areas: Array<IArea>) {
    state.areas = areas
  },
  ADD_AREA(state: IAreaState, area: IArea) {
    state.areas = [area, ...state.areas]
  },
  AREA(state: IAreaState, area: IArea | null) {
    state.area = area
  },
  REMOVE_AREA(state: IAreaState, id: string) {
    state.areas = state.areas.filter((area) => area.id !== id)
  },
  REPLACE_AREA(state: IAreaState, updated_area: IArea) {
    const oldIndex = state.areas.findIndex((_area) => updated_area.id === _area.id)
    state.areas[oldIndex] = { ...updated_area }
  },
  TOGGLE_AREA(state: IAreaState, { id, isActive }: { id: string, isActive: boolean }
  ) {
    const area = state.areas.find((area) => area.id === id)
    if (area) {
      area.is_active = isActive
    }
  },
}
