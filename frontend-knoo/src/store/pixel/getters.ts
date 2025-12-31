import type { IPixelState } from './interface/state.interface'
import type { IPixel } from '@/interfaces/pixel.interface'

export const getters = {
  list_to_add: (state: IPixelState): Array<IPixel> => state.list_to_add,
}
