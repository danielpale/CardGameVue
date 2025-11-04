import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, custom } from './customIcons'

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom,
    },
  },
})
