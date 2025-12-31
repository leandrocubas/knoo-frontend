import { computed, ref, toValue } from 'vue'
import { useStore } from 'vuex'
import { usePermission } from '@vueuse/core'
import { useToast } from 'vue-toast-notification'
import { Cupom, type ICupom } from '@/store/cupom/interface/cupom.interface'
import { useUtils } from './useUtils'
import { useOffer } from './useOffer'
import type { IOffer } from '@/store/offer/interface/offer.interface'

export function useCupom(){
    const store = useStore()
    const toast = useToast()
    const { hasSpecialCharacters } = useUtils()
    usePermission('clipboard-read')
    usePermission('clipboard-write')
    
    const manage_cupom_ref = ref(false)
    const is_editing_cupom = ref(false)
    const is_deleting = ref(false)
    const list_offers = ref<IOffer[]>([])
    const cupom_list = computed<ICupom[]>(() => store.getters['cupom/cupomList'])
    const cupom = ref<ICupom>(new Cupom())
    const is_loading = computed(() => store.getters['cupom/is_loading'])

    const { onGetOfferByProductId } = useOffer()

    const onGetCupom = () => {
        store.dispatch('cupom/get')
    }
 
    const onToggleCupomDialog = (is_adding_cupom: boolean, _cupom?: ICupom) => {
        manage_cupom_ref.value = is_adding_cupom

        if(_cupom){
            is_editing_cupom.value = true
            cupom.value = {
                ..._cupom,
                expires_at: _cupom.expires_at.split('T')[0]
            }
        } else {
            is_editing_cupom.value = false
            cupom.value = new Cupom()
        }
    }

    const onAddCupom = () => {
        const cupom_to_create = {
            product_offering_id: Number(toValue(cupom).product_offering_id),
            code: toValue(cupom).code.toUpperCase(),
            percentage: Number(toValue(cupom).percentage),
            max_uses: Number(toValue(cupom).max_uses),
            applies_to_order_bumps: toValue(cupom).applies_to_order_bumps,
            expires_at: toValue(cupom).expires_at,
            description: toValue(cupom).description,
        }

        if(formIsValid()){
            onToggleCupomDialog(false)
            store.dispatch('cupom/create', {
                ...cupom_to_create
            }).then(() => {
                onGetCupom()
                cupom.value = new Cupom()
            })
            .catch((err) => {
                cupom.value = new Cupom()
                toast.error('Erro ao adicionar cupom')
                console.error(err)
            })
            
            return
        }
    }

    const onEditCupom = (_cupom: ICupom) => {
        const cupom_to_edit = {
            code: toValue(_cupom).code.toUpperCase(),
            percentage: Number(toValue(_cupom).percentage),
            max_uses: Number(toValue(_cupom).max_uses),
            applies_to_order_bumps: toValue(_cupom).applies_to_order_bumps,
            expires_at: toValue(_cupom).expires_at,
            description: toValue(_cupom).description,
            id: _cupom.id,
            product_offering_id: Number(toValue(_cupom).product_offering_id),
        }

        if(formIsValid()){
            store.dispatch('cupom/edit', cupom_to_edit)
            .then(() => {
                onToggleCupomDialog(false)
                onGetCupom()
                cupom.value = new Cupom()
            })
            .catch((err) => {
                cupom.value = new Cupom()
                onToggleCupomDialog(false)
                toast.error('Erro ao editar cupom')
                console.error(err)
            })
            
            return
        }
    }

    const onManageCupom = () => {

        if(is_editing_cupom.value){
            onEditCupom(toValue(cupom))
        } else {
            onAddCupom()
        }
    }

    const formIsValid = () => {
        if(hasSpecialCharacters(toValue(cupom).code)){
            toast.error('O código não pode conter caracteres especiais')
            return false
        }

        if(Number(toValue(cupom).percentage) < 0 || Number(toValue(cupom).percentage) > 100){
            toast.error('A porcentagem deve ser entre 0 e 100')
            return false
        }

        return true
    }


    const onChangeProduct = async (product_id: number) => {
        list_offers.value = await onGetOfferByProductId(product_id)
    }

    const onToggleConfirmDeleteDialog = (_is_deleting: boolean, id?: number) => {
        if(id) cupom.value.id = id

        is_deleting.value = _is_deleting
    }

    const onDeleteCupom = (): void => {
        is_deleting.value = false
        store.dispatch('cupom/delete', toValue(cupom).id)
            .then(() => {
                onGetCupom()
            })
            .catch((err) => {
                toast.error('Erro ao deletar cupom')
                console.error(err)
            })
    }
   
    return {
        cupom_list,
        is_loading,
        manage_cupom: manage_cupom_ref,
        cupom,
        list_offers,
        is_editing_cupom,
        is_deleting,
        onGetCupom,
        onToggleCupomDialog,
        onManageCupom,
        onChangeProduct,
        onDeleteCupom,
        onToggleConfirmDeleteDialog
    }
}