import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverAccountForm.module.css";

const RecoverForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      navigate("/");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form className={styles.recoverForm} onSubmit={handleSubmit}>
      <div className={styles.recoverInput}>
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
      </div>
      <div className={styles.signInButton} >
        <button className={styles.button} type="submit">
          <b className={styles.signInT}>RECOVER ACCOUNT</b>
        </button>
      </div>
    </form>
  );
};

export default RecoverForm;
