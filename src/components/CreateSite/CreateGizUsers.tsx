import { FunctionComponent, useEffect, useState } from "react";
import styles from "./CreateGizUsers.module.css";
import { getUserResponseDataType } from "../../apiServices/CreateApiServices";

interface AddUserType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  addUser: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  userData: getUserResponseDataType[];
  setUserData: React.Dispatch<React.SetStateAction<getUserResponseDataType[]>>;
}

const storedUserDataString = localStorage.getItem("userData");
console.log(storedUserDataString);
if (storedUserDataString) {
  const storedUserData = JSON.parse(storedUserDataString);
  console.log(storedUserData[0].userName);
}

const AddUsers: FunctionComponent<AddUserType> = ({
  userName,
  setUserName,
  addUser,
  userData,
  setUserData,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleUserClick = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((prevId) => prevId !== userId)
        : [...prev, userId]
    );
  };

  const handleRemoveSelectedUsers = () => {
    const updatedUserData = userData.filter(
      (user) => !selectedUsers.includes(user.id)
    );

    setUserData(updatedUserData);

    setSelectedUsers([]);
  };

  return (
    <div className={styles.createGizUsers}>
      <div className={styles.addUser}>
        <div className={styles.findUser}>
          <i className={styles.findUserHeadline}>FIND USER</i>
          <input
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
        {userData.map((user) => (
          <div
            key={user.id}
            className={styles.userFrame}
            onClick={() => handleUserClick(user.id)}
          >
            <img
              className={styles.userImageIcon}
              alt={user.userName}
              src={user.profilePicture}
              style={{
                border: selectedUsers.includes(user.id)
                  ? "2px solid rgba(241, 85, 85, 0.75)"
                  : "2px solid rgba(48, 48, 48, 0.75)",
              }}
            />
            <div className={styles.userNameT}>{user.userName}</div>
          </div>
        ))}
      </div>
      <div className={styles.removeSelectedUsers}>
        <button
          className={styles.removeSelectedUsersButton}
          onClick={handleRemoveSelectedUsers}
        >
          <b className={styles.adduserbuttont}>REMOVE SELECTED USERS</b>
        </button>
      </div>
    </div>
  );
};

export default AddUsers;
