import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./InvitesSite.module.css";

import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import InvitesGiz from "../components/InvitesSite/InvitesGiz";

import { useGizData } from "../components/GizDataContext";

const InvitesSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const auth = useAuth();
  const userName = auth.currentUser?.displayName;

  // gizCompleteQuery -> InvitesGiz
  const status = "invited";

  const userUid = auth.currentUser?.uid;

  const { gizCompleteData, loading, error, refetchGizData } = useGizData();

  // if (gizCompleteLoading) console.log(gizCompleteLoading);
  // if (gizCompleteError) console.log(gizCompleteError);
  // if (gizCompleteError) return <p>gizCompleteError</p>;
  // if (gizCompleteLoading) return <p>...gizCompleteLoading</p>;

  return (
    <div className={styles.invitesSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options

        activeTab={"INVITES"}
      />
      <InvitesGiz gizCompleteQuery={gizCompleteData} />
      <div className={styles.space} />
    </div>
  );
};

export default InvitesSite;
