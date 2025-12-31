import type { IPixel } from "@/interfaces/pixel.interface"
import type { ICheckout } from "@/store/checkout/interface/checkout.interface"
import type { IProduct } from "@/store/product/interface/product.interface"


export interface IOffer {
    id?: number
    offer_name: string
    description: string
    fake_price: number
    price: number
    page_type: string
    sale_completed_page_url: string 
    offer_type: string
    charge_type?: string
    recurrently_installments: number
    product_id?: number 
    integration_facebook: Array<IPixel>
    user_id: string 
    enable_card: boolean
    enable_pix: boolean
    enable_billet: boolean
    created_at?: string,
    checkouts?: Array<ICheckout>
    active_checkout?: string
}

export interface IOfferOrderBump {
    id?: number
    offer_name: string
    description: string
    fake_price: number
    price: number
}

export interface IOfferPayloadResponse extends IProduct {
    // activeCheckout: IActiveCheckout
    // productsOfferings: IOffer
    offers: Array<IOffer>
}

export interface IActiveCheckout {
    id?: string
    identifierHash?: string
}

export class Offer implements IOffer {
    constructor(
       public id: number = 0,
       public offer_name: string = '',
       public description: string = '',
       public fake_price: number = 0,
       public price: number = 0,
       public page_type: string = '',
       public sale_completed_page_url: string = '',
       public offer_type: string = 'Unic',
       public charge_type: string = 'Annual',
       public recurrently_installments: number = 0,
       public product_id: number = 0,
       public user_id: string = '',
       public enable_card: boolean = false,
       public enable_pix: boolean = false,
       public enable_billet: boolean = false,
       public created_at: string = '',
       public integration_facebook: Array<IPixel> = [],
    ){}
}