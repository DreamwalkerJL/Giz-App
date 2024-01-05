import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuSite.module.css";
import { signOutUser } from "../firebase/AuthSignout";
import { motion } from "framer-motion";
import { REFRESH_FCM_TOKEN_MUTATION } from "../apiServices/Apollo/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { IS_NOTIFICATION_ENABLED } from "../apiServices/Apollo/Querys";
import { toast } from "react-toastify";

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

  const { currentUser } = getAuth();
  const uid = currentUser?.uid;
  if (!uid) return;
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [refreshFcmToken] = useMutation(REFRESH_FCM_TOKEN_MUTATION);
  const { data, loading, error } = useQuery(IS_NOTIFICATION_ENABLED, {
    variables: { uid },
    fetchPolicy: "network-only", // Ensures fresh data on each component mount
  });

  const handleNotificationChange = async (isEnabled: boolean) => {
    if (isEnabled && Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Notification permission not granted");
        toast.info("🔼   🔼   🔼 To enable notifications, click the icon somwehere above here in the address bar and choose 'Allow' for notifications.", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 15000
        });
        return;
      }
    }
  
    setNotificationPermission(isEnabled);
  
    let fcmToken = null;
  
    if (isEnabled) {
      if (
        Notification.permission === "granted" ||
        (await Notification.requestPermission()) === "granted"
      ) {
        try {
          fcmToken = await getToken(messaging, {
            vapidKey:
              "BPEZCuuO4soum6IPVkxeeg_8g2iIABONW87tZmDPNIdlFKUfaCC9vM1yPa4aZA7CrjjZIRj7Mf7OJ5vGpumTZAk",
          });
        } catch (error) {
          console.error("Error fetching FCM token", error);
        }
      }
    } else {
      fcmToken = null;
    }
  
    try {
      await refreshFcmToken({
        variables: {
          fcmToken,
          uid: uid,
        },
      });
    } catch (error) {
      console.error("Error updating FCM token status", error);
    }
  };
  
  useEffect(() => {
    if (!loading && !error && data) {
      // Assuming 'isNotificationEnabled' is true if token is present and false if not
      setNotificationPermission(data.isNotificationEnabled);
    }
  }, [data, loading, error]);

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
        <div
        className={styles.notificationsContainer}
        onClick={() => handleNotificationChange(!notificationPermission)}
      >
        <div className={styles.notificationsT}>NOTIFICATIONS</div>
        <motion.div
          className={`${styles.notificationsLine} ${notificationPermission ? styles.notificationsLineActive : ''}`}
          layout
          transition={{ duration: 0.3 }}
        />
        <div
          className={`${styles.notificationsToggleText} ${notificationPermission ? styles.notificationsToggleTextActive : ''}`}
        >
          {notificationPermission ? "ON" : "OFF"}
        </div>
      </div>
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
        <motion.div
          className={styles.goBackT}
          onClick={onGoBackTClick}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="pressed"
        >
          Go back
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MenuSite;
