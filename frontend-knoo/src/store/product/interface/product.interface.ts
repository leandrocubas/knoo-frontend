
import { ProductRefundValueEnum } from '@/enums/product-refund.enum'

import { Media, type IMedia } from '@/interfaces/media.interface'
import type { IOfferOrderBump } from '@/store/offer/interface/offer.interface'

export interface IProductType {
    id?: number
    name?: string
}

class ProductType {
    public id = 0
    public name = ''

    constructor();
    constructor(params: IProductType);

    constructor(params?: IProductType) {
        this.id = params?.id ?? 0;
        this.name = params?.name ?? '';
    }
}

export interface IProductCategory {
    id?: number
    name?: string
}

export class ProductCategory {
    public id = 0
    public name = ''

    constructor();
    constructor(params: IProductType);
    constructor(params?: IProductType) {
        this.id = params?.id ?? 0;
        this.name = params?.name ?? '';
    }
}

export interface IProduct {
    product_name: string
    product_description: string
    product_type?: IProductType
    product_category?: IProductCategory
    refund_time: number
    user_id?: number
    email_support: string
    whatsapp_support: string
    media_id?: number
    is_blocked?: number
    is_active?: number
    id?: number
    media?: IMedia
    created_at?: string
}

export interface IProductOrderBump {
    product_name: string
    product_id: number
    offers: Array<IOfferOrderBump>
    id: number
    s3_url: string,
}

export class Product {
    public id: number = 0
    public product_name: string = ''
    public product_description: string = ''
    public product_type: IProductType = new ProductType()
    public product_category: IProductCategory = new ProductCategory()
    public refund_time: number = 0
    public user_id: number = 0
    public email_support: string = ''
    public whatsapp_support: string = ''
    public media_id: number = 0
    public media: IMedia = new Media()
    public is_active: number = 0
    public is_blocked: number = 0
    public created_at: string = ''
    constructor()
    constructor(params: IProduct)
    constructor(params?: IProduct){
        this.id = params?.id ?? 0
        this.product_name = params?.product_name ?? ''
        this.product_description = params?.product_description ?? ''
        this.product_type = params?.product_type ?? new ProductType()
        this.product_category = params?.product_category ?? new ProductCategory()
        this.refund_time = params?.refund_time ?? 0
        this.user_id = params?.user_id ?? 0
        this.email_support = params?.email_support ?? ''
        this.whatsapp_support = params?.whatsapp_support ?? ''
        this.media_id = params?.media_id ?? 0
        this.media = params?.media ?? new Media()
        this.is_active = params?.is_active ?? 0
        this.is_blocked = params?.is_blocked ?? 0
        this.created_at = params?.created_at ?? ''
    }
}