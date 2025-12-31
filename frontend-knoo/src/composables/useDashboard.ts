import { computed, ref, toValue } from 'vue'
import { useStore } from 'vuex'
import type { IDashboard } from '@/interfaces/dashboard.interface'

export function useDashboard(){
    const store = useStore()

    const dashboard = computed<IDashboard>(() => store.getters['dashboard/dashboard'])
    const isLoading = computed<boolean>(() => store.getters['dashboard/isLoading'])
    const isAccountTypeOpen = ref(false)
    const pf = ref<boolean>(false)
    const pj = ref<boolean>(false)
    const isConfigCNPJ = ref<boolean>(false)
    const isConfigCPF = ref<boolean>(false)

    const onToggleAccountType = (is_open: boolean) => {
        isAccountTypeOpen.value = is_open
    }
    
    const onNextAccountType = () => {
        isAccountTypeOpen.value = false

        if(toValue(pf)){
            isConfigCPF.value = true
            isConfigCNPJ.value = false
            return
        }

        isConfigCPF.value = false
        isConfigCNPJ.value = true
    }

    const on_get_dashboard = () => store.dispatch('dashboard/on_get_dashboard')

    return {
        isAccountTypeOpen,
        pf,
        pj,
        isConfigCNPJ,
        isConfigCPF,
        dashboard,
        isLoading,
        onNextAccountType,
        onToggleAccountType,
        on_get_dashboard
    }
}