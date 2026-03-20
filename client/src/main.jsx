import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import store from './features/store.js'
import {Provider} from "react-redux"

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || ''

createRoot(document.getElementById('root')).render(
  <StrictMode>

<Provider store={store}>
    <App />
</Provider>
  </StrictMode>,
)
