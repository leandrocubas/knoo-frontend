import type { ActionContext } from 'vuex'
import { useToast } from 'vue-toast-notification'
import type { IOffer, IOfferPayloadResponse } from './interface/offer.interface'
import { offerService } from './service'
import type { IOfferState } from './interface/state.interface'

const toast = useToast()

const {
    onCreate,
    onGet,
    onDelete,
    onEdit,
    onGetOffersByProductId
} = offerService()

export const actions = {
    

    async create({ commit }: ActionContext<IOfferState, any>, offer: IOffer){
        commit('SET_LOADING', true)

        delete offer.id
        delete offer.created_at

        offer.fake_price = +offer.fake_price
        offer.price = +offer.price

        if(!offer.charge_type)
            delete offer.charge_type

        const { data } = await onCreate(offer)
        
        commit('SET_LOADING', false)
        
        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },
    
    async get({ commit }: ActionContext<IOfferState, any>, id?: number) {
        commit('SET_LOADING', true)
        const { data } = await onGet(id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async get_offer_by_product_id({ commit }: ActionContext<IOfferState, any>, product_id: string) {
        commit('SET_LOADING', true)
        
        const { data } = await onGetOffersByProductId(product_id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            
            
            commit('SET_OFFER_LIST', data.data.data.map((el: IOffer) => {
                if(el.checkouts?.length){
                    const [ checkout ] = el.checkouts
                    el.active_checkout = checkout.active_checkout
                }

                return el
            }))

            return Promise.resolve(data.data.data)
        }

        return Promise.reject(data)
    },

    async delete({ commit }: ActionContext<IOfferState, any>, id: number) {
        commit('SET_LOADING', true)
        const { data } = await onDelete(id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async edit({ commit }: ActionContext<IOfferState, any>, offer: IOffer) {
        commit('SET_LOADING', true)
                
        delete offer.created_at
        delete offer.product_id
       
        const { data } = await onEdit({ ...offer, price: +offer.price, fake_price: +offer.fake_price })

        await commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    add_offer_list: ({ commit }: ActionContext<IOfferState, any>, offer: IOfferPayloadResponse) =>
        commit('ADD_OFFER_LIST', offer)
}