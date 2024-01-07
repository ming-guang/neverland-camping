import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as vueMetaPlugin, createMetaManager } from 'vue-meta'

import App from './App.vue'
import router from './router'

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vueMetaPlugin)
app.use(createMetaManager())

app.mount('#app')
