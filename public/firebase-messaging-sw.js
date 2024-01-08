importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD4PHHoILVqF5l30XBrnDKf59xVvbGfg-M",
    authDomain: "gizapp-1712.firebaseapp.com",
    projectId: "gizapp-1712",
    storageBucket: "gizapp-1712.appspot.com",
    messagingSenderId: "419851624828",
    appId: "1:419851624828:web:d6f2fb3259c86f29ae84f9"
  };
 
  firebase.initializeApp(firebaseConfig);
 
  // Retrieve firebase messaging
  const messaging = firebase.messaging();
 
  messaging.onBackgroundMessage(function(payload) {
    console.log("TADEOSTEST Received background message ", payload);
 
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
 
    self.registration.showNotification(notificationTitle, notificationOptions);
  });