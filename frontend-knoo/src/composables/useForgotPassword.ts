import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export function useForgotPassword(){
    const store = useStore()

    const email = ref('')
    const isCodeValid = ref(true)
    const password_confirmation = ref('')
    const password = ref('')
    const { replace } = useRouter()

    const route = useRoute()

    const hasCode = computed(() => route.params.code ? route.params.code : null)
    const isLoading = computed(() => store.getters['login/isLoading'])

    const handleSubmit = (): void => {
        if(hasCode.value){
            store.dispatch('login/reset_password', {
                verification_code: route.params.code,
                password: password.value,
                email: route.query.email
            }).then(() => replace('/'))
            return
        }


        store.dispatch('login/forgot_password', email.value)
            .then(() => replace('/'))
    }

    const validate_code = async (): Promise<boolean> => {
        if(hasCode.value !== null){
            await store.dispatch('login/validate_code', { token: route.params.code, email: route.query.email })
                .then(() => isCodeValid.value = true)
                .catch(() => {
                    isCodeValid.value = false
                    replace('/')
                })
        }

        return isCodeValid.value
    }
    
    return {
        handleSubmit,
        email,
        hasCode,
        password,
        password_confirmation,
        isLoading,
        validate_code,
        isCodeValid
    }
}