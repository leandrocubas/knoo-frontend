import type { IUser } from '@/store/user/interface/user.interface'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useStorage } from '@/composables/useStorage'
import { LoginEnum } from '@/enums/login.enum'

const { del } = useStorage()

export function useProfile(){
    const store = useStore()
    const router = useRouter()
    const isLoading = computed(() => store.getters['user/isLoading'])

    const loggedUser = computed<IUser | null>(() => store.getters['user/getLoggedUser'])
    
    const getLoggedUser = () => {
        store.dispatch('user/get')
    }

    const logout = () => {
        store.dispatch('user/logout').then(() => {
            del(LoginEnum.TOKEN_KEY)
            router.replace('/login')
        })
        
    }
   
    return {
        getLoggedUser,
        logout,
        loggedUser,
        isLoading
    }
}