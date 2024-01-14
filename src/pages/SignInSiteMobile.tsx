

import { FunctionComponent, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignInSiteMobile.module.css";
import { signInWithEmailPassword } from '../firebase/AuthSignInWithEmailPassword';
import { signInWithGoogle } from '../firebase/AuthGoogleSignInPopup';
import HeaderStart from "../components/HeaderStart";

const SignInSiteMobile: FunctionComponent = () => {
    const navigate = useNavigate();

    const onRegisterNavigationClick = useCallback(() => {
        navigate("/register-site");
      }, [navigate]);    

    const onForgotPasswordFrameClick = useCallback(() => {
      navigate("/recover-account-site");
    }, [navigate]);
  
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    const handleSignIn = async (
      event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
      event.preventDefault();
  
      try {
        const result = await signInWithEmailPassword(email, password);
        if (result) {
  
          navigate("/status-site");
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    const googleSignIn = async () => {
        try {
          signInWithGoogle(() => navigate("/status-site"));
          navigate("/status-site");
        } catch (error) {
          console.error("There was an error!", error);
        }
      };

  return (
    <div className={styles.signInSiteMobile}>
<HeaderStart instructionT="Please enter your details to sign in"/>
      <div className={styles.fastSignIn}>
        <button className={styles.google} onClick={googleSignIn}>
          <img className={styles.googleIcon} alt="" src="/googleIcon.png" />
        </button>
      </div>
      <div className={styles.signin}>
        <div className={styles.line1} />
        <div className={styles.nameT}>Sign In</div>
        <div className={styles.line1} />
      </div>
      <form className={styles.signInForm} onSubmit={handleSignIn}>
      <div className={styles.signInInput}>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>E-MAIL ADRESS</i>
          <input
            className={styles.emailInput}
            autoComplete="off"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail Adress"
            required
          />
        </div>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>PASSWORD</i>
          <input
            className={styles.passwordInput}
            autoComplete="off"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div className={styles.signInButton}>
          <button
            className={styles.button}
            type="submit"
 
          >
            <b className={styles.signInT1}>SIGN IN</b>
          </button>
          <button
            className={styles.button1}
            type="submit"
            onClick={onRegisterNavigationClick}
          >
            <b className={styles.signInT1}>REGISTER</b>
          </button>
        </div>
        <div className={styles.bonusActionFrame}>
          <div
            className={styles.forgotPasswordFrame}
            onClick={onForgotPasswordFrameClick}
          >
            <div className={styles.forgotPasswordT}>Forgot password?</div>
          </div>
        </div>
      </form>
      <div
        className={styles.registerNavigation}

      />
      <div className={styles.space} />
    </div>
  );
};

export default SignInSiteMobile;
