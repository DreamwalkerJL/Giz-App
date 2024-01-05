import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// Initialize the Firebase app in the service worker by passing the generated config.
firebase.initializeApp({
    apiKey: "AIzaSyD4PHHoILVqF5l30XBrnDKf59xVvbGfg-M",
    authDomain: "gizapp-1712.firebaseapp.com",
    projectId: "gizapp-1712",
    storageBucket: "gizapp-1712.appspot.com",
    messagingSenderId: "419851624828",
    appId: "1:419851624828:web:d6f2fb3259c86f29ae84f9"
});

// Initialize Firebase
initializeApp(firebaseConfig);

const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});