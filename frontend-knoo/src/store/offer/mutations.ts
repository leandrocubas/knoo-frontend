

import type { IOffer, IOfferPayloadResponse } from './interface/offer.interface'
import type { IOfferState } from './interface/state.interface';

export const mutations = {
    SET_LOADING(state: IOfferState, isLoading: boolean){
        state.isLoading = isLoading
    },
    SET_OFFER_LIST(state: IOfferState, offers: Array<IOffer>){
        state.offers = offers
    },
    ADD_OFFER_LIST(state: IOfferState, offer: IOffer){
        state.offers = [offer, ...state.offers]
    },
    TOGGLE_ADD_OFFER(state: IOfferState, opened: boolean){
        state.addOpened = opened
    },
    SET_PAYMENT_TYPE(state: IOfferState, paymentType: boolean){
        state.paymentType = paymentType
    },
    SET_CREATE_OFFER_STEP(state: IOfferState, step: number){
        state.createOfferStep = step
    },
    STORAGE_OFFER_EDIT(state: IOfferState, offer: IOffer){
        state.storaged_offer = offer
    },
    REPLACE_OFFER(state: IOfferState, offer: IOffer){
        const oldIndex = state.offers.findIndex((_offer) => Number(offer?.id) === _offer.id)

        if(offer?.checkouts?.length){
            offer.active_checkout = offer?.checkouts[0].active_checkout
        }

        state.offers[oldIndex] = offer
    },
    REMOVE_OFFER(state: IOfferState, id: number){
        state.offers = state.offers.filter(offer => offer.id !== id)
    },
    SET_ACTUAL_ID(state: IOfferState, id: string){
        state.actualId = id
    },
    OFFER(state: IOfferState, offer: IOffer | null){
        state.offer = offer
    },
    CHECKOUT_CHOISE_DIALOG(state: IOfferState, is_checkout_choise_dialog: boolean){
        state.is_checkout_choise_dialog = is_checkout_choise_dialog
    },
};