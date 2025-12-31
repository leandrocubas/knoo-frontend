import type { IProductState } from '@/store/product/interface/state.interface'


export const login_state: IProductState = {
    products: [],
    isLoading: false,
    addOpened: false,
    actualId: '',
    product_type_list: [],
    product_category_list: []
}