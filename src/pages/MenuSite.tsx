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
  

  

  

  return (
    <motion.div className={styles.menuSite} >
      <div className={styles.header}>
        <div className={styles.headerLogoAndTitle} onClick={onGoBackTClick}>
          <img
            className={styles.headerLogoIcon}
            alt=""
            src="/logoTransp.png"
          />
          <div className={styles.nameT}>GizApp</div>
        </div>
      </div>
      <motion.div className={styles.menuOptions} initial={{opacity:0, y:"-1%"}} animate={{opacity:1, y:0}} transition={{duration: .5}}>
        <div
          className={styles.changeProfilePicture}
          onClick={onChangeProfilePictureClick}
        >
          CHANGE PROFILE PICTURE
        </div>
        <div className={styles.notifications}>
          <img className={styles.boxIcon} alt="" src="/box.svg" />
          <div className={styles.notificationsT}>NOTIFICATIONS</div>
        </div>
        <div
          className={styles.changeProfilePicture}
          onClick={onContactUsTClick}
        >
          CONTACT US
        </div>
        <div className={styles.changeProfilePicture} onClick={handleSignOut}>
          SIGN OUT
        </div>
      </motion.div>
      <div className={styles.goBackFrame}>
        <div className={styles.goBackT} onClick={onGoBackTClick}>
          Go back
        </div>
      </div>
    </motion.div>
  );
};

export default MenuSite;
