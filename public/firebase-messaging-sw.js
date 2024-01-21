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

 
// Initialize a counter for notifications
let notificationCount = 0;

// Function to handle incoming messages
messaging.onBackgroundMessage(function(payload) {
    // Create a unique tag based on title and body
    let uniqueTag = `tag-${payload.data.title}-${payload.data.body}`;

    // Prepare the notification options with a unique tag
    let options = {
        body: payload.data.body,
        icon: '/favicon.ico',
        tag: uniqueTag, // Unique tag for grouping specific notifications
        // ... other options
    };

    // Show the notification
    self.registration.showNotification(payload.data.title, options);
});

// Event listener for notification clicks
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click Received.');
    event.notification.close(); // Close the notification

    // Reset the notification count
    notificationCount = 0;

    // Handle the click event, e.g., open a window or focus an existing one
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === '/invites-site' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/invites-site');
            }
        })
    );
});
