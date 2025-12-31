import { AxiosError } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'

export function dashboardService() {

    const onGet = (initial_date?: string, finish_date?: string): Promise<any> => 
        axios.get(urlConfig.urlDashboard, { params: initial_date  && finish_date ? { initial_date, finish_date } : {} })
            .catch((err: AxiosError) => err)


    return {
        onGet,
    }
}