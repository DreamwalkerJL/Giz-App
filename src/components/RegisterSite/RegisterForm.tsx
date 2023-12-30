import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import registerUserInDb from "../../apiServices/RegisterApiServices";
import { updateCurrentUserProfile } from "../../firebase/updateCurrentUserProfile";
import { logCurrentUser } from "../../firebase/AuthFunction";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../apiServices/Apollo/Mutations";
import { UserDto } from "../../apiServices/Apollo/Types";
import { photoUrls } from "../../photoUrls";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getRandomImagePath = () => {
    const randomIndex = Math.floor(Math.random() * photoUrls.length);
    return photoUrls[randomIndex];
  };

  const auth = getAuth();
  const profilePicture = getRandomImagePath();

  const [registerUser, { data, loading, error }] = useMutation<UserDto>(
    REGISTER_USER_MUTATION
  );
  console.log(userName);
  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const response = await registerUser({
        variables: {
          userDto: { userName, email, profilePicture, uid: user.uid },
        },
      });
      updateCurrentUserProfile(userName);
      console.log("Registration successful", response);

      // Handle success
      if (response) {
        logCurrentUser();
        navigate("/status-site");
      }
    } catch (e) {
      console.error(data);
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
