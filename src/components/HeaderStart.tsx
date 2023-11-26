import { FunctionComponent } from "react";
import styles from "./HeaderStart.module.css";

type HeaderStartType = {
  instructionT?: string;
};

const HeaderStart: FunctionComponent<HeaderStartType> = ({ instructionT }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logoAndName}>
        <img className={styles.logoIcon} alt="" src="/logoTransp.png" />
        <div className={styles.nameT}>GizApp</div>
      </div>
      <div className={styles.slogan}>
        <div className={styles.sloganT}>Where Time Meets Intent.</div>
      </div>
      <div className={styles.instruction}>
        <div className={styles.instructionT}>{instructionT}</div>
      </div>
    </div>
  );
};

export default HeaderStart;
