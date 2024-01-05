import {

  FunctionComponent,

  useCallback,
} from "react";
import styles from "./StatusSite/StatusGizButtons.module.css";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { GizComplete } from "../apiServices/Apollo/Types";

interface EditButtonProps {
  gizComplete: GizComplete | undefined;
}
const RegroupButton: FunctionComponent<EditButtonProps> = ({ gizComplete }) => {
  const navigate = useNavigate();

  const onEditButtonContainerClick = useCallback(() => {
    const data = {
      // Add your data here
      gizComplete: gizComplete,
      isRegroup: true,
      // ... other data fields
    };

    navigate("/edit-site", { state: { ...data } });
  }, [navigate]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  return (
    <motion.button
      className={styles.regroupButton}
      onClick={() => onEditButtonContainerClick()}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="pressed"
    >
      <div className={styles.editButtonT}>REGROUP</div>
    </motion.button>
  );
};

export default RegroupButton;
