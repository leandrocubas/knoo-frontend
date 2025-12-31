import type { IOffer } from './interface/offer.interface'
import type { IOfferState } from './interface/state.interface'

export const getters = {
    is_loading: (state: IOfferState): boolean | null => state.isLoading,

    offerList: (state: IOfferState): Array<IOffer> => state.offers,
    addOpened: (state: IOfferState): boolean => state.addOpened,
    getPaymentType: (state: IOfferState): boolean => state.paymentType,
    getActualCreateOfferStep: (state: IOfferState): number => state.createOfferStep,
    get_storaged_offer: (state: IOfferState): IOffer | null => state.storaged_offer,
    actual_id: (state: IOfferState): string => state.actualId,
    actualOffer: (state: IOfferState): IOffer | null => state.offer,
    is_checkout_choise_dialog: (state: IOfferState): boolean => state.is_checkout_choise_dialog,
};