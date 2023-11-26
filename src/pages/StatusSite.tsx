import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import GizInformations from "../components/GizInformations";
import InvitedUsers from "../components/InvitedUsers";
import GizActionButtons from "../components/GizActionButtons";
import styles from "./StatusSite.module.css";
import StatusGizUsers from "../components/StatusSite/StatusGizUsers";
import StatusInformationFrame from "../components/StatusSite/StatusInformationFrame";

const StatusSite: FunctionComponent = () => {
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

  return (
    <div className={styles.statusSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options
        onOptionsStatusFrameClick={onOptionsStatusFrameClick}
        onOptionsInvitesFrameClick={onOptionsInvitesFrameClick}
      />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
        <StatusInformationFrame />
          <StatusGizUsers />
          <GizActionButtons buttonText="CANCEL" actionButtonText="EDIT" />
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};

export default StatusSite;
