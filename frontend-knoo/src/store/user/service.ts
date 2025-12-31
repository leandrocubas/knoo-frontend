import { type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { ICPFAccount } from './interface/cpf-account.interface'
import type { ICNPJAccount } from './interface/cnpj-account.interface'

export function userService() {

    const onGet = (): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlCurrentUser)
            .catch(err => err)

    const onLogout = (): Promise<AxiosResponse<any, any>> => axios.delete(urlConfig.urlLogout)
            .catch(err => err)

    const onGetAddressByCEP = (cep: string): Promise<AxiosResponse<any, any>> => axios.get(urlConfig.urlViaCEP.replace(':cep', cep))
            .catch(err => err)

    const onGetAllBanks = (): Promise<AxiosResponse<any, any>> => axios.get(urlConfig.urlBanks)
    
    const onGetCompanyByCNPJ = (cnpj: string): Promise<AxiosResponse<any, any>> => axios.get(urlConfig.urlCNPJWS.replace(':cnpj', cnpj))
            .catch(err => err)

    const onAddCPFAccount = (cpf_account: ICPFAccount): Promise<AxiosResponse<any, any>> => axios.post(urlConfig.urlCreateAccountCPF, cpf_account)
            .catch(err => err)

    const onAddCNPJAccount = (cnpj_account: ICNPJAccount): Promise<AxiosResponse<any, any>> => axios.post(urlConfig.urlCreateAccountCNPJ, cnpj_account)
            .catch(err => err)

    const onGetAllStates = (): Promise<AxiosResponse<any, any>> => axios.get(urlConfig.urlIBGEStates)
            .catch(err => err)
    
    return {
        onGet,
        onLogout,
        onGetAddressByCEP,
        onGetAllBanks,
        onAddCPFAccount,
        onAddCNPJAccount,
        onGetCompanyByCNPJ,
        onGetAllStates
    }
}