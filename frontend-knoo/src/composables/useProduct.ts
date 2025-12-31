import { ref, computed, toValue } from 'vue'
import { useStore } from 'vuex'
import { Product, type IProduct } from '@/store/product/interface/product.interface'
import { useProfile } from './useProfile'
import type { ISelect } from '@/interfaces/select.interface'
import { ProductRefundTextEnum, ProductRefundValueEnum } from '@/enums/product-refund.enum'
import { cloneDeep } from 'lodash'
import { Media } from '@/interfaces/media.interface'

export function useProduct() {
    const store = useStore()
    const { loggedUser } = useProfile()

    const isOptionsOpened = ref(false)
    const isAddOpened = computed(() => store.getters['product/addOpened'])
    const actualId = computed(() => store.getters['product/actualId'])
    const isDeleting = ref(false)
    const isSquareMode = ref(true)
    const isLoading = computed(() => store.getters['product/isLoading'])

    const product_category_list = computed(() => store.getters['product/product_category_list'])
    const product_type_list = computed(() => store.getters['product/product_type_list'])
    const product_refund_deadline_list = ref(Object.entries(ProductRefundTextEnum).map(([value, label]) => ({ value, label } as ISelect)))

    // add Form
    const canAddProduct = computed(() => _onValidateFields())
    const product_name = ref('')
    const product_description = ref('')
    const product_type = ref()
    const product_category = ref()
    const product_id = ref()
    const product_description_card_invoice = ref('Compra*Knoo')
    const product_refund_deadline = ref('')
    const _product = ref()
    const product_media = ref()
    const product_refund_deadline_custom = ref('')
    const product_support_email = ref('')
    const product_support_whatsapp = ref('')
    const product_image = ref(new File([], ''))
    const imagePath = ref('')
    const product_list = computed<IProduct[]>(() => store.getters['product/productList'])

    const toggle_add_product = () => {
        cleanForm()
        store.dispatch('product/toggle_add_product', !isAddOpened.value)
    }

    const toggle = () => isOptionsOpened.value = !isOptionsOpened.value

    

    const onDelete = () => {
        isDeleting.value = false

        store.dispatch('product/delete', actualId.value)
            .then(() => {
                store.commit('product/REMOVE_PRODUCT', actualId.value)
            })
    }
            
    const onToggleConfirmDeleteDialog = (id: number | undefined, _isDeleting: boolean) => {
        if(id) store.commit('product/SET_ACTUAL_ID', id)

        isDeleting.value = _isDeleting
    }
            
    const onGet = (id?: number) => 
        store.dispatch('product/get', id)
    
    const onCreate = async(): Promise<void> => {
        const product = await populateProduct()

        await store.dispatch('product/create', cloneDeep(product))
            .then((res: IProduct) => {
                cleanForm()
                toggle_add_product()
                store.dispatch('product/add_product_to_list',
                    { ...res, media: { s3_url: product.media?.s3_url, id: product.media?.id }}
                )

                return res
            })
    }

    const onEdit = async(_product?: IProduct): Promise<any> => {
        let product: IProduct
        if(_product){
            product = _product
        } else {
            product = await populateProduct()
        }

        return await store.dispatch('product/edit', cloneDeep({ product, isStatusEdit: !!_product }))
            .then((res: IProduct) => {
                if(!_product){
                    cleanForm()
                    toggle_add_product()
                }

                store.commit('product/REPLACE_PRODUCT', { ...res, media: { s3_url: product.media?.s3_url, id: product.media?.id }})

                return res
            })
    }
    
    const onToggleProduct = async(product: IProduct): Promise<any> => {
        return await store.dispatch('product/toggle_product', cloneDeep({ is_active: product.is_active ? 0 : 1, id: product.id }))
            .then((res: IProduct) => {

                store.commit('product/REPLACE_PRODUCT', { ...res, media: { s3_url: product.media?.s3_url, id: product.media?.id }})
                return res
            })
    }

    const _onValidateFields = (): boolean => 
        !!product_name.value &&
        !!product_description.value &&
        !!product_type.value &&
        !!product_category.value &&
        (product_refund_deadline.value === 'CUSTOM' ? +product_refund_deadline_custom.value >= 7 : !!product_refund_deadline.value) &&
        !!product_support_email.value &&
        !!product_support_whatsapp.value &&
        product_support_whatsapp.value.length >= 14

    const _getMediaId = async() => 
        await store.dispatch('product/get_media_id', product_image.value)

    const getImageByS3Name = (s3Name: string | undefined): any => {
        return store.dispatch('product/getImageByS3Name', s3Name)
    }

    const cleanForm = () => {
        product_category.value = ''
        product_description.value = ''
        product_type.value = ''
        product_refund_deadline.value = ''
        product_support_email.value = ''
        product_support_whatsapp.value = ''
        product_refund_deadline_custom.value = ''
        product_id.value = null
        product_media.value = null
    }
    
    const initForm = async(product: IProduct): Promise<void> => {

        product_media.value = product.media
        product_name.value = product.product_name
        product_description.value = product.product_description
        product_refund_deadline.value = ProductRefundValueEnum[product.refund_time] as keyof typeof ProductRefundValueEnum
        product_support_email.value = product.email_support
        product_support_whatsapp.value = product.whatsapp_support
        product_type.value = product.product_type?.id
        product_category.value = product.product_category?.id
        product_id.value = product.id

        if(product.refund_time > 3){
            product_refund_deadline.value = ProductRefundValueEnum[3]
            product_refund_deadline_custom.value = product.refund_time.toString()
        }
    }

    const onToggleEdit = (product?: IProduct): void => {
        if(product){
            _product.value = product
            toggle_add_product()
            return
        }
    
        _product.value = null
    }

    const populateProduct = async(): Promise<IProduct> => {
        let media = new Media()

        if(product_image.value.size){
            media = await _getMediaId()
        }

        if(product_media.value && !product_image.value.size){
            media = product_media.value
        }

        
        let product_refund_time_key: any
        let product_refund_time_value: number

        if(product_refund_deadline.value === 'CUSTOM'){
            product_refund_time_value = +product_refund_deadline_custom.value
        } else {
            product_refund_time_key = product_refund_deadline.value as keyof typeof ProductRefundTextEnum
            product_refund_time_value = ProductRefundValueEnum[product_refund_time_key] as any
        }

        return new Product({
            id: toValue(product_id),
            product_name: toValue(product_name),
            product_description: toValue(product_description),
            product_type: toValue(product_type),
            product_category: toValue(product_category),
            refund_time: +toValue(product_refund_time_value),
            user_id: toValue(loggedUser)?.id,
            email_support: toValue(product_support_email),
            whatsapp_support: toValue(product_support_whatsapp),
            media_id: media?.id,
            media
        })
    }

    const onGetProductTypes = async () => {
        await store.dispatch('product/get_product_type_list')
    }

    const onGetProductCategories = async () => {
        await store.dispatch('product/get_product_category_list')
    }

    return {
        isOptionsOpened,
        isAddOpened,
        product_list,
        isSquareMode,
        product_name,
        product_description,
        product_type,
        product_category,
        product_description_card_invoice,
        product_refund_deadline,
        product_support_email,
        product_support_whatsapp,
        product_image,
        canAddProduct,
        isLoading,
        product_category_list,
        product_type_list,
        product_refund_deadline_list,
        isDeleting,
        product_refund_deadline_custom,
        _product,
        imagePath,
        toggle_add_product,
        toggle,
        onDelete,
        onGet,
        onCreate,
        onEdit,
        initForm,
        onToggleEdit,
        getImageByS3Name,
        onGetProductTypes,
        onToggleConfirmDeleteDialog,
        onGetProductCategories,
        onToggleProduct
    }
}