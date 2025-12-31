import { type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { ICupom } from './interface/cupom.interface'

export function cupomService() {

    const onDelete = (offer_id: number): Promise<AxiosResponse<any, any>> => 
        axios.delete(urlConfig.urlCupom.replace(':id', `${offer_id}`))
            .catch(err => err)

    const onGet = (id?: number): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlCupom.replace(':id', id ? id.toString() : ''))
            .catch(err => err)

    const onCreate = (cupom: ICupom): Promise<AxiosResponse<any, any>> => {
        return axios.post(urlConfig.urlCupom.replace(':id', ''), cupom)
            .catch(err => err)
    }

    const onEdit = (cupom: ICupom): Promise<AxiosResponse<any, any>> => {
        return axios.put(urlConfig.urlCupom.replace(':id', `${cupom.id}`), { ...cupom })
            .catch(err => err)
    }
    

    return {
        onDelete,
        onGet,
        onCreate,
        onEdit
    }
}