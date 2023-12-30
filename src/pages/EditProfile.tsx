import { FunctionComponent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./EditProfile.module.css";
import { useMutation } from "@apollo/client";

import { allPps } from "../components/AllPps";
import { useAuth } from "../firebase/AuthContext";
import { CHANGE_PP_MUTATION } from "../apiServices/Apollo/Mutations";

const EditProfile: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onCreateGizButton1Click = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const onCancelButtonContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const [changePp, { loading: changePpLoading, error: changePpError, data: changePpResponse }] =
    useMutation(CHANGE_PP_MUTATION);

  const [selectedUsers, setSelectedUsers] = useState<number>();
  const { currentUser } = useAuth();
  const handleUserClick = (index: number) => {
    setSelectedUsers(index);
  };

const handleChangePp = (index: number | undefined) => {
  if (currentUser && index !== undefined) { // Explicitly check for undefined
    try {
      const chosenPp = allPps[index];
      changePp({ variables: { userName: currentUser.displayName, newPp: chosenPp } });
      console.log(changePpResponse);
      navigate("/status-site");
    } catch (e) {
      console.log(e);
      console.log(changePpError);
    }
  } else {
    console.error("No new Profile Picture has been chosen");
  }
};

  return (
    <div className={styles.editProfile}>
      <Header />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          <div className={styles.users}>
            <div className={styles.titleT}>CHOOSE A NEW PROFILE PICTURE</div>
            <div className={styles.profilePictures}>
              {allPps.map((pp, index) => (
                <img
                  key={index} // It's good practice to provide a unique key for each item in a list
                  className={styles.userImageIcon}
                  alt={`Profile ${index}`} // Providing a meaningful alt text
                  src={pp}
                  style={{
                    border: selectedUsers == index
                      ? "2px solid rgba(241, 85, 85, 0.75)"
                      : "2px solid rgba(48, 48, 48, 0.75)",
                  }}
                  onClick={() => handleUserClick(index)}
                />
              ))}
              {/* <img
                className={styles.userImageIcon}
                alt=""
                src="/userimage5@2x.png"
              />
              <img
                className={styles.userImageIcon}
                alt=""
                src="/userimage4@2x.png"
              />
              <img
                className={styles.userImageIcon}
                alt=""
                src="/userimage3@2x.png"
              />
              <img
                className={styles.userImageIcon}
                alt=""
                src="/userimage2@2x.png"
              />
              <img
                className={styles.userImageIcon}
                alt=""
                src="/userimage6@2x.png"
              />
              <img
                className={styles.userImageIcon}
                alt=""
                src="/userimage@2x.png"
              /> */}
            </div>
          </div>
          <div className={styles.createOrCancel}>
            <div className={styles.createGizButtonFrame}>
              <div
                className={styles.createGizButton}
                onClick={()=> handleChangePp(selectedUsers)}
              >
                <b className={styles.cancelButtonT}>ACCEPT</b>
              </div>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <div
                className={styles.cancelButton}
                onClick={onCancelButtonContainerClick}
              >
                <b className={styles.cancelButtonT}>CANCEL</b>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </div>
    </div>
  );
};

export default EditProfile;
