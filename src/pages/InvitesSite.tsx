import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./InvitesSite.module.css";
import InvitesGizUsers from "../components/InvitesSite/InvitesGizUsers";
import InvitesInformationFrame from "../components/InvitesSite/InvitesInformationFrame";
import InvitesGizButtons from "../components/InvitesSite/InvitesGizButtons";

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
          <InvitesGizButtons />
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};

export default InvitesSite;
