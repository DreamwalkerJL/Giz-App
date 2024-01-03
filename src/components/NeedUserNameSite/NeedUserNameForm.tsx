import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NeedUserNameForm.module.css";
import { allPps } from "../AllPps";
import { getAuth } from "firebase/auth";
import { useMutation } from "@apollo/client";
import { UserDto } from "../../apiServices/Apollo/Types";
import { REGISTER_USER_MUTATION } from "../../apiServices/Apollo/Mutations";
import { updateCurrentUserProfile } from "../../firebase/updateCurrentUserProfile";
import { logCurrentUser } from "../../firebase/AuthFunction";

const NeedUserNameForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getRandomImagePath = () => {
    const randomIndex = Math.floor(Math.random() * allPps.length);
    return allPps[randomIndex];
  };

  const {currentUser: user} = getAuth();
  const profilePicture = getRandomImagePath();

  const email = user?.email;
  const [registerUser, { data, loading, error }] = useMutation<UserDto>(
    REGISTER_USER_MUTATION
  );

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if(user && userName && email)
    try {

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
    <form className={styles.needUserNameForm} onSubmit={handleRegister}>
      <div className={styles.needUserNameInput}>
        <div className={styles.userName}>
          <i className={styles.userNameHeadline}>USERNAME</i>
          <input
            className={styles.userNameInput}
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
      </div>
      <div className={styles.signInButton} >
        <button className={styles.button} type="submit">
          <b className={styles.signInT}>CONTINUE</b>
        </button>
      </div>
    </form>
  );
};

export default NeedUserNameForm;
