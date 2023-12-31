import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./StatusSite.module.css";
import StatusGizButtons from "../components/StatusSite/StatusGizButtons";
import axios from "axios";

import { useAuth } from "../firebase/AuthContext";

import StatusGiz from "../components/StatusSite/StatusGiz";

import { useGizData } from "../components/GizDataContext";
import { motion } from "framer-motion";
const StatusSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const userName = auth.currentUser?.displayName;

  // gizCompleteQuery -> InvitesGiz
  const status = "accepted";

  const userUid = auth.currentUser?.uid;

  const { gizCompleteData, loading, error, refetchGizData } = useGizData();

  const [editToggleMap, setEditToggleMap] = useState<{
    [key: string]: boolean;
  }>({});

  // Function to toggle edit state for a specific giz, with parameter typing
  const toggleEditForGiz = (gizId: string) => {
    setEditToggleMap((prevMap) => ({
      ...prevMap,
      [gizId]: !prevMap[gizId],
    }));
  };

  const refreshData = () => {};

  useEffect(() => {
    refetchGizData();
  }, []);

  // if (gizCompleteLoading) console.log(gizCompleteLoading);
  // if (gizCompleteError) console.log(gizCompleteError);
  // if (gizCompleteError) return <p>gizCompleteError</p>;
  // if (gizCompleteLoading) return <p>...gizCompleteLoading</p>;
  console.log(gizCompleteData);
  console.log("mick");
  return (
    <div className={styles.statusSite}>
      <Header />
      <Options activeTab={"STATUS"} />
      {/* <button onClick={refreshData}>Refresh</button> */}

      {gizCompleteData.length > 0 || loading ?  (
        <StatusGiz
          gizCompleteQuery={gizCompleteData}
          editToggleMap={editToggleMap}
          toggleEditForGiz={toggleEditForGiz}
        />
      ) : (
        <div className={styles.noGiz}>
          <motion.p initial={{opacity:0, y:"-3%"}} animate={{opacity:1, y:0}} transition={{delay:.2}} className={styles.noGizText}>
            Looks Like You're Not Part of Any Giz Yet!
          </motion.p>
        </div>
      )}

      <div className={styles.space} />
    </div>
  );
};

export default StatusSite;
