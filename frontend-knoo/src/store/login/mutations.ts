import type { ILoginState } from './interface/state.interface'

export const mutations = {
    SET_LOADING(state: ILoginState, isLoading: boolean){
        state.isLoading = isLoading
    }
};