import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onRegisterButtonContainerClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  return (
    <form className={styles.registerForm}>
      <div className={styles.registerInput}>
        <div className={styles.username}>
          <i className={styles.usernameHeadline}>USERNAME</i>
          <input
            className={styles.usernameInput}
            placeholder="Username"
            type="text"
            required
          />
        </div>
        <div className={styles.username}>
          <i className={styles.usernameHeadline}>E-MAIL ADRESS</i>
          <input
            className={styles.usernameInput}
            placeholder="E-Mail Adress"
            type="email"
            required
          />
        </div>
        <div className={styles.username}>
          <i className={styles.usernameHeadline}>PASSWORD</i>
          <input
            className={styles.usernameInput}
            placeholder="Password"
            type="password"
            required
          />
        </div>
      </div>
      <div
        className={styles.registerButton}
        onClick={onRegisterButtonContainerClick}
      >
        <button className={styles.button} type="submit">
          <b className={styles.registerT}>SIGN UP</b>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
