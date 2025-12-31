import type { IPixel } from "@/interfaces/pixel.interface"
import type { IPixelState } from "./interface/state.interface"

export const mutations = {
  ADD_PIXEL(state: IPixelState, pixel: IPixel) {
    state.list_to_add.unshift({ ...pixel, access_token: pixel.access_token.trim(), pixel_id: pixel.pixel_id.trim() })
  },
  EDIT_PIXEL(state: IPixelState, pixel: IPixel) {
    const pixel_index = state.list_to_add.findIndex(p => p.pixel_id === pixel.pixel_id)
    state.list_to_add[pixel_index] = pixel
  },
  SET_PIXEL_LIST(state: IPixelState, pixel_list: Array<IPixel>) {
    state.list_to_add = pixel_list
  },
  CLEAN_LIST(state: IPixelState) {
    state.list_to_add = []
  },
}
