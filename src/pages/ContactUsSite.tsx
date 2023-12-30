import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ContactUsSite.module.css";
import Header from "../components/Header";

const ContactUsSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onGoBackTClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  return (
    <div className={styles.contactUsSite}>
  <Header />
      <div className={styles.textContainer}>
        <div className={styles.aboutUsTContainer}>
          <p className={styles.gizappgizappcom}>gizapp@gizapp.com</p>
          <p className={styles.gizappgizappcom}>&nbsp;</p>
          <p className={styles.gizappgizappcom}>Thanks for using our App!</p>
        </div>
      </div>
      <div className={styles.goBackFrame}>
        <div className={styles.goBackT} onClick={onGoBackTClick}>
          Go back
        </div>
      </div>
    </div>
  );
};

export default ContactUsSite;
