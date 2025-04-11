
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

// Force an initial theme class on the document before React hydrates
const initialTheme = localStorage.getItem('theme-mode') || 'dark';
document.documentElement.classList.add(`${initialTheme}-mode`);

// Add error boundary for better debugging
const renderApp = () => {
  try {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>,
    )
  } catch (error) {
    console.error("Failed to render app:", error);
    // Create fallback UI for critical errors
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h1>Application Error</h1>
          <p>Sorry, something went wrong while loading the application.</p>
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
        </div>
      `;
    }
  }
};

renderApp();
