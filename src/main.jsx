import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'
import './styles/light.css'
import { CatalogProvider } from './catalogContext.jsx'
import { I18nProvider } from './i18nContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <I18nProvider>
        <CatalogProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CatalogProvider>
      </I18nProvider>
    </HelmetProvider>
  </React.StrictMode>
)
