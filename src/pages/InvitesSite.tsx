import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./InvitesSite.module.css";
import InvitesGiz from "../components/InvitesSite/InvitesGiz";
import { useGizData } from "../components/GizDataContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useAuth } from "../firebase/AuthContext";

const InvitesSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const { currentUser } = useAuth();
  const userName = currentUser?.displayName;
  const { gizCompleteData, loading } = useGizData();

  const filteredGizCompleteData = gizCompleteData.filter((giz) => {
    return giz.invitedUsers.some(
      (user) =>
        (user.userName === userName && user.status === "invited") 
    );
  });


  const recentGizCompleteData = filteredGizCompleteData.filter((giz) => {
    const gizDateTime = dayjs(
      `${giz.date} ${giz.time}`,
      "MMMM DD, YYYY HH:mm A"
    );
    const oneDayAgo = dayjs().subtract(24, "hour");
    const now = dayjs();

    // Include giz if it's in the future or within the last 24 hours
    return gizDateTime.isAfter(oneDayAgo) || !gizDateTime.isBefore(now);
  });

  return (
    <div className={styles.invitesSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options activeTab={"INVITES"} />
      {recentGizCompleteData.length > 0 || loading ? (
        <InvitesGiz gizCompleteQuery={recentGizCompleteData} />
      ) : (
        <div className={styles.noGiz}>
          <motion.p
            initial={{ opacity: 0, y: "-33%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.noGizText}
          >
            No Invites Just Yet!
          </motion.p>
        </div>
      )}
      <div className={styles.space} />
    </div>
  );
};

export default InvitesSite;
