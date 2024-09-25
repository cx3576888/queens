import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './styles/reset.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Analytics />
      <SpeedInsights />
    </Provider>
  </React.StrictMode>,
)
