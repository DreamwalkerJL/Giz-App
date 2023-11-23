import { FunctionComponent } from "react";
import styles from "./GizInformations.module.css";

const GizInformations: FunctionComponent = () => {
  return (
    <div className={styles.informationFrame}>
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

export default GizInformations;
