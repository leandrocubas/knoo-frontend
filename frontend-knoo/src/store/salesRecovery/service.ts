import { type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { ISalesRecoveryState } from './interface/state.interface'

export function salesRecoveryService() {

    const onGetAbandonedCartData = (): Promise<AxiosResponse<any, ISalesRecoveryState>> => {
        return axios.get(urlConfig.urlAbandonedCart)
            .catch(err => err)
    }

    const onGetSales = (): Promise<AxiosResponse<any, ISalesRecoveryState>> => {
        return axios.get(urlConfig.urlGetSales)
            .catch(err => err);
    }
    const onGetUnpaidSales = (): Promise<AxiosResponse<any, ISalesRecoveryState>> => {
        return axios.get(urlConfig.urlGetUnpaidSales)
            .catch(err => err);
    }

    return {
        onGetAbandonedCartData,
        onGetSales,
        onGetUnpaidSales
    }
}