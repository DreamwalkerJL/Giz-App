import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./InvitesSite.module.css";

import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import InvitesGiz from "../components/InvitesSite/InvitesGiz";

import { useGizData } from "../components/GizDataContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";

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

  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0.7,
      y: "-1.5%",
    },
  };

  const recentGizCompleteData = gizCompleteData.filter(giz => {
    const gizDateTime = dayjs(`${giz.date} ${giz.time}`, "MMMM DD, YYYY HH:mm A");
    const oneDayAgo = dayjs().subtract(24, 'hour');
    const now = dayjs();
  
    // Include giz if it's in the future or within the last 24 hours
    return gizDateTime.isAfter(oneDayAgo) || !gizDateTime.isBefore(now);
  });
  

    if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.invitesSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options activeTab={"INVITES"} />
      {recentGizCompleteData.length > 0 || loading ? (
        <InvitesGiz gizCompleteQuery={recentGizCompleteData} />
      ) : (
        <div className={styles.noGiz}>
          <motion.p initial={{opacity:0, y:"-33%"}} animate={{opacity:1, y:0}} transition={{delay:.2}} className={styles.noGizText}>
          No Invites Just Yet!
          </motion.p>
        </div>
      )}
      <div className={styles.space} />
    </div>
  );
};

export default InvitesSite;
