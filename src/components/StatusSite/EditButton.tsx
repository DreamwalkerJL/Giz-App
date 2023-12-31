import React, { Dispatch, FunctionComponent, SetStateAction, useCallback } from 'react'
import styles from "./StatusGizButtons.module.css"
import { useNavigate } from "react-router-dom";
import { GizComplete } from '../../apiServices/Apollo/Types';
import { motion } from 'framer-motion';

interface EditButtonProps {
  gizComplete: GizComplete | undefined;
}
const EditButton: FunctionComponent<EditButtonProps> =({gizComplete}) => {
  const navigate = useNavigate();
  console.log("HAHHAHAHA")
  console.log(gizComplete)
  const onEditButtonContainerClick = useCallback(() => {
    const data = {
      // Add your data here
      gizComplete: gizComplete,
      // ... other data fields
    };
  
    navigate("/edit-site", { state: {...data,  }
     });
  }, [navigate]);

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };


  return (
    <motion.button
      className={styles.editButton}
    onClick={()=> onEditButtonContainerClick()}
    variants={buttonVariants}
    whileHover="hover"
    whileTap="pressed"
    >
      <div className={styles.editButtonT}>EDIT</div>
    </motion.button>
  )
}

export default EditButton
