import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onRegisterButtonContainerClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  return (
    <div className={styles.registerForm}>
      <div className={styles.signInInput}>
        <div className={styles.userName}>
          <i className={styles.userNameHeadline}>USERNAME</i>
          <div className={styles.userNameFrame}>
            <div className={styles.userNameInput}>Monster Dam</div>
          </div>
        </div>
        <div className={styles.userName}>
          <i className={styles.userNameHeadline}>E-MAIL ADRESS</i>
          <div className={styles.userNameFrame}>
            <div className={styles.userNameInput}>monsterdam@google.com</div>
          </div>
        </div>
        <div className={styles.userName}>
          <i className={styles.userNameHeadline}>PASSWORD</i>
          <div className={styles.userNameFrame}>
            <div className={styles.userNameInput}>***************</div>
          </div>
        </div>
      </div>
      <div
        className={styles.registerButton}
        onClick={onRegisterButtonContainerClick}
      >
        <div className={styles.button}>
          <b className={styles.registerT}>REGISTER</b>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
