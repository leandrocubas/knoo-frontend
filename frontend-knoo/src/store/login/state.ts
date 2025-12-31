import type { ILoginState } from '@/store/login/interface/state.interface'

export const login_state: ILoginState = {
    login: {
        email: '',
        password: '',
        token: ''
    },

    isLoading: false
}