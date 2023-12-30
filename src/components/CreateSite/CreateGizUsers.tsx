import { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./CreateGizUsers.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { UserPublic } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";

interface AddUserType {
  userNameRef: React.RefObject<HTMLInputElement>; // Updated type
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  addUser: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  userData: UserPublic[];
  setUserData: React.Dispatch<React.SetStateAction<UserPublic[]>>;
}

const storedUserDataString = localStorage.getItem("userData");
console.log(storedUserDataString);
if (storedUserDataString) {
  const storedUserData = JSON.parse(storedUserDataString);
  console.log(storedUserData[0].userName);
}

const AddUsers: FunctionComponent<AddUserType> = ({
  userNameRef,
  userName,
  setUserName,
  addUser,
  userData,
  setUserData,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { currentUser } = useAuth();
  const handleUserClick = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((prevId) => prevId !== userId)
        : [...prev, userId]
    );
  };
  console.log(userData);
  const handleRemoveSelectedUsers = () => {
    const updatedUserData = userData.filter(
      (user) => !selectedUsers.includes(user.userId)
    );

    setUserData(updatedUserData);

    setSelectedUsers([]);
  };

  const userDataWithoutCurrentUser = userData.filter(
    (user) => user.userName !== currentUser?.displayName
  );

  const reInvite = (userId: number) => {
    const updatedUserData = userData.map((user) => {
      if (user.userId === userId) {
        return {
          ...user,
          status: user.status === "declined" ? "invited" : "declined",
        };
      }
      return user;
    });

    setUserData(updatedUserData);
  };

  return (
    <div className={styles.createGizUsers}>
      <div className={styles.addUser}>
        <div className={styles.findUser}>
          <i className={styles.findUserHeadline}>FIND USER</i>
          <input
            ref={userNameRef}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.findUserInput}
            placeholder="Username"
            type="text"
          />
        </div>
        <div className={styles.addUser1}>
          <button className={styles.addUserButton} onClick={addUser}>
            <b className={styles.adduserbuttont}>ADD USER</b>
          </button>
        </div>
      </div>
      <div className={styles.toBeAddedUsers}>
        {userDataWithoutCurrentUser.map((user) => (
          <div
            key={user.userId}
            className={styles.userFrame}
            onClick={() => handleUserClick(user.userId)}
          >
            <motion.img
              className={styles.userImageIcon}
              alt={user.userName}
              src={user.profilePicture}
              initial={{ opacity: 0.5, y: "3%", borderColor: "#aa43ff"}}
              animate={{ opacity: 1, y: "0%",
                borderLeft: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid #302b4f",
                borderRight: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid #302b4f",
                borderTop: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid #302b4f",
              }}
            />
            <motion.div
              className={styles.userNameTFrame}
              initial={{ opacity: 0.5, y: "3%", borderColor: "#aa43ff"}}
              animate={{ opacity: 1, y: "0%",
                borderLeft: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid #302b4f",
                borderRight: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid #302b4f",
                borderBottom: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid #302b4f",
              }}
            >
              <div className={styles.userNameT}>{user.userName}</div>
            </motion.div>
            {user.status === "declined" && (
              <button onClick={() => reInvite(user.userId)}>ReInvite</button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.removeSelectedUsers}>
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: selectedUsers.length > 0 ? 1 : 0.5 }}
          className={styles.removeSelectedUsersButton}
          style={{ pointerEvents: selectedUsers.length > 0 ? "auto" : "none" }}
          onClick={handleRemoveSelectedUsers}
        >
          <b className={styles.adduserbuttont}>REMOVE SELECTED USERS</b>
        </motion.button>
      </div>
    </div>
  );
};

export default AddUsers;
