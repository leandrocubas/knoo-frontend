import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SigninView from '@/views/SigninView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import SignupView from '@/views/SignupView.vue'
import DashboardViewVue from '@/views/DashboardView.vue'
import { setupAuthGuard } from './guard'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import OfferView from '@/views/OfferView.vue'
import SalesRecoveryView from '@/views/SalesRecoveryView.vue'
import MemberAreaView from '@/views/MemberAreaView.vue'
import AreaView from '@/views/AreaView.vue'
import ModuleContentView from '@/views/ModuleContentView.vue'
import WithdrawView from '@/views/WithdrawView.vue'
import { computed } from 'vue'
import { useStorage } from '@/composables/useStorage'
import { LoginEnum } from '@/enums/login.enum'
import CheckoutBuilderView from '@/views/CheckoutBuilderView.vue'
import CupomView from '@/views/CupomView.vue'

const { get } = useStorage()

const isLoggedin = computed(() => !!get(LoginEnum.TOKEN_KEY))

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: to => {

      return isLoggedin.value ?
        { path: '/inicio' } :
        { path: '/login', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: SigninView,
    meta: { requiresUnauth: true }
  },
  {
    path: '/recuperar-senha/:code?',
    name: 'Esqueci minha senha',
    component: ForgotPasswordView,
    meta: { requiresUnauth: true }
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: SignupView,
    meta: { requiresUnauth: true }
  },
  {
    path: '/inicio',
    name: 'Início',
    component: HomeView,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard de gestão',
        component: DashboardViewVue,
      },
      {
        path: '/produtos',
        name: 'Produtos',
        component: ProductView,
      },
      {
        path: '/ofertas',
        name: 'Ofertas',
        component: OfferView,
      },
      {
        path: '/recuperacao-de-vendas',
        name: 'Vendas',
        component: SalesRecoveryView,
      },
      {
        path: '/area-de-membros',
        name: 'Área de membros',
        component: MemberAreaView,
      },
      {
        path: '/area-de-membros/:id',
        name: 'Nome da área',
        meta: { parent: '/area-de-membros', dynamic: true },
        component: AreaView,
      },
      {
        path: '/area-de-membros/:id/modulo/:module',
        name: 'Nome da Área - Módulo A',
        meta: { parent: '/area-de-membros/:id', dynamic: true },
        component: ModuleContentView,
      },
      {
        path: '/saque',
        name: 'Saque',
        component: WithdrawView,
      },
      {
        path: '/cupom',
        name: 'Cupom',
        component: CupomView,
      }
    ]
  },
  {
    path: '/checkout/:hash',
    name: 'Checkout Builder',
    component: CheckoutBuilderView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: to => {
      return isLoggedin ?
        { path: '/inicio' } :
        { path: '/login', query: { q: to.params.searchText } }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

setupAuthGuard(router)


export default router
