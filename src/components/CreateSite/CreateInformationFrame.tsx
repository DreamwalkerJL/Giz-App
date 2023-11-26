import { FunctionComponent } from "react";
import styles from "./CreateInformationFrame.module.css";

const CreateInformationFrame: FunctionComponent = () => {
    return (
      <div className={styles.createInformationFrame}>
        <div className={styles.gizDetailsFrame}>
          <div className={styles.titleAndDescription}>
            <div className={styles.title}>
              <i className={styles.headline}>TITLE</i>
              <div className={styles.titleFrame}>
                <div className={styles.titleInputT}>Warzone</div>
              </div>
            </div>
            <div className={styles.title}>
              <i className={styles.headline}>DESCRIPTION</i>
              <div className={styles.titleFrame}>
                <div className={styles.titleInputT}>
                  GIZGIZGIZGIZGIZ????? ES GIT HART MAN
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dateAndTime}>
            <div className={styles.date}>
              <b className={styles.dateT}>Today</b>
            </div>
            <div className={styles.date}>
              <b className={styles.dateT}>19:00</b>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateInformationFrame;
