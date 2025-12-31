import type { IProduct, IProductCategory, IProductType } from './interface/product.interface'
import type { IProductState } from '@/store/product/interface/state.interface'

export const getters = {
    isLoading: (state: IProductState): boolean => state.isLoading,

    productList: (state: IProductState): Array<IProduct> => state.products,

    addOpened: (state: IProductState): boolean => state.addOpened,

    actualId: (state: IProductState): string => state.actualId,

    product_type_list: (state: IProductState): Array<IProductType> => state.product_type_list,
    
    product_category_list: (state: IProductState): Array<IProductCategory> => state.product_category_list
};