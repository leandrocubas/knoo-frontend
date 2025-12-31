import type { IArea } from './interface/area.interface'
import { urlConfig } from '@/config/url.config'
import { AxiosError, type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'

export function areaService() {
  const onCreate = (area: IArea): Promise<AxiosResponse<any, any>> => {
    return axios
      .post(urlConfig.urlMembers.replace(':id', ''), area)
      .catch((err) => err)
  }

  const onGet = (id?: number): Promise<any> => {
    const url = urlConfig.urlMembers.replace(':id', id ? id.toString() : '')
    return axios.get(url).catch((err: AxiosError) => {
      return err
    })
  }

  const getMediaId = (file: FormData): Promise<AxiosResponse<any, any>> => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    return axios
      .post(urlConfig.urlUploadMedia, file, { headers })
      .catch((err) => err)
  }

  const onDelete = (id: string): Promise<AxiosResponse<any, any>> => {
    return axios
      .delete(urlConfig.urlMembers.replace(':id', id))
      .catch((err) => err)
  }

  const onEdit = (updated_area: IArea): Promise<AxiosResponse<any, any>> => {
    return axios
      .put(
        urlConfig.urlMembers.replace(':id', updated_area.id ?? ''),
        updated_area
      )
      .catch((err) => err)
  }

  const onToggleArea = (
    id: string,
    is_active: number
  ): Promise<AxiosResponse<any, any>> => {
    return axios
      .put(urlConfig.urlMembers.replace(':id', id), { is_active })
      .catch((err) => err)
  }

  return {
    onGet,
    onCreate,
    onDelete,
    onEdit,
    getMediaId,
    onToggleArea,
  }
}
