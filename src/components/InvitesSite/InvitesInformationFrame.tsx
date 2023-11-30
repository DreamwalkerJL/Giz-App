import { FunctionComponent } from "react";
import styles from "../ModulesForMultipleComponents/InformationFrame.module.css";
import { useNavigate } from "react-router-dom";

const InvitesInformationFrame: FunctionComponent = () => {
  const navigate = useNavigate();

  const getInvitesInformations = async ()=> {
    try {
      // GET Informations: title, description, date
      // DB: /users/userName/gizInvitesId
      // DB2: /giz/gizId/ - "GET title, description, date"
      // const response = await axios.get('http://localhost:8080/status/informations');
      // console.log(response.data);
      
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  return (
    <div className={styles.invitesInformationFrame}>
      <div className={styles.titleAndDescription}>
        <i className={styles.titleT}>WARZONE</i>
        <div className={styles.descriptionT}>
          GIZGIZGIZGIZGIZ????? ES GIT HART MAN
        </div>
      </div>
      <div className={styles.dateFrame}>
        <div className={styles.dateIsT}>Today - 19:00</div>
        <div className={styles.dateHowLong}>(In 18 min)</div>
      </div>
    </div>
  );
};

export default InvitesInformationFrame;
