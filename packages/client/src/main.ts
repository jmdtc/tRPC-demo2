import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient()

const app = createApp(App)

app.use(VueQueryPlugin,{ queryClient }).mount('#app')
