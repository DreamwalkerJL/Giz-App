import { FunctionComponent } from "react";
import styles from "./Header.module.css";

type HeaderType = {
  /** Action props */
  onMenuContainerClick?: () => void;
};

const Header: FunctionComponent<HeaderType> = ({ onMenuContainerClick }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogoAndTitle}>
        <img
          className={styles.headerLogoIcon}
          alt=""
          src="/logoTransp.png"
        />
        <div className={styles.nameT}>GizApp</div>
      </div>
      <div className={styles.headerIcons}>
        <div className={styles.notification}>
          <img className={styles.bellIcon} alt="" src="/bell.svg" />
        </div>
        <div className={styles.menu} onClick={onMenuContainerClick}>
          <img className={styles.menuIcon} alt="" src="/menu.svg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
