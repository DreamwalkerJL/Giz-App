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
   
  
    let options = {
        body: payload.data.body,
        icon: '/favicon.ico',
        // actions: [
        //     { action: 'accept', title: 'Accept' },
        //     { action: 'decline', title: 'Decline' }
        // ],
        // other options...
    };

    self.registration.showNotification(payload.data.title, options);
});
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click Received.');

  // Close the notification
  event.notification.close();

  // Redirect to the invites site
  event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(windowClients) {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              if (client.url === '/invites-site' && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the new window
          if (clients.openWindow) {
              return clients.openWindow('/invites-site');
          }
      })
  );
});
