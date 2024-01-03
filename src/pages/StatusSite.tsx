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
import dayjs from "dayjs";

const StatusSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const { gizCompleteData, loading, error, refetchGizData } = useGizData();
const { currentUser: user } = useAuth();
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

  // if (gizCompleteLoading) console.log(gizCompleteLoading);
  // if (gizCompleteError) console.log(gizCompleteError);
  // if (gizCompleteError) return <p>gizCompleteError</p>;
  // if (gizCompleteLoading) return <p>...gizCompleteLoading</p>;

  return (
    <div className={styles.statusSite}>
      <Header />
      <Options activeTab={"STATUS"} />
      {/* <button onClick={refreshData}>Refresh</button> */}

      {gizCompleteData.length > 0 || loading ? (
        <StatusGiz
          gizCompleteQuery={gizCompleteData}
          editToggleMap={editToggleMap}
          toggleEditForGiz={toggleEditForGiz}
          loading={loading}
        />
      ) : (
        <div className={styles.noGiz}>
          <motion.p
            initial={{ opacity: 0, y: "-3%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.noGizText}
          >
            Looks Like You're Not Part of Any Giz Yet!
          </motion.p>
        </div>
      )}

      <div className={styles.space} />
    </div>
  );
};

export default StatusSite;
