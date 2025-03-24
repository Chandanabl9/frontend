import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import service worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA functionality with error handling
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    alert('A new version is available. Refresh the page to update.');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onSuccess: () => {
    console.log('Service Worker registered successfully. App is ready to work offline.');
  },
  onError: (error) => {
    console.error('Service Worker registration failed:', error);
  }
});

// Log performance metrics (optional)
reportWebVitals(console.log);
