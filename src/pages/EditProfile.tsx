import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./EditProfile.module.css";

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

  return (
    <div className={styles.editProfile}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          <div className={styles.users}>
            <div className={styles.titleT}>CHOOSE A NEW PROFILE PICTURE</div>
            <div className={styles.profilePictures}>
              <img
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
              />
            </div>
          </div>
          <div className={styles.createOrCancel}>
            <div className={styles.createGizButtonFrame}>
              <div
                className={styles.createGizButton}
                onClick={onCreateGizButton1Click}
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
