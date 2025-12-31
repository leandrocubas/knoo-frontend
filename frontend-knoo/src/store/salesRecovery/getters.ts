import type { IAbandonedCart } from './interface/abandoned-cart.interface'
import type { ISalesRecoveryState } from './interface/state.interface'
import type { IUnpaidCharges } from './interface/unpaid-charges.interface';


export const getters = {
    isLoading: (state: ISalesRecoveryState): boolean => state.isLoading,
    abandonedCartData: (state: ISalesRecoveryState): Array<IAbandonedCart> => state.abandonedCartData,
    unpaidChargesData: (state: ISalesRecoveryState): Array<IUnpaidCharges> => state.unpaidChargesData
};