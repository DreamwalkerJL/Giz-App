import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import registerUserInDb from "../../apiServices/RegisterApiServices";
import { updateCurrentUserProfile } from "../../firebase/updateCurrentUserProfile";
import { logCurrentUser } from "../../firebase/AuthFunction";

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await registerUserInDb({ email, password, userName });
      console.log("Registration successful", response);

      if (response) {
        updateCurrentUserProfile(userName);
        logCurrentUser();
        navigate("/status-site");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleRegister}>
      <div className={styles.registerInput}>
        <div className={styles.username}>
          <i className={styles.usernameHeadline}>USERNAME</i>
          <input
            className={styles.usernameInput}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className={styles.username}>
          <i className={styles.usernameHeadline}>E-MAIL ADRESS</i>
          <input
            className={styles.usernameInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail Adress"
            required
          />
        </div>
        <div className={styles.username}>
          <i className={styles.usernameHeadline}>PASSWORD</i>
          <input
            className={styles.usernameInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div className={styles.registerButton}>
        <button className={styles.button} type="submit">
          <b className={styles.registerT}>SIGN UP</b>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
