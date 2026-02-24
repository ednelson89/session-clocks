import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 140,
      md: 600,
      lg: 800,
      xl: 1280,
    },
  },
   theme: {
    defaultTheme: 'light', // 'system' | 'light' | 'dark'
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)


app.mount('#app')
