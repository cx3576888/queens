import { FastClick } from 'fastclick'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './styles/reset.css'
import './global.css'

// Don't know why solutions here doesn't work, so I still need FastClick on mobile safari (iOS 17)
// https://stackoverflow.com/questions/12238587/eliminate-300ms-delay-on-click-events-in-mobile-safari
FastClick.attach(document.body)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Analytics />
      <SpeedInsights />
    </Provider>
  </React.StrictMode>,
)
