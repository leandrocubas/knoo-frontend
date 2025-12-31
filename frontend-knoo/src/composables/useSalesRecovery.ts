import type { ITableHeader } from '@/interfaces/table.interface'
import { computed, ref, toValue } from 'vue'
import { useStore } from 'vuex'
import { useUtils } from './useUtils'

export function useSalesRecovery(){
    const store = useStore()
    const { formatMoney } = useUtils()
    const isLoading = computed(() => store.getters['salesRecovery/isLoading'])

    const abandonedCartData = computed(() => store.getters['salesRecovery/abandonedCartData'])
    //const unpaidChargesData = computed(() => store.getters['salesRecovery/unpaidChargesData'])

    const abandonedCartHeaders = ref<Array<ITableHeader>>([
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
        { key: 'cpf', label: 'CPF', mask: '###.###.###-##' },
        { key: 'phone', label: 'Telefone', mask: '(##) #####-####' },
        { key: 'product', label: 'Produto' },
        { key: 'action', label: 'Ações', align: 'right' },
    ])

    const abandonedCartMobileData = computed(() => toValue(abandonedCartData).map(
        (abandonedCard: any) => ({
            ...abandonedCard,
            name_product: [
                { value: abandonedCard.name, isTitle: true },
                { value: abandonedCard.product }
            ]
        })
    ))

    const unpaidChargesMobileData = computed(() => toValue(unpaidChargesData))

    const abandonedCartMobileHeaders = ref<Array<ITableHeader>>([
        { key: 'name_product', label: 'Nome e Produto' },
        { key: 'action', label: 'Ações' },
    ])

    const paidChargesHeaders = ref<Array<ITableHeader>>([
        { key: 'buyer_name', label: 'Nome' },
        { key: 'buyer_email', label: 'E-mail' },
        { key: 'buyer_document_cpf', label: 'CPF', mask: '###.###.###-##' },
        { key: 'type', label: 'Metódo de pagamento' },
        { key: 'total_value', label: 'Valor' },
    ])

    const paidChargesData = ref([])
    const unpaidChargesData = ref([])

    const unpaidChargesHeaders = ref<Array<ITableHeader>>([
        { key: 'buyer_name', label: 'Nome' },
        { key: 'buyer_email', label: 'E-mail' },
        { key: 'buyer_document_cpf', label: 'CPF', mask: '###.###.###-##' },
        { key: 'type', label: 'Metódo de pagamento' },
        { key: 'status', label: 'Status' },
        { key: 'total_value', label: 'Valor' },
        { key: 'action', label: 'Ações' },
    ])

    const unpaidChargesMobileHeaders = ref<Array<ITableHeader>>([
        { key: 'name', label: 'Nome' },
        { key: 'status', label: 'Status' }
    ])

    const definePaymentTypeName = (type: string) => ({
        "pix": "Pix",
        "card": "Cartão",
        "billet": "Boleto",
    }[type]||"")

    const definePaymentStatusName = (type: string) => ({
        "pending_pix": "Aguardando Pagamento",
        "unavailable_pix": "Aguardando Pagamento",
        "waiting_payment": "Pagamento Expirado",
        "not_send": "Não enviado",
        "denied": "Pagamento Recusado",
        "reversed": "Pagamento Reembolsado",
        "refunded": "Pagamento Reembolsado",
        "chargeback": "Pagamento Contestado",
    }[type]||"")

    const onGet = (): void => {
        // TODO: Precisa chamar no onMounted ou no click da tab quando API estiver OK.
        store.dispatch('salesRecovery/get_sales')
        .then((data) => {
            data = data.map((item:any) => {
                return {
                    ...item,
                    total_value: formatMoney(item.total_value / 100),
                    type: definePaymentTypeName(item.type)
                }
            })
            
            paidChargesData.value = data
        })
    }

    const onGetUnpaids = (): void => {
        store.dispatch('salesRecovery/get_unpaid_sales')
        .then((data) => {
            data = data.map((item:any) => {
                return {
                    ...item,
                    total_value: formatMoney(item.total_value / 100),
                    type: definePaymentTypeName(item.type),
                    status: definePaymentStatusName(item.status)
                }
            })
            
            unpaidChargesData.value = data
        })
    }

    const pageChanged = (page: number) => console.log(page)

    return {
        isLoading,
        abandonedCartHeaders,
        abandonedCartMobileHeaders,
        abandonedCartData,
        unpaidChargesData,
        unpaidChargesHeaders,
        paidChargesHeaders,
        abandonedCartMobileData,
        unpaidChargesMobileHeaders,
        unpaidChargesMobileData,
        pageChanged,
        paidChargesData,
        onGet,
        onGetUnpaids
    }
}