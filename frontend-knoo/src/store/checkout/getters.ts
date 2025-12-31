import type { ICheckoutComponent, ICheckoutResponse } from './interface/checkout.interface';
import type { ICheckoutState } from './interface/state.interface'

export const getters = {
    is_loading: (state: ICheckoutState): boolean => state.is_loading,
    is_banner_loading: (state: ICheckoutState): boolean => state.is_banner_loading,
    checkout_response: (state: ICheckoutState): ICheckoutResponse | null => state.checkout_response,
    checkout: (state: ICheckoutState): ICheckoutResponse | null => state.checkout,
    list_components: (state: ICheckoutState): Array<ICheckoutComponent> | null => state.list_components,
    is_preview_mode: (state: ICheckoutState): boolean => state.is_preview_mode,
};