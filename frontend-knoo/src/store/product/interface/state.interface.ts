import type { IProduct, IProductCategory, IProductType } from './product.interface'

export interface IProductState {
    products: Array<IProduct>
    isLoading: boolean
    addOpened: boolean
    actualId: string
    product_type_list:  Array<IProductType>
    product_category_list:  Array<IProductCategory>
}