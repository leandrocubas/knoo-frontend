import { type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { IAccount } from './interface/account.interface'

export function withdrawService() {

    const onGet = (_: number): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlOffer, { params: { _ } })
            .catch(err => err)
            
    const onGetAccountBanks = (_: number): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlAccountsBank, { params: { page: 1, items_per_page: 4 } })
    .catch(err => err)
    
    const onAddAccountBank = (account: IAccount): Promise<AxiosResponse<any, any>> => 
        axios.post(urlConfig.urlCreateAccountBank, account)
            .catch(err => err)
            
    const onDeleteAccountBank = (id: number): Promise<AxiosResponse<any, any>> => axios.delete(`${urlConfig.urlDeleteAccountsBank}/${id}`)
            .catch(err => err)
            
    const onGetHistory = (page: number): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlWithdrawHistory, { params: { page, items_per_page: 10 } })
            .catch(err => err)

    const onRequestWithdraw = (body: { amount: number }): Promise<AxiosResponse<any, any>> => 
        axios.post(urlConfig.urlRequestWithdraw, body)
            .catch(err => err)

    const onRequestWithdrawInfos = (): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlRequestWithdrawInfos)
            .catch(err => err)

    const onToggleStatus = ({ id, is_active } : { id: number, is_active: boolean }): Promise<AxiosResponse<any, any>> => 
        axios.put(`${urlConfig.urlToggleAccountBankStatus}/${id}`)
            .catch(err => err)

    return {
        onGet,
        onGetAccountBanks,
        onAddAccountBank,
        onDeleteAccountBank,
        onGetHistory,
        onRequestWithdraw,
        onRequestWithdrawInfos,
        onToggleStatus
    }
}