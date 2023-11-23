import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import GizDetails from "../components/CreateSite/GizDetails";
import AddUsers from "../components/CreateSite/AddUsers";
import styles from "./CreateSite.module.css";

const CreateSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onOptionsStatusFrameClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const onOptionsInvitesFrameClick = useCallback(() => {
    navigate("/invites-site");
  }, [navigate]);

  const onCreateGizButton1Click = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  return (
    <div className={styles.createSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options
        propBackgroundColor="#6b56a3"
        propBoxShadow="0px 4px 4px rgba(0, 0, 0, 0.25) inset"
        propBackgroundColor1="#302b4f"
        propBoxShadow1="unset"
        propBackgroundColor2="#302b4f"
        propBoxShadow2="unset"
        onOptionsStatusFrameClick={onOptionsStatusFrameClick}
        onOptionsInvitesFrameClick={onOptionsInvitesFrameClick}
      />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          <GizDetails />
          <AddUsers />
          <div className={styles.createOrCancel}>
            <div className={styles.createGizButtonFrame}>
              <div
                className={styles.createGizButton}
                onClick={onCreateGizButton1Click}
              >
                <div className={styles.createGizButtonContainer}>
                  <b>CREATE</b>
                  <span className={styles.span}>{` `}</span>
                  <b>GIZ</b>
                </div>
              </div>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <div className={styles.cancelButton}>
                <b className={styles.createGizButtonContainer}>CANCEL</b>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </div>
    </div>
  );
};

export default CreateSite;
