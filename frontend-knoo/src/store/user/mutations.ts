import type { IBank } from './interface/bank.interface'
import type { IUserState } from './interface/state.interface'
import type { IStates } from './interface/states.interface'
import type { IUser } from './interface/user.interface'

export const mutations = {
    ADD_USER(state: IUserState, user: IUser){
        state.user = user
    },
    LOGOUT(state: IUserState){
        state.user = null
    },
    SET_LOADING(state: IUserState, isLoading: boolean){
        state.isLoading = isLoading
    },
    SET_BANK_LIST(state: IUserState, bank_list: Array<IBank>){
        state.bank_list = bank_list.map(el => ({
            label: el.name,
            value: el.id
        }))
    },
    SET_STATES(state: IUserState, states: Array<IStates>){
        state.states = states
    }
}