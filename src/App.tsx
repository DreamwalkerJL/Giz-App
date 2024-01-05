import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignInSite from "./pages/SignInSite";
import RegisterSite from "./pages/RegisterSite";
import StatusSite from "./pages/StatusSite";
import InvitesSite from "./pages/InvitesSite";
import CreateSite from "./pages/CreateSite";
import EditProfile from "./pages/EditProfile";
import MenuSite from "./pages/MenuSite";
import ContactUsSite from "./pages/ContactUsSite";
import RecoverAccountSite from "./pages/RecoverAccountSite";
import ProtectedRoute from "./firebase/ProtectedRoute";
import LoggedInRoute from "./firebase/LoggedInRoute";
import { useAuth } from "./firebase/AuthContext";
import { setTokenRetrievalFunction } from "./apiServices/Apollo/ApolloClient";
import EditSite from "./pages/EditSite";
import { getAuth } from "firebase/auth";
import { GizDataProvider } from "./components/GizDataContext";
import NeedUserNameSite from "./pages/NeedUserNameSite";
import { ToastContainer } from "react-toastify";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig"; // Ensure this is the correct path to your Firebase Messaging instance
import { useMutation } from "@apollo/client";
import { REFRESH_FCM_TOKEN_MUTATION } from "./apiServices/Apollo/Mutations";
import { onBackgroundMessage } from "firebase/messaging/sw";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  const { idToken } = useAuth();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/edit-site":
        title = "";
        metaDescription = "";
        break;
      case "/status-site":
        title = "";
        metaDescription = "";
        break;
      case "/invites-site":
        title = "";
        metaDescription = "";
        break;
      case "/create-site":
        title = "";
        metaDescription = "";
        break;
      case "/edit-profile":
        title = "";
        metaDescription = "";
        break;
      case "/register-site":
        title = "";
        metaDescription = "";
        break;
      case "/recover-account-site":
        title = "";
        metaDescription = "";
        break;
      case "/need-username-site":
        title = "";
        metaDescription = "";
        break;
      case "/contact-us-site":
        title = "";
        metaDescription = "";
        break;
      case "/menu-site":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  const [refreshFcmToken] = useMutation(REFRESH_FCM_TOKEN_MUTATION);

  useEffect(() => {
    // Function to check permission and refresh token
    const checkPermissionAndRefreshToken = async () => {
      let fcmToken = null;
      console.log(Notification.permission)
      if (Notification.permission === "granted") {
        try {
          fcmToken = await getToken(messaging, {
            vapidKey:
              "BPEZCuuO4soum6IPVkxeeg_8g2iIABONW87tZmDPNIdlFKUfaCC9vM1yPa4aZA7CrjjZIRj7Mf7OJ5vGpumTZAk",
          });
          console.log("FCM Token:", fcmToken);
        } catch (error) {
          console.error("Error fetching FCM token", error);
        }
      } else {
        console.log("Notification permission not granted or declined");
      }

      const {currentUser} = getAuth()
      const uid = currentUser?.uid
      if(!uid) return
      try {
        await refreshFcmToken({
          variables: {
            fcmToken,
            uid: uid,
          },
        });
      } catch (error) {
        console.error("Error refreshing FCM token", error);
      }

      // Send the token or null to your backend to update it
      // Replace with your method to send the token to the backend
      // e.g., updateFCMTokenOnServer(fcmToken);
    };

    checkPermissionAndRefreshToken();
  }, []);




  // onBackgroundMessage(messaging, (payload) => {
  //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
  //   // Customize notification here
  //   const notificationTitle = 'Background Message Title';
  //   const notificationOptions = {
  //     body: 'Background Message body.',
  //     icon: '/firebase-logo.png'
  //   };
  
  //   navigator.serviceWorker.getRegistration().then(function(registration) {
  //     if (registration) {
  //       registration.showNotification(notificationTitle, notificationOptions);
  //     }
  //   });
  //     notificationOptions;
  // });


  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
  useEffect(() => {

    onMessage(messaging, (payload) => {
      console.log('Message received in the foreground: ', payload);
      // Display an in-app message or update the UI
    });
  }, []);

  console.log()

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <LoggedInRoute>
            <ToastContainer />
            <SignInSite />
          </LoggedInRoute>
        }
      />
      <Route
        path="/edit-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <EditSite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/status-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <GizDataProvider status="accepted">
              <StatusSite />
            </GizDataProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/invites-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <GizDataProvider status="invited">
              <InvitesSite />
            </GizDataProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <CreateSite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <GizDataProvider status="accepted">
              <EditProfile />
            </GizDataProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/register-site"
        element={
          <LoggedInRoute>
            <ToastContainer />
            <ToastContainer />
            <RegisterSite />
          </LoggedInRoute>
        }
      />
      <Route
        path="/recover-account-site"
        element={
          <LoggedInRoute>
            <ToastContainer />
            <RecoverAccountSite />
          </LoggedInRoute>
        }
      />
      <Route
        path="/need-username-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <NeedUserNameSite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact-us-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <ContactUsSite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu-site"
        element={
          <ProtectedRoute>
            <ToastContainer />
            <MenuSite />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
