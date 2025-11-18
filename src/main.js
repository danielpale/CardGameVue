import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/main.css'

import { setup } from './plugins'

const app = createApp(App)

setup(app)

app.mount('#app')
