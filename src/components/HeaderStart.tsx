import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./HeaderStart.module.css";

type HeaderStartType = {
  logo?: string;

  /** Style props */
  headerFlex?: CSSProperties["flex"];
  headerHeight?: CSSProperties["height"];
};

const HeaderStart: FunctionComponent<HeaderStartType> = ({
  headerFlex,
  headerHeight,
  logo,
}) => {
  const headerStyle: CSSProperties = useMemo(() => {
    return {
      flex: headerFlex,
      height: headerHeight,
    };
  }, [headerFlex, headerHeight]);

  return (
    <div className={styles.header} style={headerStyle}>
      <div className={styles.logoAndName}>
        <img className={styles.logoIcon} alt="" src={logo} />
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
