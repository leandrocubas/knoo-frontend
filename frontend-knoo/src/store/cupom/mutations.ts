

import type { ICupom } from './interface/cupom.interface'
import type { ICupomState } from './interface/state.interface';

export const mutations = {
    SET_LOADING(state: ICupomState, isLoading: boolean){
        state.isLoading = isLoading
    },
    SET_CUPOM_LIST(state: ICupomState, cupons: Array<ICupom>){
        state.cupons = cupons
    },
};