import { FunctionComponent } from "react";
import styles from "./StatusGizInfoAndUsers.module.css";

const StatusGizInfoAndUsers: FunctionComponent = () => {
  return (
    <div className={styles.gizInfoAndUsers}>
      <div className={styles.statusInformationFrame}>
        <div className={styles.titleAndDescription}>
          <i className={styles.titleT}>WARZONE</i>
          <div className={styles.descriptionT}>
            GIZGIZGIZGIZGIZ????? ES GIT HART MAN
          </div>
        </div>
        <div className={styles.madeByT}>Made by userName</div>
        <div className={styles.dateFrame}>
          <div className={styles.dateIsT}>Today - 19:00</div>
          <div className={styles.dateHowLong}>(In 18 min)</div>
        </div>
      </div>
      <div className={styles.statusGizUsers}>
        <div className={styles.checkBarFrame}>
          <div className={styles.checkBar}>
            <div className={styles.checkAccepted}>
              <div className={styles.dateIsT}>1</div>
            </div>
            <div className={styles.checkDeclined}>
              <div className={styles.dateIsT}>1</div>
            </div>
            <div className={styles.checkUndecided}>
              <div className={styles.dateIsT}>4</div>
            </div>
          </div>
        </div>
        <div className={styles.invitedUsers}>
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
      </div>
    </div>
  );
};

export default StatusGizInfoAndUsers;
