import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignInForm.module.css";
import { signInWithEmailPassword } from "../../firebase/AuthSignInWithEmailPassword";
import { logCurrentUser } from "../../firebase/AuthFunction";

const SignUpForm: FunctionComponent = () => {
  const navigate = useNavigate();

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
        console.log("signed in successfully");
        navigate("/status-site");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  logCurrentUser();
  return (
    <form className={styles.signInForm} onSubmit={handleSignIn}>
      <div className={styles.signInInput}>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>E-MAIL ADRESS</i>
          <input
            className={styles.emailInput}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div className={styles.bonusActions}>
        <div className={styles.bonusActionFrame}>
          {/* <div className={styles.rememberMeFrame}>
            <input
              className={styles.box}
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
            <div className={styles.rememberMeT}>Remember me</div>
          </div> */}
          <div
            className={styles.forgotPasswordFrame}
            onClick={onForgotPasswordFrameClick}
          >
            <div className={styles.forgotPasswordT}>Forgot password?</div>
          </div>
        </div>
      </div>
      <div className={styles.signInButton}>
        <button className={styles.button} type="submit">
          <b className={styles.signInT}>SIGN IN</b>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
