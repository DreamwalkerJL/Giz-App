import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FastSignIn.module.css";

const FastSignIn: FunctionComponent = () => {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      console.log("GOOGLE SIGN LOL");
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className={styles.fastSignIn}>
      <button className={styles.google} onClick={googleSignIn}>
        <img className={styles.googleIcon} alt="" src="/googleIcon.png" />
      </button>
    </div>
  );
};

export default FastSignIn;
