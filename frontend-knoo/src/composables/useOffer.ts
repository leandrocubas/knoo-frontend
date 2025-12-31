import { computed, ref, toValue } from 'vue'
import { useStore } from 'vuex'
import type { IOffer } from '@/store/offer/interface/offer.interface'
import { useClipboard, usePermission } from '@vueuse/core'
import { useToast } from 'vue-toast-notification'
import type { IUser } from '@/store/user/interface/user.interface'
import { SaleCompletedPageType } from '@/enums/offer.enum'
import { useUtils } from './useUtils'
import { useRouter } from 'vue-router'
import BasicData from '@/components/icons/BasicData.vue'
import Link from '@/components/icons/Link.vue'
import { usePixel } from './usePixel'

export function useOffer(){
    const store = useStore()
    const toast = useToast()
    const router = useRouter()
    const { copy } = useClipboard()
    const { cleanList } = usePixel()
    const { urlRegex } = useUtils()
    const logged_user = computed<IUser | null>(() => store.getters['user/getLoggedUser'])
    const url_base_checkout = ref(import.meta.env.VITE_URL_BASE_CHECKOUT)
    const actual_offer = computed<IOffer>(() => store.getters['offer/actualOffer'])
    const payment_type_state = computed<IUser | null>(() => store.getters['offer/getPaymentType'])
    usePermission('clipboard-read')
    usePermission('clipboard-write')
    
    const offer_list = computed<IOffer[]>(() => store.getters['offer/offerList'])
    const storaged_offer = computed<IOffer>(() => store.getters['offer/get_storaged_offer'])
    const is_add_opened = computed(() => store.getters['offer/addOpened'])
    const is_checkout_choise_dialog = computed(() => store.getters['offer/is_checkout_choise_dialog'])
    const create_offer_step = computed(() => store.getters['offer/getActualCreateOfferStep'])
    const actual_id = computed(() => store.getters['offer/actual_id'])
    const integration_facebook = computed(() => store.getters['pixel/list_to_add'])
    const is_loading = computed(() => store.getters['offer/is_loading'])
    const is_options_opened = ref(false)
    const offer_name = ref('')
    const offer_id = ref()
    const offer_payment_type_unique = ref<boolean>(true)
    const offer_payment_type_recurrent = ref(false)
    
    const offer_description = ref('')
    const offer_fake_price = ref()
    const offer_price = ref()
    const offer_enable_pix = ref(false)
    const offer_enable_card = ref(false)
    const offer_enable_billet = ref(false)
    const offer_payment_method = ref()
    const offer_thanks_page_custom = ref()
    const offer_to_open_checkout = ref()
    const _offer = ref<IOffer>()
    const is_capturing_payment_type = ref(false)
    const can_go_to_next_step = computed(() => _onValidateFields())
    const is_deleting = ref(false)
    const actualStepIndex = ref(0)

    const { pixels_to_add } = usePixel()

    const onNexStep = (step: number) => {
        store.commit('offer/SET_CREATE_OFFER_STEP', step)
    }

    const onCreate = async(offer: IOffer | undefined, product_id: number) => {
        if(offer && product_id){
            offer.product_id = product_id
        }

        if(offer && offer.page_type === SaleCompletedPageType.Knoo){
            offer.sale_completed_page_url = ''
        }

        await store.dispatch('offer/create', {  
            ...offer,
            user_id: logged_user.value?.id,
            integration_facebook: integration_facebook.value,
            recurrently_installments: payment_type_state.value ? 1 : 0,
        }).then((res: { active_checkout: string, offer: IOffer }) => {
            store.commit('offer/OFFER', null)
            store.commit('pixel/CLEAN_LIST')
            store.dispatch('offer/add_offer_list', {
                ...res.offer,
                active_checkout: res.active_checkout
            })
            toggle_add_offer()
            return res
        })
    }

    const toggle = () => is_options_opened.value = !is_options_opened.value

    const toggle_add_offer = () => {
        store.commit('offer/SET_PAYMENT_TYPE', offer_payment_type_unique.value)
        store.commit('offer/OFFER', null)
        store.commit('offer/SET_ACTUAL_ID', null)
        onToggleProductTypeDialog(false)
        cleanList()
        store.commit('offer/TOGGLE_ADD_OFFER', !is_add_opened.value)
    }

    const on_toggle_edit = (offer?: IOffer): void => {
        if(offer){
            _offer.value = offer
            toggle_add_offer()
            return
        }

        _offer.value = undefined
    }

    const onToggleConfirmDeleteDialog = (id: number | undefined, _is_deleting: boolean) => {
        if(id) store.commit('offer/SET_ACTUAL_ID', id)

        is_deleting.value = _is_deleting
    }

    const onToggleDelete = (): void => {
        is_deleting.value = false

        store.dispatch('offer/delete', toValue(actual_id))
                .then(() => store.commit('offer/REMOVE_OFFER', toValue(actual_id)))
    }
    
    
    const copyLink = (text?: string) => {
        if(text){
            copy(`${url_base_checkout.value}/${text}`).then(() => toast.success('Copiado com sucesso'))
        }
    }
   
    const _onValidateFields = (): boolean => {
        if(_offer.value){
            return !!_offer.value.offer_name &&
            !!_offer.value.description &&
            !!_offer.value.fake_price &&
            !!_offer.value.price &&
            +_offer.value.price >= 9 &&
            +_offer.value.fake_price > +_offer.value.price &&
            ( !!_offer.value.enable_pix || !!_offer.value.enable_card || !!_offer.value.enable_billet ) &&
            (
                _offer.value.page_type === SaleCompletedPageType.Personalized ?
                    !!_offer.value.sale_completed_page_url && urlRegex.test(_offer.value.sale_completed_page_url)
                : true
            )
        }

        return false
    }

    const cleanForm = (offer?: IOffer) => {
        _offer.value = undefined
        offer_name.value = ''
        offer_description.value = ''
        offer_fake_price.value = null
        offer_price.value = null
        offer_payment_type_unique.value = true
        offer_payment_type_recurrent.value = false

        store.commit('offer/STORAGE_OFFER_EDIT', null)
        store.commit('offer/TOGGLE_ADD_OFFER', !is_add_opened.value)
        store.commit('offer/REPLACE_OFFER', offer)
    }

    const initForm = (offer: IOffer | null): void => {
        if(offer){
            store.commit('offer/STORAGE_OFFER_EDIT', offer)
            _offer.value = offer
            offer_id.value = offer.id
            offer_name.value = offer.offer_name
            offer_description.value = offer.description
            offer_fake_price.value = offer.fake_price
            offer_price.value = offer.price
            offer_enable_pix.value = offer.enable_pix
            offer_enable_billet.value = offer.enable_billet
            offer_enable_card.value = offer.enable_card
        }
    }

    const onGetOfferByProductId = (product_id: number) => 
        store.dispatch('offer/get_offer_by_product_id', product_id)

    const onToggleProductTypeDialog = (_is_capturing_payment_type: boolean) => {
        is_capturing_payment_type.value = _is_capturing_payment_type
    }

    const onEdit = async(offer?: IOffer): Promise<any> => {
        if(offer && offer.page_type === SaleCompletedPageType.Knoo){
            offer.sale_completed_page_url = ''
        }

        const storaged_offer = store.getters['offer/get_storaged_offer'] as IOffer
        
        return await store.dispatch('offer/edit', {
            ...offer,
            user_id: logged_user.value?.id,
            id: storaged_offer.id,
            integration_facebook: pixels_to_add.value,
            recurrently_installments: storaged_offer.recurrently_installments
        })
    }

    const steps = computed(() => ([
        { completed: true, title: '1. Dados básicos', disabled: false, icon: BasicData },
        { completed: false, title: '2. Integrações', disabled: !actual_offer.value, icon: Link }
    ]))

    const nextStep = () => {
        store.commit('offer/OFFER', { ..._offer.value, recurrentlynstalments: offer_payment_type_unique.value ? 1 : 0 })
        actualStepIndex.value = actualStepIndex.value + 1
    }

    const prevStep = () => {
        actualStepIndex.value = actualStepIndex.value - 1
    }

    const chooseCheckoutBuilder = (offer?: IOffer): void => {
        store.commit('offer/CHECKOUT_CHOISE_DIALOG', !is_checkout_choise_dialog.value)
        
        if(offer){
            offer_to_open_checkout.value = offer
            return
        }
    }

    const openCheckoutBuilder = (offer?: IOffer): void => {
        if(offer){
            const routeData = router.resolve({ path: `checkout/${offer.active_checkout}` })
            window.open(routeData.href, '_blank')
        }
    }
    
   
    return {
        offer_list,
        is_options_opened,
        is_add_opened,
        offer_name,
        offer_description,
        offer_fake_price,
        offer_price,
        offer_payment_method,
        offer_thanks_page_custom,
        is_loading,
        is_capturing_payment_type,
        offer_payment_type_unique,
        offer_payment_type_recurrent,
        create_offer_step,
        can_go_to_next_step,
        _offer,
        offer_enable_pix,
        offer_enable_card,
        offer_enable_billet,
        storaged_offer,
        offer_id,
        is_deleting,
        actual_offer,
        actualStepIndex,
        steps,
        url_base_checkout,
        is_checkout_choise_dialog,
        offer_to_open_checkout,
        onEdit,
        cleanForm,
        onToggleDelete,
        onToggleConfirmDeleteDialog,
        nextStep,
        prevStep,
        onToggleProductTypeDialog,
        onNexStep,
        on_toggle_edit,
        onGetOfferByProductId,
        onCreate,
        toggle,
        copyLink,
        toggle_add_offer,
        initForm,
        chooseCheckoutBuilder,
        openCheckoutBuilder
    }
}