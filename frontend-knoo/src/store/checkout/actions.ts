import type { ActionContext } from 'vuex'
import { checkoutService } from './service'
import { useToast } from 'vue-toast-notification'
import type { ICheckoutResponse, IOrderBumpPayload } from './interface/checkout.interface'
import type { ICheckoutState } from './interface/state.interface'


const {
    onGetByHash,
    onEdit,
    getMediaId,
    onGetProductsAndOffer,
    createOrderBump,
    deleteOrderBump
} = checkoutService()

const toast = useToast()

export const actions = {
    async get_checkout_by_hash({ commit }: ActionContext<ICheckoutState, any>, hash: string): Promise<any> {
        commit('SET_LOADING', true)
        const { data } = await onGetByHash(hash)

        if(data.error){
            return Promise.reject(data.error)
        }

        await commit('SET_LOADING', false)
        commit('SET_CHECKOUT_INFO', data.data)
        return Promise.resolve(data.data)
        

    },

    async edit({ commit }: ActionContext<ICheckoutState, any>, checkout: ICheckoutResponse){
        const {
            checkout_title,
            exit_popup,
            order_bump_title,
            id
        } = checkout.checkout_infos

        const {
            timer,
            banner,
            order_bumps,
            configs
        } = checkout

        const { id:product_offering_id } = checkout.offer_data

        const orders = order_bumps.map(order => ({ productsOfferingsId: order.product_offering_id }))

        const body = {
            id,
            checkout_title,
            product_offering_id,
            exit_popup,
            status,
            order_bump_title,
            orders,
            timer,
            banner,
            configs
        }

        delete checkout.banner.s3_name
        delete checkout.banner.s3_url

        commit('SET_LOADING', true)
        const { data } = await onEdit(body as any)
        commit('SET_LOADING', false)


        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        toast.error(data?.data ?? 'Ocorreu um erro inesperado')
        return Promise.reject(data)
    },

    async get_media_id({ commit }: ActionContext<ICheckoutState, any>, file: File){
        commit('SET_BANNER_LOADING', true)
        commit('SET_LOADING', true)
    
        const formData = new FormData()

        formData.append('file', file)

        const { data } = await getMediaId(formData)

        commit('SET_BANNER_LOADING', false)
        commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async get_products_and_offer({ commit }: ActionContext<ICheckoutState, any>, hash: string){
        commit('SET_LOADING', true)

        const { data } = await onGetProductsAndOffer(hash)

        commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        toast.error(data.error.message)
        return Promise.reject(data)
    },
    
    async create_order_bump({ commit }: ActionContext<ICheckoutState, any>, order: IOrderBumpPayload){
        commit('SET_LOADING', true)

        const { data } = await createOrderBump(order)

        commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        toast.error(data.error.message)
        return Promise.reject(data)
    },

    async delete_order_bump({ commit }: ActionContext<ICheckoutState, any>, order_bump_id: number){
        commit('SET_LOADING', true)

        const { data } = await deleteOrderBump(order_bump_id)

        commit('SET_LOADING', false)

        if (data && data.success) {
            return Promise.resolve(data.data)
        }

        toast.error(data.error.message)
        return Promise.reject(data)
    }
}