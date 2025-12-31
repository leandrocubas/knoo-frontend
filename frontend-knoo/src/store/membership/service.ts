
import { urlConfig } from '@/config/url.config'
import { AxiosError, type AxiosResponse } from 'axios'
import axios from '@/config/axios.config'
import type {
  IMembership
} from './interface/membership.interface'

export function membershipService() {
  const onCreate = (
    membership: IMembership
  ): Promise<AxiosResponse<any, any>> => {
    return axios
      .post(urlConfig.urlIntegration, membership)
      .catch((err) => err)
  }

  const onGet = (id_area: string): Promise<any> => {
    const url = urlConfig.urlMembershipIntegrations.replace(
      ':membership_id',
      id_area
    )
    return axios.get(url).catch((err: AxiosError) => {
      return err
    })
  }

  const onGetMembershipOffer = (
    id_area?: string
  ): Promise<AxiosResponse<any, any>> => {
    const url = urlConfig.urlMembershipOffers.replace(
      ':membership_id',
      id_area || ''
    )
    return axios.get(url).catch((err) => err)
  }

  const onDelete = ({
    membership_id,
    offer_id,
  }: {
    membership_id: string
    offer_id: string
  }): Promise<AxiosResponse<any, any>> => {
    return axios
      .delete(
        urlConfig.urlDeleteMembershipOffers
          .replace(':membership_id', membership_id)
          .replace(':offer_id', offer_id)
      )
      .catch((err) => err)
  }

  const onEdit = (
    updated_membership: IMembership
  ): Promise<AxiosResponse<any, any>> => {
    return axios.put(`${urlConfig.urlIntegration}/${updated_membership.id ?? ''}`, updated_membership)
      .catch((err) => err)
  }

  return {
    onGet,
    onGetMembershipOffer,
    onCreate,
    onDelete,
    onEdit,
  }
}
