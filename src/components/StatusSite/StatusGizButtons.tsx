import { FunctionComponent } from "react";
import styles from "./StatusGizButtons.module.css";

const StatusGizButtons: FunctionComponent = () => {
  return (
    <div className={styles.gizButtons}>
      <div className={styles.cancel}>
        <div className={styles.cancelButton}>
          <div className={styles.cancelButtonT}>CANCEL</div>
        </div>
      </div>
      <div className={styles.edit}>
        <div className={styles.editButton}>
          <div className={styles.cancelButtonT}>EDIT</div>
        </div>
      </div>
    </div>
  );
};

export default StatusGizButtons;
