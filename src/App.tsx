import { useEffect } from "react";
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
import ProtectedRoute from "./firebase/ProtectedRoute"
import LoggedInRoute from "./firebase/LoggedInRoute";
import { useAuth } from "./firebase/AuthContext";
import { setTokenRetrievalFunction } from "./apiServices/Apollo/ApolloClient";
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
      case "/register-site":
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
      case "/menu-site":
        title = "";
        metaDescription = "";
        break;
      case "/contact-us-site":
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

  useEffect(() => {
    setTokenRetrievalFunction(() => idToken);
  }, [idToken]);

  return (
    <Routes>
      <Route path="/" element={<LoggedInRoute><SignInSite /></LoggedInRoute>} />
      <Route path="/register-site" element={<LoggedInRoute><RegisterSite /></LoggedInRoute>} />
      <Route path="/recover-account-site" element={<LoggedInRoute><RecoverAccountSite /></LoggedInRoute>} />

      <Route path="/status-site" element={<ProtectedRoute><StatusSite /></ProtectedRoute>} />
      <Route path="/invites-site" element={<ProtectedRoute><InvitesSite /></ProtectedRoute>} />
      <Route path="/create-site" element={<ProtectedRoute><CreateSite /></ProtectedRoute>} />
      <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/menu-site" element={<ProtectedRoute><MenuSite /></ProtectedRoute>} />
      <Route path="/contact-us-site" element={<ProtectedRoute><ContactUsSite /></ProtectedRoute>} />
    </Routes>
  );
}
export default App;
