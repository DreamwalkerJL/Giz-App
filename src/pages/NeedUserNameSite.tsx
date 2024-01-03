import { FunctionComponent, useCallback } from "react";
import HeaderStart from "../components/HeaderStart";
import NeedUserName from "../components/NeedUserNameSite/NeedUserNameForm";
import { useNavigate } from "react-router-dom";
import styles from "./NeedUserNameSite.module.css";
import { getAuth, signOut } from "firebase/auth";

const NeedUserNameSite: FunctionComponent = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const onGoBackFrameClick = useCallback(() => {
    // Sign out the user
    signOut(auth)
      .then(() => {
        // After signing out, navigate to the desired route
        navigate("/");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Sign out error:", error);
      });
  }, [navigate, auth]); // Include auth in the dependency array

  return (
    <div className={styles.needUserNameSite}>
      <HeaderStart instructionT="Choose your Username!" />
      <NeedUserName />
      <div className={styles.goBack}>
        <div className={styles.goBackFrame} onClick={onGoBackFrameClick}>
          <div className={styles.goBackT}>Go back</div>
        </div>
      </div>

      <div className={styles.space} />
    </div>
  );
};

export default NeedUserNameSite;
