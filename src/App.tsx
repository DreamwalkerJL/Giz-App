import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
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
import EditSite from "./pages/EditSite";
import { getAuth } from "firebase/auth";
import { GizDataProvider } from "./components/GizDataContext";
import NeedUserNameSite from "./pages/NeedUserNameSite";
import { ToastContainer } from "react-toastify";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig"; // Ensure this is the correct path to your Firebase Messaging instance
import { useMutation } from "@apollo/client";
import { REFRESH_FCM_TOKEN_MUTATION } from "./apiServices/Apollo/Mutations";
import Loader from "./components/Loader";
import { motion } from "framer-motion";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

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
      if (Notification.permission === "granted") {
        try {
          fcmToken = await getToken(messaging, {
            vapidKey:
              "BPEZCuuO4soum6IPVkxeeg_8g2iIABONW87tZmDPNIdlFKUfaCC9vM1yPa4aZA7CrjjZIRj7Mf7OJ5vGpumTZAk",
          });
        } catch (error) {
          console.error("Error fetching FCM token", error);
        }
      } else {
        console.log("Notification permission not granted or declined");
      }

      const { currentUser } = getAuth();
      const uid = currentUser?.uid;
      if (!uid) return;
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

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received in the foreground: ", payload);
      // Display an in-app message or update the UI
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("1")
      setLoading(false);
      setTimeout(() => {
        console.log("2")
        setAnimationComplete(true);
      }, 2000); // Duration of your animation
    }, 2300); // Duration before starting the wipe animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 2, ease: [0.1, .5, 0.2, 1] }} // Custom bezier curve for ease-in-out
            style={{
              position: animationComplete ? "static" : "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <div
              style={{ position: "relative", zIndex: 2}}
            >
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
                    <LoggedInRoute>
                      <ToastContainer />
                      <NeedUserNameSite />
                    </LoggedInRoute>
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
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
export default App;
