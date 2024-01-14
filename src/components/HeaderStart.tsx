import { FunctionComponent } from "react";
import styles from "./HeaderStart.module.css";
import { useMediaQuery } from "react-responsive";

type HeaderStartType = {
  instructionT?: string;
};

const HeaderStart: FunctionComponent<HeaderStartType> = ({ instructionT }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className={styles.header}>
      <div className={styles.logoAndName}>
       {!isMobile&& <img className={styles.logoIcon} alt="" src="/logoTransp.png" />}
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
