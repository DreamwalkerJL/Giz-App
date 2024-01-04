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
import { getToken } from "firebase/messaging";
import { messaging } from './firebase/firebaseConfig'; // Ensure this is the correct path to your Firebase Messaging instance
import { useMutation } from "@apollo/client";
import { REFRESH_FCM_TOKEN_MUTATION } from "./apiServices/Apollo/Mutations";

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

  const [refreshFCMToken] = useMutation(REFRESH_FCM_TOKEN_MUTATION);
  
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  useEffect(() => {
    const refreshNewFCMToken = async () => {
      try {
        const fcmToken = await getToken(messaging, { vapidKey: "BM11azHLmpR49yX-nBq8B2DrrqWxaiCMZ60vD_2GVCffRzB13B3kqGKmxhra7Jw" });
        if (fcmToken) {
          console.log("FCM TOKEN")
          console.log(fcmToken)
          try {
            refreshFCMToken({ variables: { fcmToken, uid } });
          } catch (e) {
            console.error("Error refreshing FCM token", e);
          }
          console.log("FCM Token:", fcmToken);
        } else {
          console.log("No permission to send push notifications");
        }
      } catch (error) {
        console.error("Error fetching FCM token", error);
      }
    };

    refreshNewFCMToken();
  }, []);

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
