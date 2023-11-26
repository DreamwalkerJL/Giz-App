import { FunctionComponent } from "react";
import styles from "./CreateGizUsers.module.css";

const CreateGizUsers: FunctionComponent = () => {
  return (
    <div className={styles.createGizUsers}>
      <div className={styles.addUser}>
        <div className={styles.findUser}>
          <i className={styles.findUserHeadline}>FIND USER</i>
          <div className={styles.finduserinput}>
            <div className={styles.findusert}>HotShotNidaleeGG</div>
          </div>
        </div>
        <div className={styles.addUser1}>
          <div className={styles.addUserButton}>
            <b className={styles.adduserbuttont}>ADD USER</b>
          </div>
        </div>
      </div>
      <div className={styles.toBeAddedUsers}>
        <div className={styles.userFrame}>
          <img
            className={styles.userImageIcon}
            alt=""
            src="/userimage@2x.png"
          />
          <div className={styles.userNameT}>MASTERking</div>
        </div>
        <div className={styles.userFrame1}>
          <img
            className={styles.userImageIcon}
            alt=""
            src="/userimage1@2x.png"
          />
          <div className={styles.userNameT}>Samiboy</div>
        </div>
        <div className={styles.userFrame}>
          <img
            className={styles.userImageIcon}
            alt=""
            src="/userimage2@2x.png"
          />
          <div className={styles.userNameT}>Guma</div>
        </div>
        <div className={styles.userFrame}>
          <img
            className={styles.userImageIcon}
            alt=""
            src="/userimage3@2x.png"
          />
          <div className={styles.userNameT3}>mmmm183g</div>
        </div>
        <div className={styles.userFrame}>
          <img
            className={styles.userImageIcon}
            alt=""
            src="/userimage4@2x.png"
          />
          <div className={styles.userNameT}>Guma</div>
        </div>
        <div className={styles.userFrame}>
          <img
            className={styles.userImageIcon}
            alt=""
            src="/userimage5@2x.png"
          />
          <div className={styles.userNameT}>pringlespride</div>
        </div>
      </div>
      <div className={styles.removeSelectedUsers}>
        <div className={styles.removeSelectedUsersButton}>
          <b className={styles.adduserbuttont}>REMOVE SELECTED USER</b>
        </div>
      </div>
    </div>
  );
};

export default CreateGizUsers;
