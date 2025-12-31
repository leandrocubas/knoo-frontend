import { AxiosError, type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import { urlConfig } from '@/config/url.config'
import type { IProduct } from '@/store/product/interface/product.interface'

export function productService() {

    const onDelete = (productId: string): Promise<AxiosResponse<any, any>> => {
        return axios.delete(urlConfig.urlProduct.replace(':id', productId))
            .catch(err => err)
    }

    const onGet = (id?: number): Promise<any> => 
        axios.get(urlConfig.urlProduct.replace(':id', id ? id.toString() : ''))
            .catch((err: AxiosError) => err)

    const getMediaId = (file: FormData): Promise<AxiosResponse<any, any>> => {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        return axios.post(urlConfig.urlUploadMedia, file, { headers })
            .catch(err => err)
    }

    const onCreate = (product: IProduct): Promise<AxiosResponse<any, any>> => {
        return axios.post(urlConfig.urlProduct.replace(':id', ''), product)
            .catch(err => err)
    }

    const onEdit = (product: IProduct): Promise<AxiosResponse<any, any>> => {
        return axios.put(urlConfig.urlProduct.replace(':id', `${product.id}`), product)
            .catch(err => err)
    }

    const onToggleProduct = (product_id: number, is_active: number): Promise<AxiosResponse<any, any>> => {
        return axios.put(urlConfig.urlProduct.replace(':id', `${product_id}`), { is_active })
            .catch(err => err)
    }

    const getImageByS3Name = (s3Name: string): Promise<AxiosResponse<any, any>> => {
        return axios.get(urlConfig.urlGetImageByS3Name.replace(':nameS3', s3Name))
            .catch(err => err)
    }

    const onGetProductCategories = (): Promise<AxiosResponse<any, any>> => {
        return axios.get(urlConfig.urlProductCategorie)
            .catch(err => err)
    }

    const onGetProductTypes = (): Promise<AxiosResponse<any, any>> => {
        return axios.get(urlConfig.urlProductType)
            .catch(err => err)
    }

    return {
        onDelete,
        onGet,
        getMediaId,
        onCreate,
        getImageByS3Name,
        onEdit,
        onGetProductCategories,
        onGetProductTypes,
        onToggleProduct
    }
}