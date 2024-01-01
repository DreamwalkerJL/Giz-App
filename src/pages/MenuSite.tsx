import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuSite.module.css";
import { signOutUser } from "../firebase/AuthSignout";
import { motion } from "framer-motion";

const MenuSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onChangeProfilePictureClick = useCallback(() => {
    navigate("/edit-profile");
  }, [navigate]);

  const onContactUsTClick = useCallback(() => {
    navigate("/contact-us-site");
  }, [navigate]);

  const onSingOutTClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onGoBackTClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const handleSignOut = async () => {
    await signOutUser();

    // Additional logic after sign out, like redirecting the user
  };

  const buttonVariants = {
    hover: {
      scale: 1.07,

    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  return (
    <motion.div className={styles.menuSite}>
      <div className={styles.header}>
        <div className={styles.headerLogoAndTitle} onClick={onGoBackTClick}>
          <img className={styles.headerLogoIcon} alt="" src="/logoTransp.png" />
          <div className={styles.nameT}>GizApp</div>
        </div>
      </div>
      <motion.div
        className={styles.menuOptions}
        initial={{ opacity: 0, y: "-1%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={styles.changeProfilePicture}
          onClick={onChangeProfilePictureClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          CHANGE PROFILE PICTURE
        </motion.div>
        <motion.div
          className={styles.notifications}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          <img className={styles.boxIcon} alt="" src="/box.svg" />
          <div className={styles.notificationsT}>NOTIFICATIONS</div>
        </motion.div>
        <motion.div
          className={styles.changeProfilePicture}
          onClick={onContactUsTClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          CONTACT US
        </motion.div>
        <motion.div
          className={styles.changeProfilePicture}
          onClick={handleSignOut}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          SIGN OUT
        </motion.div>
      </motion.div>
      <div className={styles.goBackFrame}>
        <motion.div className={styles.goBackT} onClick={onGoBackTClick}           variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed">
          Go back
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MenuSite;
