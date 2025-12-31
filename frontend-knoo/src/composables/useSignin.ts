import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useStorage } from './useStorage'
import { useUtils } from './useUtils'
import { LoginEnum } from '@/enums/login.enum'

export function useSignin() {
    const store = useStore()
    const { replace } = useRouter()
    const { storageToken } = useUtils()
    const { get } = useStorage()

    const email = ref()
    const password = ref()

    const isLoading = computed(() => store.getters['login/isLoading'])
    const isLoggedin = computed(() => !!get(LoginEnum.TOKEN_KEY))

    const handleSubmit = () => {
        store.dispatch('login/sign_in', {
            email: email.value.trim().trimEnd().trimStart(),
            password: password.value
        }).then(({ token }) => {
            storageToken(token)
            replace({ path: '/dashboard' })
        })
    }

    return {
        handleSubmit,
        email,
        password,
        isLoading,
        isLoggedin
    }
}