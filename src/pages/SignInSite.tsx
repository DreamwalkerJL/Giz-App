import { FunctionComponent, useCallback } from "react";
import HeaderStart from "../components/HeaderStart";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignInSite/SignInForm";
import styles from "./SignInSite.module.css";
import FastSignIn from "../components/SignInSite/FastSignIn";

const SingUpSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onRegisterNavigationContainerClick = useCallback(() => {
    navigate("/register-site");
  }, [navigate]);

  return (
    <div className={styles.signUpSite}>
      <HeaderStart instructionT="Please enter your details to sign in" />
      <FastSignIn />
      <div className={styles.signin}>
        <div className={styles.line1} />
        <div className={styles.signInT}>Sign In</div>
        <div className={styles.line1} />
      </div>
      <SignUpForm />
      <div
        className={styles.registerNavigation}
        onClick={onRegisterNavigationContainerClick}
      >
        <div className={styles.signInT}>
          <span>{`Don’t have an account yet? `}</span>
          <b>Sign Up</b>
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};

export default SingUpSite;
