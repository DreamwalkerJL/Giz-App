import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./StatusSite.module.css";
import StatusGizButtons from "../components/StatusSite/StatusGizButtons";
import axios from "axios";
import {

  getStatusGizData,
  getStatusGizUsers,
  getStatusGizUsersData,
  StatusGizDataT,
  StatusGizUsersDataT,
  StatusGizIdsT
} from "../apiServices/StatusApiServices";
import { useAuth } from "../firebase/AuthContext";
import StatusGizInfoAndUsers from "../components/StatusSite/StatusGizInfoAndUsers";
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
          <StatusGizInfoAndUsers />
          <StatusGizButtons />
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};
export default StatusSite;
