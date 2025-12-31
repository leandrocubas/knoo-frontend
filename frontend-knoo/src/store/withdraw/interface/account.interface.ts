import type { IBank } from "@/store/user/interface/bank.interface"

export interface IAccount {
    id: number
    banks_codes_id: number
    responsible_name: string
    responsible_document: string
    account_type: string
    account_number: string
    account_agency: string
    account_check_digit: string
    pix_type_key: string
    is_active: boolean
    pix_key: string
    type?: string
    bank?: string
    banks_code?: IBank
    is_loading?: boolean
}