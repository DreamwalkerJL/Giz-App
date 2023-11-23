import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpForm.module.css";

const SignUpForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSignInButtonClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  return (
    <div className={styles.signUpForm}>
      <div className={styles.signInInput}>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>E-MAIL ADRESS</i>
          <div className={styles.emailFrame}>
            <div className={styles.emailInputT}>monsterdam@google.com</div>
          </div>
        </div>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>PASSWORD</i>
          <div className={styles.emailFrame}>
            <div className={styles.emailInputT}>***************</div>
          </div>
        </div>
      </div>
      <div className={styles.bonusActions}>
        <div className={styles.bonusActionFrame}>
          <div className={styles.rememberMeFrame}>
            <div className={styles.box} />
            <div className={styles.rememberMeT}>Remember me</div>
          </div>
          <div className={styles.forgotPasswordFrame}>
            <div className={styles.forgotPasswordT}>Forgot password?</div>
          </div>
        </div>
      </div>
      <div className={styles.signInButton} onClick={onSignInButtonClick}>
        <div className={styles.button}>
          <b className={styles.rememberMeT}>SIGN IN</b>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
