import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export function useCommentManager() {
    const toast = useToast()
    const items = ref(Array.from({ length: 4 }))
    const isLoading = ref(false)

    const onSuccess = () => {
        toast.success('Aprovado com sucesso')
    }
    
    const onFail = () => {
        toast.success('Reprovado com sucesso')
    }

    return {
        items,
        isLoading,
        onFail,
        onSuccess
    }
}