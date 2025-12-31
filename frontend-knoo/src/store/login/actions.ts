import type { ActionContext } from 'vuex'
import type { ILogin } from './interface/signin.interface'
import { loginService } from './service'
import { useToast } from 'vue-toast-notification'
import type { ISignup } from './interface/signup.interface'
import type { ILoginState } from './interface/state.interface'
import { useUtils } from '@/composables/useUtils'

const {
    sign_in,
    sign_up,
    forgot_password,
    reset_password,
    validate_code,
} = loginService()

const toast = useToast()
const { storageToken } = useUtils()

export const actions = {


    async sign_in({ commit }: ActionContext<ILoginState, any>, login: ILogin) {
        commit('SET_LOADING', true)

        const { data } = await sign_in(login)

        commit('SET_LOADING', false)

        if (data && data.success)
            return Promise.resolve(data.data)

        return Promise.reject()


    },

    async sign_up({ commit }: ActionContext<ILoginState, any>, signup: ISignup) {
        commit('SET_LOADING', true)

        const { data } = await sign_up(signup)

        commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(false)

    },

    async forgot_password({ commit }: ActionContext<ILoginState, any>, email: string) {

        commit('SET_LOADING', true)

        const { data } = await forgot_password(email)
        commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success('Enviamos um e-mail para recuperação de senha')
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async reset_password({ commit }: ActionContext<ILoginState, any>, { verification_code, password, email }: { verification_code: string, password: string, email: string }) {
        commit('SET_LOADING', true)
        const { data } = await reset_password({ verification_code, email, new_password: password })

        commit('SET_LOADING', false)
        if (data && data.success) {
            toast.success(data.message)
            storageToken(data.data.token)
            return Promise.resolve(true)
        }

        return Promise.reject(false)
    },

    async validate_code({ }: ActionContext<ILoginState, any>, { token, email }: { token: string, email: string }) {

        const { data } = await validate_code(token, email)

        if (data && data.success) {
            return Promise.resolve(data)
        }

        return Promise.reject(data)
    }
};