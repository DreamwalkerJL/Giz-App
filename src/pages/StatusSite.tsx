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

  const auth = useAuth();
  const now = dayjs();
  const oneHour = 60 * 60 * 1000; // One hour in milliseconds

  const [soonGizIds, setSoonGizIds] = useState<number[]>([]);
  const [ongoingGizIds, setOngoingGizIds] = useState<number[]>([]);
  const [expiredGizIds, setExpiredGizIds] = useState<number[]>([]);
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
  
  useEffect(() => {
    const oneHour = 60 * 60 * 1000; // One hour in milliseconds
    const now = dayjs();

    const soonIds:number[] = [];
    const ongoingIds:number[] = [];
    const expiredIds:number[] = [];

    gizCompleteData?.forEach(giz => {
      // Split the date string and pad the day with a leading zero if necessary
      const [month, dayWithComma, year] = giz.date.split(" ");
      const day = dayWithComma.replace(',', '').padStart(2, '0');
      
      const formattedDate = `${month} ${day}, ${year}`;
      const gizDateTime = dayjs(`${formattedDate} ${giz.time}`, "MMMM DD, YYYY HH:mm");
  
      if (!gizDateTime.isValid()) {
        console.warn(`Invalid date found: ${formattedDate} ${giz.time}`);
        return;
      }
  
      const timeDifference = gizDateTime.diff(now);
  
      if (timeDifference > 0 && timeDifference <= oneHour) {
        soonIds.push(giz.id);
      } else if (timeDifference <= 0 && timeDifference > -oneHour) {
        ongoingIds.push(giz.id);
      } else if (timeDifference < -oneHour) {
        expiredIds.push(giz.id);
      }
    });
  
    setSoonGizIds(soonIds);
    setOngoingGizIds(ongoingIds);
    setExpiredGizIds(expiredIds);
  }, [gizCompleteData]);



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

      {gizCompleteData.length > 0 || loading ? (
        <StatusGiz
          gizCompleteQuery={gizCompleteData}
          editToggleMap={editToggleMap}
          toggleEditForGiz={toggleEditForGiz}
          soonGizIds={soonGizIds}
          ongoingGizIds={ongoingGizIds}
          expiredGizIds={expiredGizIds}
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
