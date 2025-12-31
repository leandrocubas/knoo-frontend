import { type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { IOffer } from './interface/offer.interface'

export function offerService() {

    const onDelete = (offer_id: number): Promise<AxiosResponse<any, any>> => 
        axios.delete(urlConfig.urlOffer.replace(':id', `${offer_id}`))
            .catch(err => err)

    const onGet = (id?: number): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlOffer.replace(':id', id ? id.toString() : ''))
            .catch(err => err)

    const onGetOffersByProductId = (product_id: string): Promise<AxiosResponse<any, any>> => 
        axios.get(urlConfig.urlGetOfferByProductID.replace(':product_id', product_id))
            .catch(err => err)

    const onCreate = (offer: IOffer): Promise<AxiosResponse<any, any>> => {
        return axios.post(urlConfig.urlOffer.replace(':id', ''), offer)
            .catch(err => err)
    }

    const onEdit = (offer: IOffer): Promise<AxiosResponse<any, any>> => {
        return axios.put(urlConfig.urlOffer.replace(':id', `${offer.id}`), { ...offer })
            .catch(err => err)
    }
    

    return {
        onDelete,
        onGet,
        onCreate,
        onEdit,
        onGetOffersByProductId
    }
}