import type { IAbandonedCart } from "./abandoned-cart.interface"
import type { IUnpaidCharges } from "./unpaid-charges.interface"

export interface ISalesRecoveryState {
    isLoading: boolean
    abandonedCartData: Array<IAbandonedCart>
    unpaidChargesData: Array<IUnpaidCharges>
}
