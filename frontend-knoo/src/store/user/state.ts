import type { IUserState } from '@/store/user/interface/state.interface'

export const user_state: IUserState = {
    user: null,
    isLoading: false,
    bank_list: [],
    states: []
}