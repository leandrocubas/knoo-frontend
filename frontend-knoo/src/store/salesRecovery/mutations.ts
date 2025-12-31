import type { ISalesRecoveryState } from './interface/state.interface.ts'

export const mutations = {
    SET_LOADING(state: ISalesRecoveryState, isLoading: boolean){
        state.isLoading = isLoading
    }
};