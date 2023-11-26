import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import GizActionButtons from "../components/GizActionButtons";
import styles from "./InvitesSite.module.css";
import InvitesGizUsers from "../components/InvitesSite/InvitesGizUsers";
import InvitesInformationFrame from "../components/InvitesSite/InvitesInformationFrame";

const InvitesSite: FunctionComponent = () => {
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
    <div className={styles.invitesSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options
        propBackgroundColor="#302b4f"
        propBoxShadow="unset"
        propBackgroundColor1="#302b4f"
        propBoxShadow1="unset"
        propBackgroundColor2="#6b56a3"
        propBoxShadow2="0px 4px 4px rgba(0, 0, 0, 0.25) inset"
        onOptionsStatusFrameClick={onOptionsStatusFrameClick}
        onOptionsInvitesFrameClick={onOptionsInvitesFrameClick}
      />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
        <InvitesInformationFrame />
          <InvitesGizUsers />
          <GizActionButtons
            buttonText="ACCEPT"
            actionButtonText="DECLINE"
            propBackgroundColor="#6ee57a"
            propBackgroundColor1="#f15555"
          />
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};

export default InvitesSite;
