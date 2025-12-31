import { type AxiosResponse } from 'axios'
import type { ILogin, ILoginResponse } from './interface/signin.interface'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { ISignup } from './interface/signup.interface'

export function loginService() {

    const sign_in = ({ email, password }: ILogin): Promise<AxiosResponse<any, any>> => {
        return axios.post(urlConfig.urlLogin, { email, password })
            .catch(err => err)
    }

    const sign_up = ({ name, email, password }: ISignup): Promise<AxiosResponse<any, any>> => {
        return axios.post(urlConfig.urlSignup, { name, email, password })
            .catch(err => err)
    }

    const forgot_password = (email: string): Promise<AxiosResponse<any, any>> => {
        return axios.post(urlConfig.urlForgotPassword, { email })
            .catch(err => err)
    }

    const reset_password = ({ verification_code:token, email, new_password }: { verification_code: string, email: string, new_password: string }): Promise<AxiosResponse<any, any>> => {
        return axios.put(urlConfig.urlForgotPassword, { token, new_password, email })
            .catch(err => err)
    }

    const validate_code = (token: string, email: string): Promise<AxiosResponse<any, boolean>> => {
        return axios.get(urlConfig.urlValidateRecoveryCode, { params: { token, email } })
            .catch(err => err)
    }

    return {
        sign_in,
        sign_up,
        forgot_password,
        reset_password,
        validate_code
    }
}