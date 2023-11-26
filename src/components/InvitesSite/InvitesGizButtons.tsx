import { FunctionComponent } from "react";
import styles from "./InvitesGizButtons.module.css";

const InvitesGizButtons: FunctionComponent = () => {
  return (
    <div className={styles.gizButtons}>
      <div className={styles.accept}>
        <div className={styles.acceptButton}>
          <div className={styles.acceptButtonT}>ACCEPT</div>
        </div>
      </div>
      <div className={styles.decline}>
        <div className={styles.declineButton}>
          <div className={styles.acceptButtonT}>DECLINE</div>
        </div>
      </div>
    </div>
  );
};

export default InvitesGizButtons;
