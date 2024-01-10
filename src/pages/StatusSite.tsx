import { FunctionComponent, useState } from "react";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./StatusSite.module.css";
import StatusGiz from "../components/StatusSite/StatusGiz";
import { useGizData } from "../components/GizDataContext";
import { motion } from "framer-motion";


const StatusSite: FunctionComponent = () => {
  const { gizCompleteData, loading } = useGizData();

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
