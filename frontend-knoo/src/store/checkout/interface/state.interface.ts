import type { ICheckoutComponent, ICheckoutResponse } from './checkout.interface'


export interface ICheckoutState {
    checkout: ICheckoutResponse | null
    checkout_response: ICheckoutResponse | null
    is_loading: boolean
    is_banner_loading: boolean
    list_components: Array<ICheckoutComponent>
    is_preview_mode: boolean
}
