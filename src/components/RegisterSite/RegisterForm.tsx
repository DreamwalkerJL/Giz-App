import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import axios from "axios";

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      // const response = await axios.post('http://localhost:8080/auth/register', { username, email, password });
      // console.log(response.data);
      console.log(userName, email, password);
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };


  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
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
            placeholder="E-mail Adress"
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
      <div
        className={styles.registerButton}
      >
        <button className={styles.button} type="submit">
          <b className={styles.registerT}>SIGN UP</b>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
