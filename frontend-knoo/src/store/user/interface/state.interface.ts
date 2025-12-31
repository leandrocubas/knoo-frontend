import type { ISelect } from '@/interfaces/select.interface'
import type { IStates } from './states.interface'
import type { IUser } from './user.interface'

export interface IUserState {
    user: IUser | null
    isLoading: boolean
    bank_list: Array<ISelect>,
    states: Array<IStates>
}