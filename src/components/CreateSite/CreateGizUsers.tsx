import { FunctionComponent, useState } from "react";
import styles from "./CreateGizUsers.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { UserPublic } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import { USER_FAVORITES_MUTATION } from "../../apiServices/Apollo/Mutations";
import { useGizData } from "../GizDataContext";
import { toast } from "react-toastify";

interface AddUserType {
  userNameRef: React.RefObject<HTMLInputElement>; // Updated type
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  addUser: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  addFavoriteUser: (
    event: React.MouseEvent<HTMLButtonElement>,
    user: UserPublic
  ) => Promise<void>;
  userData: UserPublic[];
  setUserData: React.Dispatch<React.SetStateAction<UserPublic[]>>;
}

const AddUsers: FunctionComponent<AddUserType> = ({
  userNameRef,
  userName,
  setUserName,
  addUser,
  addFavoriteUser,
  userData,
  setUserData,
}) => {
  const [windowWidth] = useState(window.innerWidth);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const [reInviteUser, setReInviteUser] = useState<number[]>([]);
  const { userFavorites, setUserFavorites } = useGizData();
  const [favoritesMutation] = useMutation(USER_FAVORITES_MUTATION);

  function isFavourite(userId: number) {
    return userFavorites?.some((user) => user.userId === userId);
  }

  function toggleFavorite(user: UserPublic) {
    // Update this function to work with UserPublicData
    if (user.userName === currentUser?.displayName) {
      toast.error("You can't favorite yourself");
      return;
    }
    favoritesMutation({
      variables: { uid: uid, userId: user.userId },
    });
    setUserFavorites((prev) => {
      const isAlreadyFavorite = prev.some(
        (favUser) => favUser.userId === user.userId
      );
      if (isAlreadyFavorite) {
        return prev.filter((favUser) => favUser.userId !== user.userId);
      } else {
        return [...prev, user];
      }
    });
  }

  const handleUserClick = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((prevId) => prevId !== userId)
        : [...prev, userId]
    );
  };

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
    setReInviteUser((prev) => [...prev, userId]);
    setUserData(updatedUserData);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Create a new mouse event or call addUser differently if needed
      addUser(event as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.07,
      transition: {},
    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  // const getImagePath = (profilePicture: string) => {
  //   const folder = windowWidth > 800 ? 'ImageUrlsDesktop' : 'ImageUrlsMobile';
  //   return `public/${folder}/${profilePicture}`;
  // };

  const getImagePath = (profilePicture: string) => {
    const folder = windowWidth > 800 ? "ImageUrlsDesktop" : "ImageUrlsMobile";
    return `/${folder}/${profilePicture}`;
  };

  return (
    <div className={styles.createGizUsers}>
      <div className={styles.favorites}>
        {userFavorites.map((user) => (
          <button
            key={user.userId}
            className={styles.favoritesFrame}
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              addFavoriteUser(event, user)
            }
          >
            <div className={styles.plusFrame}>
              <div className={styles.plus}>★</div>
            </div>
            <div className={styles.plus}>{user.userName}</div>
          </button>
        ))}
      </div>
      <div className={styles.toBeAddedUsers}>
        {userDataWithoutCurrentUser.map((user) => (
          <div key={user.userId} className={styles.userFrame}>
            <div className={styles.userImageBorder}>
              <div
                className={styles.starOverlay}
                style={{ color: isFavourite(user.userId) ? "gold" : "white" }}
                onClick={() => {
                  console.log(`uid: ${uid}, userId: ${user.userId}`);
                  toggleFavorite(user);
                }}
              >
                {isFavourite(user.userId) ? "★" : "☆"}
              </div>
              <motion.img
                className={styles.userImageIcon}
                alt={user.userName}
                src={getImagePath(user.profilePicture)}
                onClick={() => handleUserClick(user.userId)}
                initial={{
                  opacity: 0.5,
                  y: "3%",
                  borderColor: "#aa43ff",
                }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  borderLeft: selectedUsers.includes(user.userId)
                    ? "2px solid rgba(241, 85, 85, 0.75)"
                    : reInviteUser.includes(user.userId)
                    ? "2px solid #55E063"
                    : "2px solid #302b4f",
                  borderRight: selectedUsers.includes(user.userId)
                    ? "2px solid rgba(241, 85, 85, 0.75)"
                    : reInviteUser.includes(user.userId)
                    ? "2px solid #55E063"
                    : "2px solid #302b4f",
                  borderTop: selectedUsers.includes(user.userId)
                    ? "2px solid rgba(241, 85, 85, 0.75)"
                    : reInviteUser.includes(user.userId)
                    ? "2px solid #55E063"
                    : "2px solid #302b4f",
                }}
              />
            </div>

            <motion.div
              className={styles.userNameTFrame}
              onClick={() => handleUserClick(user.userId)}
              initial={{ opacity: 0.5, y: "3%", borderColor: "#aa43ff" }}
              animate={{
                opacity: 1,
                y: "0%",
                borderLeft: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : reInviteUser.includes(user.userId)
                  ? "2px solid #55E063"
                  : "2px solid #302b4f",
                borderRight: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : reInviteUser.includes(user.userId)
                  ? "2px solid #55E063"
                  : "2px solid #302b4f",
                borderBottom: selectedUsers.includes(user.userId)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : reInviteUser.includes(user.userId)
                  ? "2px solid #55E063"
                  : "2px solid #302b4f",
              }}
            >
              <div className={styles.userNameTBox}>
                <div className={styles.userNameT}>{user.userName}</div>
              </div>
            </motion.div>
            {user.status === "declined" && (
              <motion.button
                className={styles.reInviteButton}
                onClick={() => reInvite(user.userId)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
              >
                Invite Again
              </motion.button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.addUser}>
        <div className={styles.findUser}>
          <i className={styles.findUserHeadline}>FIND USER</i>
          <input
            ref={userNameRef}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleEnterPress} // Add onKeyDown event handler
            className={styles.findUserInput}
            placeholder="Username"
            type="text"
          />
        </div>

        <div className={styles.addUser1}>
          <motion.button
            className={styles.addUserButton}
            onClick={addUser}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="pressed"
          >
            <b className={styles.adduserbuttont}>ADD USER</b>
          </motion.button>
        </div>
      </div>

      <div className={styles.removeSelectedUsers}>
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: selectedUsers.length > 0 ? 1 : 0.5 }}
          className={styles.removeSelectedUsersButton}
          style={{ pointerEvents: selectedUsers.length > 0 ? "auto" : "none" }}
          onClick={handleRemoveSelectedUsers}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          <b className={styles.adduserbuttont}>REMOVE SELECTED USERS</b>
        </motion.button>
      </div>
    </div>
  );
};

export default AddUsers;
