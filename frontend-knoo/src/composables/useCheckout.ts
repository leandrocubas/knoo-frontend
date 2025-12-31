import { CheckoutBanner, type ICheckoutComponent, type ICheckoutOrderBump, type ICheckoutResponse } from '@/store/checkout/interface/checkout.interface'
import { ref, type ComponentInternalInstance, computed, toValue } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import type { ISelect } from '@/interfaces/select.interface'
import { useUtils } from './useUtils'
import type { IOfferOrderBump } from '@/store/offer/interface/offer.interface'
import { cropper } from 'vue-picture-cropper'
import { cloneDeep } from 'lodash'
import type { IProductOrderBump } from '@/store/product/interface/product.interface'
import { useToast } from 'vue-toast-notification'

export function useCheckout(onMounted: (hook: () => any, target?: ComponentInternalInstance | null) => false | Function | undefined, execRequest = true){
    const store = useStore()
    const route = useRoute()
    const toast = useToast()

    const { timeToMilliSeconds, baseURLImages, cursorFollowEffect, isFileSize5MB } = useUtils()

    const fileBlob = ref()
    const onTimeFinished = ref(false)
    const isComponentConfigOpened = ref(false)
    const product_model = ref<string>('')
    const imageOrientation = ref('portrait')
    const imageData = ref()
    const cropOpen = ref(false)
    const pic = ref<string>('')
    const product_list = ref<IProductOrderBump[]>([])
    const offer_list = ref<IOfferOrderBump[]>([])
    const offer_model = ref<string>('')
    const is_preview_mode = computed(() => store.getters['checkout/is_preview_mode'])
    const product_list_select = computed(() =>
        product_list.value
            .map(product => <ISelect>({ value: product.product_id, label: product.product_name })))
    const offer_list_select = computed(() =>
            offer_list.value
                .filter((el) => {
                    const order_bump = order_bumps.value.find(order => order.product_offering_id === el.id)
                    return order_bump ? null : el
                })
                .map(offer => ({ value: offer.id, label: offer.offer_name } as ISelect)))
    const list_components = computed<Array<ICheckoutComponent>>(() => store.getters['checkout/list_components'])
    const checkout = computed<ICheckoutResponse>(() => store.getters['checkout/checkout'])
    const checkout_response = computed<ICheckoutResponse>(() => store.getters['checkout/checkout_response'])
    const is_loading = computed<boolean>(() => store.getters['checkout/is_loading'])
    const is_banner_loading = computed<boolean>(() => store.getters['checkout/is_banner_loading'])
    const timer = computed(() => timeToMilliSeconds(checkout?.value?.timer?.countdown))
    const isLoadingProduct = ref(false)
    const openOrderBumpDialog = ref(false)
    const order_bumps = ref<Array<ICheckoutOrderBump>>([])

    const componentConfigOpened = ref<ICheckoutComponent>()

    onMounted(() => {
        cursorFollowEffect('components', 'cursor')     
        if(execRequest){
            const hash = route.params.hash
            store.dispatch('checkout/get_checkout_by_hash', hash)
                .then(() => {
                    if(checkout_response.value.banner.s3_name) {
                        const img = new Image()
                        imageOrientation.value = img.width > img.height ? 'landscape' : 'portrait'
                        imageData.value = baseURLImages.value + checkout_response.value.banner.s3_name
                        
                        img.onload = () => {
                            imageOrientation.value = img.width > img.height ? 'landscape' : 'portrait'
                        }

                        img.onerror = (error) => {
                            imageData.value = null
                            console.error('Erro ao processar a imagem: ', error)
                        }
                        img.src = imageData.value
                    }
    
                    order_bumps.value = checkout_response.value.order_bumps
                })
        }
    })

    const removeImageBanner = (): void => {
        imageData.value = null
        checkout.value.banner = new CheckoutBanner({
            display: toValue(checkout).banner.display
        })

        store.commit('checkout/SET_CHECKOUT_INFO', checkout.value)
    }
  
    const bannerChanged = (event: any) => {
        const [ file ] = event?.target?.files

        if(!isFileSize5MB(file)){
            toast.error('Arquivo atingiu o limite máximo (5MB)')
            return
        }

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = () => {
                pic.value = String(reader.result)
                cropOpen.value = true
            }

            reader.readAsDataURL(file)

            return
        }

        fileBlob.value = imageData.value = null
        checkout.value.banner.s3_name = ''
        checkout.value.banner.s3_url = ''
    }
    
    const imageStyle = computed(() => imageOrientation.value === 'landscape' ?
      ({ minWidth: '100%', maxHeight: '40vh', borderRadius: '10px' }) :
      ({ maxHeight: '70vh', borderRadius: '10px' })
    )

    const bannerContainerStyle = computed(() => (imageOrientation.value === 'landscape' || imageOrientation.value === 'portrait') && imageData.value ?
      ({ width: '100%', height: 'fit-content' }) :
      !imageData.value ? ({ width: '100%' }) : null
    )


    const openComponentConfig = (component?: ICheckoutComponent): void => {
        componentConfigOpened.value = component

        if(component)
            store.commit('checkout/EDIT_COMPONENT_LIST', component)
        

        isComponentConfigOpened.value = !isComponentConfigOpened.value
    }

    const onChangeProduct = (product_id: string) => {
        const product = product_list.value.find(product => product.product_id === +product_id)

        if(product)
            offer_list.value = product.offers
        
    }

    const toggleDialogOrderBump = (): void => {
        openOrderBumpDialog.value = !openOrderBumpDialog.value
        onGetProductsAndOffer()
    }

    const addOrderBump = (): void => {
        const product = toValue(product_list).find(product => {
            if(toValue(product_model)){
                return product.product_id === +product_model.value
            }
        })

        const offer = toValue(offer_list).find(offer => offer.id === +offer_model.value)

        if(offer && product){
            store.dispatch('checkout/create_order_bump', {
                checkout_id: checkout_response.value.checkout_infos.id,
                products_offerings: [ { products_offerings_id: offer.id } ]
            }).then((res: { id: number }) => { 
                checkout.value.order_bumps = order_bumps.value = [{
                    product_offering_id: offer.id ?? 0,
                    id: res.id,
                    fake_price: offer.fake_price,
                    price: offer.price,
                    offer_name: offer.offer_name,
                    s3_url: product.s3_url
                }, ...order_bumps.value]
            })

            toggleDialogOrderBump()
            product_model.value = ''
            offer_model.value = ''
        }

    }

    const onEdit = async(): Promise<any> => await store.dispatch('checkout/edit', cloneDeep(toValue(checkout)))
        .then((res: ICheckoutResponse) => {
            return res
        })

    const deleteOrderBump = (orderBump: ICheckoutOrderBump) => {
        orderBump.is_deleting = true
        store.dispatch('checkout/delete_order_bump', orderBump.id).then(() => { 
            delete orderBump.is_deleting 
            checkout.value.order_bumps = order_bumps.value = order_bumps.value.filter(order => {
                return order.id !== orderBump.id
            })
        })
    }

    const togglePreviewMode = (): void => 
        store.commit('checkout/TOGGLE_PREVIEW_MODE', !is_preview_mode.value)


    const onGetProductsAndOffer = (): void => {
        isLoadingProduct.value = true
        store.dispatch('checkout/get_products_and_offer', toValue(checkout_response).checkout_infos.checkout_hash)
            .then((res: IProductOrderBump[]) => {
                isLoadingProduct.value = false
                product_list.value = res
            })
    }

    const cropReady = (param: any): void => {
        
    }

    const cropImage = async (): Promise<void> => {
        const file = await cropper?.getFile()
        cropOpen.value = false
        cropper?.clear()    

        if(file && file.type.startsWith('image/')){
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = new Image()
                img.onload = () => imageOrientation.value = img.width > img.height ? 'landscape' : 'portrait'
                img.src = e?.target?.result as any
                fileBlob.value = imageData.value = URL.createObjectURL(file)
                store.dispatch('checkout/get_media_id', file).then(
                    ({ s3_name, id, s3_url }) => {
                        store.commit('checkout/SET_CHECKOUT_INFO', { ...checkout.value, banner: { ...checkout.value.banner, id } })
                    }
                    
                )
            }

            reader.readAsDataURL(file)

            return
        }

        fileBlob.value = imageData.value = null
        checkout.value.banner.s3_name = ''
        checkout.value.banner.s3_url = ''
    }
        
    return {
        fileBlob,
        onTimeFinished,
        isComponentConfigOpened,
        is_loading,
        checkout_response,
        product_list_select,
        isLoadingProduct,
        product_model,
        offer_model,
        offer_list_select,
        timer,
        openOrderBumpDialog,
        offer_list,
        order_bumps,
        checkout,
        list_components,
        componentConfigOpened,
        is_preview_mode,
        imageStyle,
        imageData,
        bannerContainerStyle,
        is_banner_loading,
        pic,
        cropOpen,
        bannerChanged,
        openComponentConfig,
        onChangeProduct,
        toggleDialogOrderBump,
        addOrderBump,
        onEdit,
        deleteOrderBump,
        togglePreviewMode,
        removeImageBanner,
        cropImage,
        cropReady
    }
}