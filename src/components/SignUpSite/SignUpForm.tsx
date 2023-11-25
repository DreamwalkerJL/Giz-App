import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpForm.module.css";
import axios from "axios";

const SignUpForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      // const response = await axios.post('http://localhost:8080/auth/signIn', { email, password });
      // console.log(response.data);
      console.log(email, password);
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <div className={styles.signInInput}>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>E-MAIL ADRESS</i>
          <input
            className={styles.emailFrame}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Adress"
            required
          />
        </div>
        <div className={styles.email}>
          <i className={styles.emailHeadline}>PASSWORD</i>
          <input
            className={styles.passwordFrame}
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
          <div className={styles.rememberMeFrame}>
            <input className={styles.box} type="checkbox" />
            <div className={styles.rememberMeT}>Remember me</div>
          </div>
          <div className={styles.forgotPasswordFrame}>
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
