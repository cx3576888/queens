import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { RouterProvider } from 'react-router';
import router from './router.tsx';
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './styles/reset.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </Provider>
  </React.StrictMode>,
)
