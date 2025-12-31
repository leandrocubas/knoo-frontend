import type { ILogin } from './signin.interface'

export interface ILoginState {
    login: ILogin,
    isLoading: boolean
}
