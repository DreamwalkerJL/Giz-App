import { FunctionComponent } from "react";
import styles from "./HeaderStart.module.css";

const HeaderStart: FunctionComponent = () => {
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
        <div className={styles.nameT}>Please enter your details to sign in</div>
      </div>
    </div>
  );
};

export default HeaderStart;
