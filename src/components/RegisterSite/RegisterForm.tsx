import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";

import { updateCurrentUserProfile } from "../../firebase/updateCurrentUserProfile";

import { useLazyQuery, useMutation } from "@apollo/client";
import { REFRESH_FCM_TOKEN_MUTATION, REGISTER_USER_MUTATION } from "../../apiServices/Apollo/Mutations";
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
import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase/firebaseConfig";

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [refreshFcmToken] = useMutation(REFRESH_FCM_TOKEN_MUTATION);
  const getRandomImagePath = () => {
    const randomIndex = Math.floor(Math.random() * allPps.length);
    return allPps[randomIndex];
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          toast.success("Notifications enabled!");
          return true; // User granted permission
        } else {
          toast.info("Notifications disabled");
          return false; // User denied permission
        }
      } catch (error) {
        console.error("Error requesting notification permission", error);
        toast.error("Error requesting notification permission");
        return false;
      }
    }
    return false; // Notification not supported or permission already denied
  };
  


  const handleFcmToken = async () => {
    let fcmToken = null;
    if (Notification.permission === "granted") {
      try {
        fcmToken = await getToken(messaging, {
          vapidKey: "BPEZCuuO4soum6IPVkxeeg_8g2iIABONW87tZmDPNIdlFKUfaCC9vM1yPa4aZA7CrjjZIRj7Mf7OJ5vGpumTZAk",
        });
      } catch (error) {
        console.error("Error fetching FCM token", error);
      }

      try {
        await refreshFcmToken({
          variables: {
            fcmToken,
            uid: auth.currentUser?.uid,
          },
        });
      } catch (error) {
        console.error("Error refreshing FCM token", error);
      }
    }
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
          userDto: { userName, email, profilePicture, uid: user.uid, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        },
      });

      updateCurrentUserProfile(userName);




      toast.success("Registration successful");
      navigate("/status-site");
      const notificationsAccepted = await requestNotificationPermission();
      await handleFcmToken();
      if (notificationsAccepted) {
      window.location.reload()
      }
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
            autoComplete="email"
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
