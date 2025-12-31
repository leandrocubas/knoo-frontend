import type { IBank } from '@/store/user/interface/bank.interface'

export interface IHistory {
    id: number
    user_id: number
    user_bank_accounts_id: number
    withdrawal_amount: number
    status: string
    tax_value: number
    central_bank_unic_id: number
    account_bank: {
        id: number
        user_id: number
        bank_codes_id: number
        banks_code: IBank
    }
    bank_name?: string
}



