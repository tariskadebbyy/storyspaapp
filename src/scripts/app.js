import '../styles/main.css';
import { router } from './router/routes.js';

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

Notification.requestPermission().then(result => {
  if (result === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk'
      }).then(subscription => {
        console.log('Push subscribed:', JSON.stringify(subscription));
      }).catch(error => {
        console.error('Push subscription failed: ', error);
      });
    });
  }
});
