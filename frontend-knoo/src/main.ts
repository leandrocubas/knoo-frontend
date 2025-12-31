import './assets/main.scss'
import 'vue-toast-notification/dist/theme-bootstrap.css'

// Core
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Money3Directive, Money3Component } from 'v-money3'
import vClass from './directives/v-class'

// Libraries
import ToastPlugin from 'vue-toast-notification'
import { store } from './store'
import db from './database'

db.open().catch(error => {
    console.error("Erro ao inicializar o banco de dados Dexie:", error)
})

const app = createApp(App)
app.directive('class', vClass)
app.directive('money3', Money3Directive)
app.component("money3", Money3Component)
app.use(router)
app.use(store)
app.use(ToastPlugin, { position: 'bottom-rigth', duration: 5000 })
app.mount('#app')
