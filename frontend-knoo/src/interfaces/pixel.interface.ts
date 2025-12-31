export interface IPixel {
    pixel_id: string
    access_token: string
    send_initiate_checkout: boolean
    send_purchase_on_approved_payment: boolean
}

export class Pixel implements IPixel {
    constructor(
        public pixel_id: string = '',
        public access_token: string = '',
        public send_initiate_checkout: boolean = false,
        public send_purchase_on_approved_payment: boolean = false
    ){}
}