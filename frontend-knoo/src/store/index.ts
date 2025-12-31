import { createStore } from 'vuex'
import { login } from './login'
import { menu } from './menu'
import { product } from './product'
import { user } from './user'
import { offer } from './offer'
import { area } from './area'
import { area_module } from './module'
import { checkout } from './checkout'
import { withdraw } from './withdraw'
import { page } from './page'
import { salesRecovery } from './salesRecovery'
import { dashboard } from './dashboard'
import { membership } from './membership'
import { pixel } from './pixel'
import { cupom } from './cupom'

export const store = createStore({
  modules: {
    area,
    login,
    menu,
    product,
    user,
    offer,
    checkout,
    withdraw,
    salesRecovery,
    area_module,
    page,
    dashboard,
    membership,
    pixel,
    cupom
  }
})