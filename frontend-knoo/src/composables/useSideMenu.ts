import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'


export function useSideMenu(){
    
    const router = useRoute()
    const store = useStore()
    const isDashActive = computed(() => router.path === '/dashboard')
    const isProductActive = computed(() => router.path.includes('/produtos'))
    const isOfferActive = computed(() => router.path.includes('/ofertas'))
    const isSalesRecoveryActive = computed(() => router.path === '/recuperacao-de-vendas')
    const isMembersAreaActive = computed(() => router.path.includes('/area-de-membros'))
    const isWithdrawActive = computed(() => router.path === '/saque')
    const isCupomActive = computed(() => router.path === '/cupom')
    const isOpened = computed(() => store.getters['menu/isOpened'])

    const toggleSideMenu = (isOpened: boolean) => {
        store.commit('menu/TOGGLE_MENU', isOpened)
    }
    
    
    
    return {
        isDashActive,
        isProductActive,
        isOfferActive,
        isSalesRecoveryActive,
        isMembersAreaActive,
        isWithdrawActive,
        isCupomActive,
        isOpened,
        toggleSideMenu,
    }
}