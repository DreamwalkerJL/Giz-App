import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Options.module.css";
import { motion } from "framer-motion";

type OptionsType = {
  activeTab: "CREATE" | "STATUS" | "INVITES";
};

const Options: FunctionComponent<OptionsType> = ({ activeTab }) => {
  const navigate = useNavigate();

  const onOptionsCreateFrameClick = useCallback(() => {
    navigate("/create-site");
  }, [navigate]);

  const onOptionsStatusFrameClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const onOptionsInvitesFrameClick = useCallback(() => {
    navigate("/invites-site");
  }, [navigate]);

  const tabVariants = {
    active: {
      backgroundColor: "#6b56a3",
      opacity: 1,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25) inset",
      border: "1px solid #302B4F",
      transition: { duration: 0.5 },
    },
    inactive: {
      backgroundColor: "#302B4F",
      opacity: 1,
      border: "none",
      transition: { duration: 0 },
    },
  };

  return (
    <div className={styles.optionsFrame}>
      <div className={styles.optionsButtonFrame}>
        <motion.div
          className={styles.optionsCreateFrame}
          onClick={onOptionsCreateFrameClick}
          variants={tabVariants}
          initial="inactive" // Set the initial state
          animate={activeTab === "CREATE" ? "active" : "inactive"}
        >
          <b className={styles.optionsCreateT}>CREATE</b>
        </motion.div>
        <motion.div
          className={styles.optionsStatusFrame}
          onClick={onOptionsStatusFrameClick}
          variants={tabVariants}
          initial="inactive" // Set the initial state
          animate={activeTab === "STATUS" ? "active" : "inactive"}
        >
          <b className={styles.optionsCreateT}>STATUS</b>
        </motion.div>
        <motion.div
          className={styles.optionsStatusFrame}
          onClick={onOptionsInvitesFrameClick}
          variants={tabVariants}
          initial="inactive" // Set the initial state
          animate={activeTab === "INVITES" ? "active" : "inactive"}
        >
          <b className={styles.optionsCreateT}>INVITES</b>
        </motion.div>
      </div>
    </div>
  );
};

export default Options;
