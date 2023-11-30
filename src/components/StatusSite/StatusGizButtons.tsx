import { FunctionComponent } from "react";
import styles from "./StatusGizButtons.module.css";
import { useNavigate } from "react-router-dom";

const StatusGizButtons: FunctionComponent = () => {
  const navigate = useNavigate();

  const cancelStatusGiz = async ()=> {
    try {
      // DELETE User in GizList: userName, gizId
      // DELETE DB: /giz/gizId/users/userName
      // DELETE DB2: /users/userName/giz
      // const response = await axios.delete('http://localhost:8080/status/delete');
      // console.log(response.data);
      
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const editStatusGiz = async ()=> {
    try {
      // UPDATE gizId: giz/gizId
      // const response = await axios.update('http://localhost:8080/status/update');
      // console.log(response.data);
      
      navigate("/status-site");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className={styles.gizButtons}>
      <div className={styles.cancel}>
        <div className={styles.cancelButton}>
          <div className={styles.cancelButtonT}>CANCEL</div>
        </div>
      </div>
      <div className={styles.edit}>
        <div className={styles.editButton}>
          <div className={styles.cancelButtonT}>EDIT</div>
        </div>
      </div>
    </div>
  );
};

export default StatusGizButtons;
