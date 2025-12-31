import type { ICupom } from './cupom.interface'

export interface ICupomState {
    cupons: Array<ICupom>
    cupom: ICupom | null
    isLoading: boolean | null
    addOpened: boolean
    actualId: string
    is_checkout_choise_dialog: boolean
}