import { usePage } from '@/composables/usePage'
import { useStorage } from '@/composables/useStorage'
import { LoginEnum } from '@/enums/login.enum'
import { computed } from 'vue'
import type { Router } from 'vue-router'

export function setupAuthGuard(router: Router) {

    const { get } = useStorage()
    const { normalizeParentRoute } = usePage()

    router.beforeEach((to, _, next) => {
        document.title = to.name ? `${to.name.toString()} - Knoo` : 'Knoo'
        if(to.meta.parent)
          to.meta.parent = normalizeParentRoute(to.meta.parent as string, to.params)

        const isLoggedin = computed(() => !!get(LoginEnum.TOKEN_KEY))
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!isLoggedin.value) {
            next({ path: '/login' })
            return
          }

          next()
          

          return
        }

        if (to.matched.some(record => record.meta.requiresUnauth)) {
          if (isLoggedin.value) {
            next({ path: '/dashboard' })
            return
          } 

          next()
          return
        }

        next()        
    })
}