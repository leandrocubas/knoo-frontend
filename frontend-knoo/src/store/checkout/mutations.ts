import { type ICheckoutComponent, type ICheckoutResponse } from './interface/checkout.interface'
import type { ICheckoutState } from './interface/state.interface'

export const mutations = {
    SET_LOADING(state: ICheckoutState, is_loading: boolean){
        state.is_loading = is_loading
    },
    SET_BANNER_LOADING(state: ICheckoutState, is_loading: boolean){
        state.is_banner_loading = is_loading
    },
    SET_CHECKOUT_INFO(state: ICheckoutState, checkout: ICheckoutResponse){
        

        if(!checkout.configs){
            checkout.configs = { background_color: '#000' }
        }

        state.checkout_response = state.checkout = checkout
    },
    EDIT_COMPONENT_LIST(state: ICheckoutState, _component: ICheckoutComponent){
        state.list_components = state.list_components.map(component => {
            if(component.id === _component.id) {
                component = _component
            }

            return component
        })
    },
    TOGGLE_PREVIEW_MODE(state: ICheckoutState, is_preview_mode: boolean){
        state.is_preview_mode = is_preview_mode
    }
};