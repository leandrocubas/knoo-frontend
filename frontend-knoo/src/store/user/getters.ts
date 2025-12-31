import type { ISelect } from '@/interfaces/select.interface'
import type { IUserState } from './interface/state.interface'
import type { IStates } from './interface/states.interface'
import type { IUser } from './interface/user.interface'

export const getters = {
    getLoggedUser: (state: IUserState): IUser | null => state.user,
    isLoading: (state: IUserState): boolean => state.isLoading,
    bank_list: (state: IUserState): Array<ISelect> => state.bank_list,
    getAllStates: (state: IUserState): Array<IStates> => state.states
};