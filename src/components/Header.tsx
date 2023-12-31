import { FunctionComponent, useCallback } from "react";
import styles from "./Header.module.css";
import { useNavigate} from "react-router-dom";

type HeaderType = {
  /** Action props */
  onMenuContainerClick?: () => void;
};

const Header: FunctionComponent<HeaderType> = () => {

  const navigate = useNavigate();

  const onMenuClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onLogoClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate] ); 


  return (
    <div className={styles.header}>
      <div className={styles.headerLogoAndTitle} onClick={onLogoClick}>
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
        <div className={styles.menu} onClick={onMenuClick}>
          <img className={styles.menuIcon} alt="" src="/menu.svg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
