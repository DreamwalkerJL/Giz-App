import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

import { updateCurrentUserProfile } from "../../firebase/updateCurrentUserProfile";

import { useLazyQuery, useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../apiServices/Apollo/Mutations";
import { UserDto } from "../../apiServices/Apollo/Types";

import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { allPps } from "../AllPps";
import { USER_PUBLIC_QUERY } from "../../apiServices/Apollo/Querys";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";


const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getRandomImagePath = () => {
    const randomIndex = Math.floor(Math.random() * allPps.length);
    return allPps[randomIndex];
  };

  const auth = getAuth();
  const profilePicture = getRandomImagePath();

  const [registerUser] = useMutation<UserDto>(REGISTER_USER_MUTATION);
  const [getUserPublic] = useLazyQuery(USER_PUBLIC_QUERY, {
    onCompleted: (data) => {
      if (data.userPublicQuery) {
        toast.error("Username or email already taken");
        // Display an error message to the user
      } else {
        registerNewUser();
      }
    },
    onError: (error) => {
      console.error("Error checking user", error);
      toast.error("Error checking user");
      // Handle error
    },
  });

  const registerNewUser = async () => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      toast.success("Registration successful! Please check your email to verify your account.");  

      await registerUser({
        variables: {
          userDto: { userName, email, profilePicture, uid: user.uid },
        },
      });

      updateCurrentUserProfile(userName);

      toast.success("Registration successful");
      navigate("/status-site");
    } catch (e) {
      console.error("Error registering user", e);
      toast.error("Error registering user");
    }
  };

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    getUserPublic({ variables: { userName, email } });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    // Allow only alphanumeric characters and limit to 16 characters
    const sanitizedUsername = newUsername
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 16);
    setUserName(sanitizedUsername);
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
            onChange={handleUsernameChange}
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
