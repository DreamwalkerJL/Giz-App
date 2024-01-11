import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};


// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

// Handle foreground notifications
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Show a custom UI for the message or perform other actions as needed
});

// Function to handle 'accept' action
// function handleAcceptAction(data:any) {
//   // Implement your logic for the 'accept' action here
//   console.log("Accept action clicked", data);
// }

// // Function to handle 'decline' action
// function handleDeclineAction(data:any) {
//   // Implement your logic for the 'decline' action here
//   console.log("Decline action clicked", data);
// }

// // Listen for notification clicks
// navigator.serviceWorker.addEventListener('message', (event) => {
//   // Check for your specific action data structure
//   if (event.data && event.data.firebaseMessaging) {
//     switch (event.data.firebaseMessaging.action) {
//       case 'accept':
//         handleAcceptAction(event.data.firebaseMessaging.data);
//         break;
//       case 'decline':
//         handleDeclineAction(event.data.firebaseMessaging.data);
//         break;
//       default:
//         console.log("Notification clicked without specific action");
//     }
//   }
// });



export { messaging };

export default app;

