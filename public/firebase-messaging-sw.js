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
    console.log("Received background message ", payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/path/to/icon.png',
      actions: [
        { action: 'accept', title: 'Accept' },
        { action: 'decline', title: 'Decline' }
      ],
      // other options...
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();
  
    // Check which action was clicked
    if (event.action === 'accept') {
      // Perform accept action
    } else if (event.action === 'decline') {
      // Perform decline action
    } else {
      // User clicked somewhere else in the notification
    }
  
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus().then(client => {
              client.postMessage({ action: event.action, data: event.notification.data });
            });
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  });