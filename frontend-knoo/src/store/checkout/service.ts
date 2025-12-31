import { AxiosError, type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { ICheckout, IOrderBumpPayload } from './interface/checkout.interface'

export function checkoutService() {

    const onGetById = (id?: string): Promise<any> => 
        axios.get(urlConfig.urlCheckout.replace(':id', 'id'), { params: { id } })
            .catch((err: AxiosError) => err)

    const onGetByHash = (hash?: string): Promise<any> => 
        axios.get(urlConfig.urlCheckout.replace(':id', hash ? hash : ''))
            .catch((err: AxiosError) => err)

    const onEdit = (body: ICheckout): Promise<any> => 
        axios.put(urlConfig.urlCheckout.replace(':id', body.id.toString()), body)
            .catch((err: AxiosError) => err)

    const onGetProductsAndOffer = (hash: string): Promise<any> => 
        axios.get(urlConfig.urlProductsToOrderBump.replace(':hash', hash))
            .catch((err: AxiosError) => err)

    const createOrderBump = (order: IOrderBumpPayload): Promise<any> => 
        axios.post(urlConfig.urlCreateOrderBump, order)
            .catch((err: AxiosError) => err)

    const deleteOrderBump = (order_bump_id: number): Promise<any> => 
        axios.delete(urlConfig.urlDeleteOrderBump.replace(':id', order_bump_id.toString()))
            .catch((err: AxiosError) => err)

    const getMediaId = (file: FormData): Promise<AxiosResponse<any, any>> => {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        return axios.post(urlConfig.urlUploadMedia, file, { headers })
            .catch(err => err)
    }

    return {
        onGetById,
        onGetByHash,
        onEdit,
        getMediaId,
        onGetProductsAndOffer,
        createOrderBump,
        deleteOrderBump
    }
}