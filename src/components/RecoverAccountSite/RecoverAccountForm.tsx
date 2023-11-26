import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverAccountForm.module.css";

const RecoverForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSignInButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <form className={styles.recoverForm}>
      <div className={styles.recoverInput}>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>E-MAIL ADRESS</i>
          <input
            className={styles.emailInput}
            placeholder="E-Mail Adress"
            type="text"
          />
        </div>
      </div>
      <div className={styles.signInButton} onClick={onSignInButtonClick}>
        <button className={styles.button} type="submit">
          <b className={styles.signInT}>RECOVER ACCOUNT</b>
        </button>
      </div>
    </form>
  );
};

export default RecoverForm;
