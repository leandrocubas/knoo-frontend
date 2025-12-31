import { type IPagination } from '@/interfaces/pagination.interface'
import type { ITableHeader } from '@/interfaces/table.interface'
import type { IHistory } from '@/store/withdraw/interface/withdraw.interface'
import { computed, ref, toValue, type ComponentInternalInstance } from 'vue'
import { useStore } from 'vuex'
import { format } from 'date-fns'
import { useUtils } from '@/composables/useUtils'
import { useToast } from 'vue-toast-notification'
import type { IAccount } from '@/store/withdraw/interface/account.interface'


const { formatMoney } = useUtils()
export function useWithdraw() {
    const store = useStore()
    const pending = ref(0)
    const withdraw = ref(0)
    const total = ref(0)
    const accounts_pagination = ref<IPagination>()
    const pendingComp = computed(() => formatMoney(pending.value))
    const withdrawComp = computed(() => formatMoney(withdraw.value))
    const totalComp = computed(() => formatMoney(total.value))
    const isWithdrawInfoLoading = computed(() => store.getters['withdraw/isWithdrawInfoLoading'])
    const isLoadingHistory = computed(() => store.getters['withdraw/isLoadingHistory'])
    const logged_user = computed(() => store.getters['user/getLoggedUser'])

    const amount = ref('')
    const withdrawHistory = computed<Array<IHistory>>(() => store.getters['withdraw/history'])
    const accounts = computed<Array<IAccount>>(() => store.getters['withdraw/accounts'])
    const isRequestLoading = computed<boolean>(() => store.getters['withdraw/isRequestLoading'])
    const isNewWithdrawOpen = ref(false)
    const isLoadingAccountBank = computed<boolean>(() => store.getters['withdraw/isLoadingAccountBank'])
    const isAddingNewAccount = ref(false)
    const isNewAccountBankOpen = ref(false)
    const withdrawHistorMobile = computed(() => toValue(withdrawHistory).map(
        (data: any) => ({
            ...data,
            date_price: [
                { value: format(data.date, 'dd/MM/yyyy HH:mm'), isTitle: true },
                { value: `${formatMoney(data.price)}` }
            ]
        })
    ))

    const pagination_history = computed<IPagination>(() => store.getters['withdraw/pagination_history'])
    
    const isLoading = computed(() => store.getters['withdraw/isLoading'])
    
    const headers = ref<Array<ITableHeader>>([        
        { key: 'withdrawal_amount', label: 'Valor', isMoney: true },
        { key: 'bank_name', label: 'Banco' },
        { key: 'action', label: 'Status', align: 'center'  },
    ])

    const accountBankHeaders = ref<Array<ITableHeader>>([
        { key: 'bank', label: 'Banco' },
        { key: 'account_agency', label: 'Agência' },
        { key: 'account', label: 'Conta' },
        { key: 'type', label: 'Tipo de conta' },
        { key: 'component2', label: 'Conta ativa', align: 'center' },
        { key: 'component', label: 'Status', align: 'center' },
        { key: 'action', label: 'Ações', align: 'right' },
    ])

    const headersMobile = ref<Array<ITableHeader>>([
        { key: 'date_price', label: 'Data e Valor' },
        { key: 'action', label: 'Status' },
    ])

    const toggleWithdraw = () => {
        isNewWithdrawOpen.value = !toValue(isNewWithdrawOpen)
    }

    const requestWithdraw = () => {
        store.dispatch('withdraw/request_withdraw', amount.value)
            .then(() => {
                isNewWithdrawOpen.value = !toValue(isNewWithdrawOpen)
                requestWithdrawInfos()
                getHistory()
            })
    }

    const getHistory = (page?: number) => {
        store.dispatch('withdraw/get_history', page)
    }

    const requestWithdrawInfos = () => {
        store.dispatch('withdraw/request_withdraw_infos')
            .then((data) => {
                total.value = data.total_amount
                withdraw.value = data.total_available
                pending.value = data.total_pending
            })
    }

    const goToNewAccount = () => {
        isNewAccountBankOpen.value = !toValue(isNewAccountBankOpen)
        toggleAddingNewAccount()
    
    }

    const get_account_bank = async () => {
        store.dispatch('withdraw/get_account_bank')
    }

    const addAccountBank = () => {
        isNewAccountBankOpen.value = !toValue(isNewAccountBankOpen)
        get_account_bank()
    }

    const toggleAddingNewAccount = () => {
        isAddingNewAccount.value = !toValue(isAddingNewAccount)
    }

    const onDelete = (account: IAccount) => {
        account.is_loading = true
   
        store.dispatch('withdraw/delete_account_bank', account.id)
            .then(() => account.is_loading = false)
    }
    
    const toggleStatus = (account: IAccount) => {
        store.dispatch('withdraw/toggle_status', { id: account.id, is_active: account.is_active })
            .catch(() => account.is_active = !account.is_active)
    }


    return {
        headers,
        headersMobile,
        withdrawHistory,
        withdrawHistorMobile,
        isLoading,
        pagination_history,
        isNewWithdrawOpen,
        isNewAccountBankOpen,
        accountBankHeaders,
        accounts,
        isAddingNewAccount,
        amount,
        isRequestLoading,
        pendingComp,
        withdrawComp,
        totalComp,
        isWithdrawInfoLoading,
        isLoadingHistory,
        isLoadingAccountBank,
        accounts_pagination,
        logged_user,
        toggleWithdraw,
        requestWithdraw,
        addAccountBank,
        goToNewAccount,
        toggleAddingNewAccount,
        get_account_bank,
        onDelete,
        requestWithdrawInfos,
        getHistory,
        toggleStatus
    }
}