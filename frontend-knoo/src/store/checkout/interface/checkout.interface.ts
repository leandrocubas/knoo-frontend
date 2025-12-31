
import type { IPagination } from '@/interfaces/pagination.interface'
import type { IOffer } from '@/store/offer/interface/offer.interface'

export interface ICheckoutComponent {
    name: string
    icon: string
    id: number | null
    showing: boolean
}

export interface IProductsToOrderBump {
    title: string
    productsOfferings: Array<IOffer>
    nameS3: string
    description: string
    id: string
}

export interface IOrderBump {
    products_offerings_id: number
}

export interface IOrderBumpPayload {
    checkout_id: number
    products_offerings: Array<IOrderBump>
}

export interface ICheckoutProduct {
    id: string
    description: string
    mediaName: string
    supportEmail?: string
    supportPhone?: string
    title: string
}

export interface ICheckoutConfig {
    background_color: string
}

export interface ICheckoutOffer {
    fake_price: string
    id: number
    offer_name: string
    price: string
}

export interface ICheckoutOrderBump {
    id: number
    is_deleting?: boolean
    price: number
    fake_price: number
    offer_name: string
    product_offering_id: number
    s3_url: string
}

export interface ICheckoutResponse {
    banner: ICheckoutBanner
    checkout_infos: ICheckout
    configs: ICheckoutConfig
    offer_data: ICheckoutOffer
    order_bumps: Array<ICheckoutOrderBump>
    timer: ICheckoutTimer
}

export interface ICheckoutTimer {
    id: number
    timer_title: string
    end_timer_title: string
    timer_title_color: string
    timer_icon_color: string
    timer_bg_color: string
    timer_progressbar_bg_color: string
    timer_progressbar_color: string
    is_fixed: boolean
    countdown: string
    display: boolean
}

export class CheckoutTimer implements ICheckoutTimer {
    constructor(
        public id: number = 0,
        public timer_title = '',
        public end_timer_title = '',
        public timer_title_color = '',
        public timer_icon_color = '',
        public timer_progressbar_bg_color = '',
        public timer_progressbar_color = '',
        public timer_bg_color = '',
        public countdown = '00:10:00',
        public display = true,
        public is_fixed = false,
    ) {}
}

export interface ICheckoutBanner {
    s3_name?: string
    s3_url?: string
    display: boolean
}

export class CheckoutBanner implements ICheckoutBanner {

    public display: boolean = false
    public s3_name: string = ''
    public s3_url: string = ''

    constructor()
    constructor(params: ICheckoutBanner)
    constructor(params?: ICheckoutBanner){
        this.display = params?.display ?? false
        this.s3_name = params?.s3_name ?? ''
        this.s3_url = params?.s3_url ?? ''
    }
}

export interface ICheckout {
    checkout_hash: string
    checkout_title: string
    active_checkout?: string
    exit_popup: boolean
    id: number
    order_bump_title: string
}