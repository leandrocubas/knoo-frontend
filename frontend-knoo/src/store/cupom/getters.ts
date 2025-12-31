import type { ICupom } from './interface/cupom.interface'
import type { ICupomState } from './interface/state.interface'

export const getters = {
    is_loading: (state: ICupomState): boolean | null => state.isLoading,

    cupomList: (state: ICupomState): Array<ICupom> => state.cupons,
};