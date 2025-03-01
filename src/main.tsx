
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

// Force an initial theme class on the document before React hydrates
const initialTheme = localStorage.getItem('theme-mode') || 'dark';
document.documentElement.classList.add(`${initialTheme}-mode`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
