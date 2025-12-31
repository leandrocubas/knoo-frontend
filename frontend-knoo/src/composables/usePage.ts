import { computed } from 'vue'
import type { RouteParams } from 'vue-router'
import { useStore } from 'vuex'

export function usePage() {
    const store = useStore()

    const setHeader = (title: string ): void => {
        store.commit('page/SET_HEADER', { title })
    }

    const normalizeParentRoute = (parent: string, params: RouteParams): string => {
        let normalized = parent
        Object.entries(params).map(([key, value]) => {
            if (parent.includes(key)) {
                normalized = parent.replace(`:${key}`, `${value}`)
            }
        })
    
        return normalized
    }

    return {
        setHeader,
        normalizeParentRoute
    }
}