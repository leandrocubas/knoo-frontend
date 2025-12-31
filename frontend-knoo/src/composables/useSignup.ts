import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useUtils } from './useUtils'
import { useRouter } from 'vue-router'

export function useSignup() {
    const store = useStore()
    const { storageToken } = useUtils()
    const { replace } = useRouter()

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const terms_use = ref(false)
    const checkbox_message = computed(() => getMessageCheckbox())
    const isLoading = computed(() => store.getters['login/isLoading'])

    const getMessageCheckbox = (): string => '<span style="color: #000">Lí e aceito os <span style="font-weight: 600;">Termos de Uso</span></span>'

    const handleSubmit = (): void => {
        store.dispatch('login/sign_up', {
            name: name.value,
            email: email.value.trim().trimEnd().trimStart(),
            password: password.value
        }).then(({ token }) => {
            if (token) {
                storageToken(token)
                replace({ name: 'Dashboard' })
            }
        })
    }

    return {
        handleSubmit,
        name,
        email,
        password,
        terms_use,
        checkbox_message,
        isLoading
    }
}