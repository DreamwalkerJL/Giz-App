import React, { Dispatch, FunctionComponent, SetStateAction, useCallback } from 'react'
import styles from "./StatusGizButtons.module.css"
import { useNavigate } from "react-router-dom";
import { GizComplete } from '../../apiServices/Apollo/Types';

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

  return (
    <div
      className={styles.editButton}
    onClick={()=> onEditButtonContainerClick()}
    >
      <div className={styles.cancelButtonT}>EDIT</div>
    </div>
  )
}

export default EditButton
