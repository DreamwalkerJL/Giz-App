import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FastSignIn.module.css";
import { signInWithGoogle } from "../../firebase/AuthGoogleSignInPopup";
const FastSignIn: FunctionComponent = () => {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      signInWithGoogle(() => navigate("/status-site"));
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className={styles.fastSignIn}>
      <a>
        <button className={styles.google} onClick={googleSignIn}>
          <img className={styles.googleIcon} alt="" src="/googleIcon.png" />
        </button>
      </a>
    </div>
  );
};

export default FastSignIn;
