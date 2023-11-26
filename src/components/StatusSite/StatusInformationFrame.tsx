import { FunctionComponent } from "react";
import styles from "../RepeatedModules/InformationFrame.module.css";

const StatusInformationFrame: FunctionComponent = () => {
  return (
    <div className={styles.statusInformationFrame}>
      <div className={styles.titleAndDescription}>
        <i className={styles.titleT}>WARZONE</i>
        <div className={styles.descriptionT}>
          GIZGIZGIZGIZGIZ????? ES GIT HART MAN
        </div>
      </div>
      <div className={styles.dateFrame}>
        <div className={styles.dateIsT}>Today - 19:00</div>
        <div className={styles.dateHowLong}>(In 18 min)</div>
      </div>
    </div>
  );
};

export default StatusInformationFrame;
