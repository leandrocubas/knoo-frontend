import type { ILoginState } from './interface/state.interface'

export const getters = {
    isLoading: (state: ILoginState): boolean => state.isLoading
};