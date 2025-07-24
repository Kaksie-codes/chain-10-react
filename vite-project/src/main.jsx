import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import TitleProvider from './context/TitleProvider.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <TitleProvider>
    <ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>      
    </ThemeProvider>
  </TitleProvider>  
  // </StrictMode>,
)

