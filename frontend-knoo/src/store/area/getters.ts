import type { IArea } from '@/store/area/interface/area.interface'
import type { IAreaState } from '@/store/area/interface/state.interface'

export const getters = {
  isLoading: (state: IAreaState): boolean => state.isLoading,
  area_list: (state: IAreaState) => state.areas || [],
  addOpened: (state: IAreaState): boolean => state.addOpened,
  actual_area: (state: IAreaState): IArea | null => state.area,
}
