import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './index.css';

// Optional privacy-friendly analytics initialization behind env flag
if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
  try {
    // Inject privacy-friendly Plausible or Vercel Analytics script
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = window.location.hostname;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  } catch (e) {
    console.warn('Analytics flag enabled but injection was intercepted:', e);
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

