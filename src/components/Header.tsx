import { FunctionComponent, useCallback } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  }, [navigate]);

  const buttonVariants = {
    hover: {
      scale: 1.2,
    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLogoAndTitle} onClick={onLogoClick}>
        <img className={styles.headerLogoIcon} alt="" src="/logoTransp.png" />
        <div className={styles.nameT}>GizApp</div>
      </div>
      <div className={styles.headerIcons}>
        <motion.div
          className={styles.notification}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          <img className={styles.bellIcon} alt="" src="/bell.svg" />
        </motion.div>
        <motion.div
          className={styles.menu}
          onClick={onMenuClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          <img className={styles.menuIcon} alt="" src="/menu.svg" />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
