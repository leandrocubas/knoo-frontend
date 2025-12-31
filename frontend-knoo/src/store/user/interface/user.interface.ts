export interface IUser {
    id: number
    email: string
    name: string
    exp: string
    total_sales: number
    created_at: string
    account_type: string
    new_sales_notifications: number
    name_products_sales_notifications: number
    price_products_sales_notifications: number
    refused_products_sales_notifications: number
    new_withdraw_notifications: number
    last_login: string
    updated_at: string
    profile_media_id: number
    card_tax_value: string
    card_money_tax_value: string
    is_blocked: boolean
    pix_tax_value: string
    pix_money_tax_value: string
    pay_configs_pendences: any
}

export class User implements IUser {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public exp: string,
        public total_sales: number = 0,
        public account_type: string,
        public new_sales_notifications: number,
        public name_products_sales_notifications: number,
        public price_products_sales_notifications: number,
        public refused_products_sales_notifications: number,
        public new_withdraw_notifications: number,
        public last_login: string,
        public created_at: string,
        public updated_at: string,
        public profile_media_id: number,
        public card_tax_value: string,
        public card_money_tax_value: string,
        public is_blocked: boolean,
        public pix_tax_value: string,
        public pix_money_tax_value: string,
        public pay_configs_pendences: boolean,
    ){}
}

export interface IPayConfigsPendences {
    configs_account: boolean
    documents: Array<string>
}


