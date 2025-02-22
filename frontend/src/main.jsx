import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './context/storecontext.jsx'
import { Authprovider } from './context/authcontext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <StoreProvider>
    <App />
    </StoreProvider>
    </Authprovider>
  </StrictMode>,
)
