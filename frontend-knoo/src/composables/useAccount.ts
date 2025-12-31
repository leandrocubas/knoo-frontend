import { computed, ref, toValue } from 'vue'
import Bank from '@/components/icons/Bank.vue'
import type { ISelect } from '@/interfaces/select.interface'
import { useStore } from 'vuex'

export function useAccount() {
    const actualStepIndex = ref(0)
    const bank_list = computed(() => store.getters['user/bank_list'])
    const is_loading_add_account = computed(() => store.getters['withdraw/isLoadingAddAccount'])
    const store = useStore()
    const accountType = ref()
    const isLoadingBanks = ref(false)
    const accountTypeList = ref<Array<ISelect>>([
        { value: 'current', label: 'Conta Corrente' },
        { value: 'savings', label: 'Conta poupança' }
    ])
    const accountOwner = ref()
    const cpf = ref('')
    const bank = ref()
    const agency = ref()
    const account = ref()
    const key_type = ref()
    const pix_mask = ref()
    const key_pix = ref()
    const keyTypeList = ref<Array<ISelect>>([
        { value: 'mobile_phone', label: 'Celular' },
        { value: 'cpf', label: 'CPF' },
        { value: 'random', label: 'Chave aleatória' },
        { value: 'email', label: 'E-mail' },
        { value: 'cnpj', label: 'CNPJ' },
    ])
    const accountDigit = ref()
    const confirm = ref(false)
    const documentFront = ref<File>()
    const identityDoc = ref<File>()
    const documentBack = ref<File>()
    const bankDocument = ref<File>()
    const isSendSuccess = ref<boolean>(false)

    const steps = computed(() => ([
        { completed: false, title: 'Dados bancários', disabled: false, icon: Bank }
    ]))

    const isFormDone = computed(() => 
        toValue(identityDoc) &&
        toValue(documentFront) &&
        toValue(documentBack) &&
        toValue(confirm)
    )

    const isFormBankDataDone = computed(() => 
        !!toValue(accountOwner) &&
        !!toValue(cpf) &&
        !!toValue(bank) &&
        !!toValue(accountType) &&
        !!toValue(agency) &&
        !!toValue(account) &&
        !!toValue(accountDigit) &&
        !!toValue(key_type) &&
        !!toValue(key_pix)
    )

    const submitReview = () => {
        store.dispatch('withdraw/add_account_bank', {
            banks_codes_id: +toValue(bank),
            responsible_name: toValue(accountOwner),
            responsible_document: toValue(cpf).replace(/[.,-]/g,''),
            account_type: toValue(accountType),
            account_agency: toValue(agency),
            account_number: toValue(account),
            account_check_digit: +toValue(accountDigit),
            pix_type_key: toValue(key_type),
            pix_key: key_type.value === 'mobile_phone' ?
                toValue(key_pix).replace(/[-,(,)]/g, '').split(' ').join('') :
                toValue(key_pix).replace(/[-,(,),.]/g, ''),
        }).then(() => sendedSuccess())
    }

    const sendedSuccess = () => {
        isSendSuccess.value = !toValue(isSendSuccess)
    }

    const onGetAllBanks = () => {
        isLoadingBanks.value = true
        store.dispatch('user/get_all_banks')
            .then(() => isLoadingBanks.value = false)
    }

    return {
        actualStepIndex,
        steps,
        isFormBankDataDone,
        bank_list,
        accountType,
        accountTypeList,
        accountOwner,
        cpf,
        bank,
        agency,
        account,
        accountDigit,
        confirm,
        documentFront,
        identityDoc,
        documentBack,
        bankDocument,
        isFormDone,
        isSendSuccess,
        key_type,
        keyTypeList,
        key_pix,
        pix_mask,
        isLoadingBanks,
        is_loading_add_account,
        submitReview,
        sendedSuccess,
        onGetAllBanks
    }
}