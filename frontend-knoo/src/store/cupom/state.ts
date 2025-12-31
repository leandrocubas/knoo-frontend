import type { IOfferState } from './interface/state.interface'

export const offer_state: IOfferState = {
    offers: [],
    offer: null,
    isLoading: null,
    addOpened: false,
    paymentType: false,
    createOfferStep: 0,
    storaged_offer: null,
    actualId: '',
    is_checkout_choise_dialog: false
}