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

  return (
    <Routes>
      <Route path="/" element={<SignInSite />} />
      <Route path="/register-site" element={<RegisterSite />} />
      <Route path="/status-site" element={<StatusSite />} />
      <Route path="/invites-site" element={<InvitesSite />} />
      <Route path="/create-site" element={<CreateSite />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/menu-site" element={<MenuSite />} />
      <Route path="/contact-us-site" element={<ContactUsSite />} />
      <Route path="/recover-account-site" element={<RecoverAccountSite />} />
    </Routes>
  );
}
export default App;
