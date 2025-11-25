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
  defaults: {
    VBtn: {
      color: 'black',
      variant: 'flat',
      rounded: 0,
    },
  },
})
