import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import TitleProvider from './context/TitleProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <TitleProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </TitleProvider>  
  // </StrictMode>,
)

