import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Options.module.css";

type OptionsType = {
  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBoxShadow?: CSSProperties["boxShadow"];
  propBackgroundColor1?: CSSProperties["backgroundColor"];
  propBoxShadow1?: CSSProperties["boxShadow"];
  propBackgroundColor2?: CSSProperties["backgroundColor"];
  propBoxShadow2?: CSSProperties["boxShadow"];

  /** Action props */
  onOptionsStatusFrameClick?: () => void;
  onOptionsInvitesFrameClick?: () => void;
};

const Options: FunctionComponent<OptionsType> = ({
  propBackgroundColor,
  propBoxShadow,
  propBackgroundColor1,
  propBoxShadow1,
  propBackgroundColor2,
  propBoxShadow2,
  onOptionsStatusFrameClick,
  onOptionsInvitesFrameClick,
}) => {
  const optionsCreateFrameStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      boxShadow: propBoxShadow,
    };
  }, [propBackgroundColor, propBoxShadow]);

  const optionsStatusFrameStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor1,
      boxShadow: propBoxShadow1,
    };
  }, [propBackgroundColor1, propBoxShadow1]);

  const optionsInvitesFrameStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor2,
      boxShadow: propBoxShadow2,
    };
  }, [propBackgroundColor2, propBoxShadow2]);

  const navigate = useNavigate();

  const onOptionsCreateFrameClick = useCallback(() => {
    navigate("/create-site");
  }, [navigate]);

  return (
    <div className={styles.optionsFrame}>
      <div className={styles.optionsButtonFrame}>
        <div
          className={styles.optionsCreateFrame}
          onClick={onOptionsCreateFrameClick}
          style={optionsCreateFrameStyle}
        >
          <b className={styles.optionsCreateT}>CREATE</b>
        </div>
        <div
          className={styles.optionsStatusFrame}
          onClick={onOptionsStatusFrameClick}
          style={optionsStatusFrameStyle}
        >
          <b className={styles.optionsCreateT}>STATUS</b>
        </div>
        <div
          className={styles.optionsCreateFrame}
          onClick={onOptionsInvitesFrameClick}
          style={optionsInvitesFrameStyle}
        >
          <b className={styles.optionsCreateT}>INVITES</b>
        </div>
      </div>
    </div>
  );
};

export default Options;
