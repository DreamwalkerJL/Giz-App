import { FunctionComponent, useState } from "react";
import styles from "../ModulesForMultipleComponents/InformationFrame.module.css";
import { useNavigate } from "react-router-dom";

interface StatusInformationFrameProps {
  title: string;
  description: string;
  date: string;
  // add other fields if necessary
}



const StatusInformationFrame: FunctionComponent<StatusInformationFrameProps> = ({ title, description, date }) => {
  const navigate = useNavigate();



  return (
    <div className={styles.statusInformationFrame}>
      <div className={styles.titleAndDescription}>
        <i className={styles.titleT}>{title}</i>
        <div className={styles.descriptionT}>
          {description}
        </div>
      </div>
      <div className={styles.dateFrame}>
        <div className={styles.dateIsT}>{date}</div>
        <div className={styles.dateHowLong}>(In 18 min)</div>
      </div>
    </div>
  );
};

export default StatusInformationFrame;
