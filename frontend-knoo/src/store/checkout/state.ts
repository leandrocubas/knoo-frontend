import { CheckoutComponentsEnum } from "@/enums/checkout-components.enum";
import type { ICheckoutState } from "./interface/state.interface";


export const checkout_state: ICheckoutState = {
    checkout: null,
    checkout_response: null,
    is_loading: false,
    is_preview_mode: false,
    is_banner_loading: false,
    list_components: [
        { name: 'Crônometro', icon: 'timer', id: CheckoutComponentsEnum.TIMER, showing: true },
        { name: 'Banner', icon: 'image', id: CheckoutComponentsEnum.BANNER, showing: true },
        { name: 'Order Bumps', icon: 'order-bump', id: CheckoutComponentsEnum.ORDER_BUMP, showing: true },
        { name: 'Config.', icon: 'config', id: CheckoutComponentsEnum.CONFIG, showing: true }
    ]
}