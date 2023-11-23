import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./GizActionButtons.module.css";

type GizActionButtonsType = {
  buttonText?: string;
  actionButtonText?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBackgroundColor1?: CSSProperties["backgroundColor"];
};

const GizActionButtons: FunctionComponent<GizActionButtonsType> = ({
  buttonText,
  actionButtonText,
  propBackgroundColor,
  propBackgroundColor1,
}) => {
  const cancelButtonStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const editButtonStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
    };
  }, [propBackgroundColor1]);

  return (
    <div className={styles.gizButtons}>
      <div className={styles.cancel}>
        <div className={styles.cancelButton} style={cancelButtonStyle}>
          <div className={styles.cancelButtonT}>{buttonText}</div>
        </div>
      </div>
      <div className={styles.edit}>
        <div className={styles.editButton} style={editButtonStyle}>
          <div className={styles.cancelButtonT}>{actionButtonText}</div>
        </div>
      </div>
    </div>
  );
};

export default GizActionButtons;
