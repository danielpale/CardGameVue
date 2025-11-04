import router from '@/router'
import { createPinia } from 'pinia'
import { vuetify } from './vuetify'

export function setup(app) {
  app.use(createPinia())
  app.use(router)
  app.use(vuetify)
}
