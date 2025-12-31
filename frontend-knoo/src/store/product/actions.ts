import type { ActionContext } from 'vuex'
import { useToast } from 'vue-toast-notification'
import type { IProductState } from '@/store/product/interface/state.interface'
import { productService } from './service'
import type { IProduct, IProductType } from '@/store/product/interface/product.interface'

const {
    onDelete,
    onGet,
    getMediaId,
    onCreate,
    onEdit,
    onGetProductTypes,
    onGetProductCategories,
    onToggleProduct
} = productService()
const toast = useToast()

export const actions = {

    async create({ commit }: ActionContext<IProductState, any>, product: IProduct){
        commit('SET_LOADING', true)

        delete product.id
        delete product.is_active
        delete product.created_at 
        
        delete product.user_id
        delete product.is_blocked
        delete product.media
        product.whatsapp_support = product.whatsapp_support.replace(/([(,) -])+/g, '')

        if(!product.media_id)
            delete product.media_id

        const { data } = await onCreate(product)

        commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        toast.error('Erro ao criar o produto' ?? '')
        return Promise.reject(data)
    },

    async edit({ commit }: ActionContext<IProductState, any>, { product, isStatusEdit }: { product: IProduct, isStatusEdit: boolean }){
        if(!isStatusEdit){
            commit('SET_LOADING', true)
        }

        product.whatsapp_support = product.whatsapp_support.replace(/([(,) -])+/g, '')
        delete product.created_at
        delete product.is_blocked
        delete product.user_id
        delete product.media
        delete product.is_active
        delete product.is_blocked

        if(!product.media_id)
            delete product.media_id

        

        const { data } = await onEdit(product)

        if(!isStatusEdit){
            commit('SET_LOADING', false)
        }

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async toggle_product({ commit }: ActionContext<IProductState, any>, { is_active, id }: { is_active: number, id: number }){
        const { data } = await onToggleProduct(id, is_active)

        if (data && data.success) {
            toast.success(data.message)
            commit('REPLACE_PRODUCT', data.data)
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },
    
    async get({ commit }: ActionContext<IProductState, any>, id?: number) {
        commit('SET_LOADING', true)
        const { data } = await onGet(id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            const { data:product_list } = data.data

            commit('SET_PRODUCT_LIST', product_list)
            return Promise.resolve(data.data)
        }

        toast.error('Erro ao recuperar o produto' ?? '')
        return Promise.reject(data)
    },

    async delete({ commit }: ActionContext<IProductState, any>, id: string) {
        commit('SET_LOADING', true)
        const { data } = await onDelete(id)

        await commit('SET_LOADING', false)

        if (data && data.success) {
            toast.success(data.message)
            return Promise.resolve(data.data)
        }

        toast.error('Erro ao deletar o produto' ?? '')
        return Promise.reject(data)
    },

    toggle_add_product: ({ commit }: ActionContext<IProductState, any>, opened: boolean) => commit('TOGGLE_ADD_PRODUCT', opened),    

    async get_media_id({ commit }: ActionContext<IProductState, any>, file: File){
        commit('SET_LOADING', true)
    
        const formData = new FormData()
        
        formData.append('file', file)        

        const { data } = await getMediaId(formData)

        commit('SET_LOADING', false)

        if (data && data.success && data.success) {
            return Promise.resolve({ id: data.data.id, s3_url: data.data.s3_url})
        }

        return Promise.reject(data)
    },

    async get_product_type_list({ commit }: ActionContext<IProductState, any>){
        commit('SET_LOADING', true)

        const { data } = await onGetProductTypes()

        commit('SET_LOADING', false)

        if (data && data.success) {
            commit('SET_PRODUCT_TYPE_LIST', (data.data as IProductType[]).map(el => ({
                value: el.id,
                label: el.name
            })))
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    async get_product_category_list({ commit }: ActionContext<IProductState, any>){
        commit('SET_LOADING', true)

        const { data } = await onGetProductCategories()

        commit('SET_LOADING', false)

        if (data && data.success) {
            commit('SET_PRODUCT_CATEGORY_LIST', (data.data as IProductType[]).map(el => ({
                value: el.id,
                label: el.name
            })))
            return Promise.resolve(data.data)
        }

        return Promise.reject(data)
    },

    add_product_to_list: ({ commit }: ActionContext<IProductState, any>, product: IProduct) =>
        commit('ADD_PRODUCT_LIST', product)
}