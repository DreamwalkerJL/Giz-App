import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NeedUserNameForm.module.css";
import { allPps } from "../AllPps";
import { getAuth } from "firebase/auth";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UserDto } from "../../apiServices/Apollo/Types";
import { REGISTER_USER_MUTATION } from "../../apiServices/Apollo/Mutations";
import { updateCurrentUserProfile } from "../../firebase/updateCurrentUserProfile";
import { logCurrentUser } from "../../firebase/AuthFunction";
import { USER_PUBLIC_QUERY } from "../../apiServices/Apollo/Querys";

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
  const [registerUser] = useMutation<UserDto>(
    REGISTER_USER_MUTATION
  );
  
  const [getUserPublic] = useLazyQuery(USER_PUBLIC_QUERY);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!user || !userName || !email) return;
  
    try {
      // Execute the query and handle the response within the callback
      getUserPublic({ 
        variables: { userName }, 
        onCompleted: async (data) => {
          if (data && data.userPublicQuery) {
            // Username exists, handle this scenario
            console.error("Username already taken");
            // Display an appropriate error message to the user
          } else {
            // Username does not exist, proceed with registration
            try {
              const response = await registerUser({
                variables: {
                  userDto: { userName, email, profilePicture, uid: user.uid },
                },
              });
  
              updateCurrentUserProfile(userName);
              console.log("Registration successful", response);
              logCurrentUser();
              navigate("/status-site");
            } catch (regError) {
              console.error("Error during registration", regError);
              // Handle registration error
            }
          }
        },
        onError: (queryError) => {
          console.error("Error checking user existence", queryError);
          // Handle error in checking user
        }
      });
    } catch (e) {
      console.error("Error during registration", e);
      // Handle general error
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    // Allow only alphanumeric characters and limit to 16 characters
    const sanitizedUsername = newUsername.replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
    setUserName(sanitizedUsername);
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
            onChange={handleUsernameChange} 
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
