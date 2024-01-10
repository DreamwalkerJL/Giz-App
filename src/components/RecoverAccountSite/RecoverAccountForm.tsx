import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverAccountForm.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const RecoverForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handlePasswordReset = useCallback(async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent!");
      console.log("Password reset email sent!");
      navigate("/"); // Navigate to the home page or login page after sending the email
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      alert("Failed to send password reset email.");
    }
  }, [email, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    handlePasswordReset();
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
      <div className={styles.signInButton}>
        <button className={styles.button} type="submit">
          <b className={styles.signInT}>RECOVER ACCOUNT</b>
        </button>
      </div>
    </form>
  );
};

export default RecoverForm;
