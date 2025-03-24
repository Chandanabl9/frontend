/* eslint-disable no-restricted-globals */
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
  
            // Auto-update service worker
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      console.log('New content available, please refresh.');
                    }
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }
  