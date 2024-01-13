import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, onMessage,} from "firebase/messaging";
import { toast } from "react-toastify";
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



onMessage(messaging, (payload) => {
  if (payload.data && payload.data.title && payload.data.body) {
      toast.info(
          <div>
              {payload.data.title}
              <br />
              {payload.data.body}
          </div>,
          {
              // Additional toast options here
          }
      );
  }
});






export { messaging };

export default app;


