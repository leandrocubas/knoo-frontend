import type { IProduct, IProductCategory, IProductType } from './interface/product.interface'
import type { IProductState } from '@/store/product/interface/state.interface'

export const mutations = {
    SET_LOADING(state: IProductState, isLoading: boolean){
        state.isLoading = isLoading
    },
    SET_PRODUCT_LIST(state: IProductState, products: Array<IProduct>){
        state.products = products
    },
    TOGGLE_ADD_PRODUCT(state: IProductState, opened: boolean){
        state.addOpened = opened
    },
    ADD_PRODUCT_LIST(state: IProductState, product: IProduct){
        state.products = [product, ...state.products]
    },
    REMOVE_PRODUCT(state: IProductState, id: number){
        state.products = state.products.filter(product => product.id !== id)
    },
    REPLACE_PRODUCT(state: IProductState, product: IProduct){
        const oldIndex = state.products.findIndex((_product) => product.id === _product.id)

        state.products[oldIndex] = { ...product }
    },
    SET_ACTUAL_ID(state: IProductState, id: string){
        state.actualId = id
    },
    SET_PRODUCT_TYPE_LIST(state: IProductState, list: Array<IProductType>){
        state.product_type_list = list
    },
    SET_PRODUCT_CATEGORY_LIST(state: IProductState, list: Array<IProductCategory>){
        state.product_category_list = list
    }
};