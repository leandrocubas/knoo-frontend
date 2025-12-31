    
interface IProductOffering {
    id: number
    product_id: number
    offer_name: string
}

interface IUsageLog {
    id: number
    offer_coupon_id: number
    payment_id: number | null
    transaction_id: string
    original_price: string
    final_price: string
}

export interface ICupom {
    id?: number
    id_oferta_aplicada?: number
    product_offering_id: number
    code: string
    description: string
    percentage: string
    max_uses: string
    applies_to_order_bumps: boolean
    product_id: string
    expires_at: string
    applies_to_total?: boolean
    used_count?: number
    is_active?: boolean
    created_by_user?: number
    product_offering?: IProductOffering
    usage_logs?: IUsageLog[]
}



export class Cupom implements ICupom {
    constructor(
        public id: number = 0,
        public id_oferta_aplicada: number = 0,
        public product_offering_id: number = 0,
        public code: string = '',
        public description: string = '',
        public product_id: string = '',
        public percentage: string = '',
        public max_uses: string = '',
        public applies_to_order_bumps: boolean = false,
        public expires_at: string = '',
        public applies_to_total: boolean = false,
        public used_count: number = 0,
        public is_active: boolean = true,
        public created_by_user: number = 0,
        public product_offering: IProductOffering = {
            id: 0,
            product_id: 0,
            offer_name: ''
        },
        public usage_logs: IUsageLog[] = []
    ){}
}