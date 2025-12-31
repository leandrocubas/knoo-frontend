import type { IOffer } from './offer.interface'

export interface IOfferState {
    offers: Array<IOffer>
    offer: IOffer | null
    isLoading: boolean | null
    addOpened: boolean
    paymentType: boolean
    createOfferStep: number
    storaged_offer: IOffer | null
    actualId: string
    is_checkout_choise_dialog: boolean
}