import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import './styles/reset.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
