import { CSSProperties, FunctionComponent, useEffect, useState } from "react";

import styles from "./StatusGiz.module.css";

import {
  checkIfTodayOrTomorrow,
  getTimeUntil,
} from "../InvitesSite/DateAndTimeCalc";
import { DeclineButton } from "../InvitesSite/DeclineButton";
import EditButton from "./EditButton";
import { useAuth } from "../../firebase/AuthContext";
import { GizComplete, UserPublic } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";
import React from "react";
import { CheckBar } from "../CheckBar";
import UserFrame from "../UserFrame";

interface StatusGizProps {
  gizCompleteQuery: GizComplete[] | undefined;
  editToggleMap: { [key: string]: boolean };
  toggleEditForGiz: (gizId: string) => void;
}

const StatusGiz: FunctionComponent<StatusGizProps> = ({
  gizCompleteQuery,
  editToggleMap,
  toggleEditForGiz,
}) => {
  const { currentUser } = useAuth();

  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0.7,
      y: "1.5%",
    },
  };



  const sortedGizCompleteQuery = gizCompleteQuery
  ? [...gizCompleteQuery].sort((a, b) => {
      // Parse dates and times to Date objects
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      
      // Compare the Date objects
      return aDateTime.getTime() - bDateTime.getTime();
    })
  : [];
  return (
    <>
      {sortedGizCompleteQuery.map((gizComplete, i) => (
            <motion.div
              key={gizComplete.id}
              className={styles.giz}
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
              transition={{ duration: 0.3, delay: i * 0.15 }}
            >
              <div className={styles.gizFrame}>
                <div className={styles.gizInfoAndUsers}>
                  <div className={styles.statusInformationFrame}>
                    <div className={styles.titleAndDescription}>
                      <i className={styles.titleT}>{gizComplete.title}</i>
                      <div className={styles.descriptionT}>
                        {gizComplete.description}
                      </div>
                    </div>
                    <div
                      className={styles.madeByT}
                    >{`Made by ${gizComplete.creatorUserName}`}</div>
                    <div className={styles.dateFrame}>
                      <div
                        className={styles.dateIsT}
                      >{`${checkIfTodayOrTomorrow(gizComplete)} - ${
                        gizComplete.time
                      }`}</div>
                      <div className={styles.dateHowLong}>
                        {getTimeUntil(gizComplete)}
                      </div>
                    </div>
                  </div>
                  <div className={styles.statusGizUsers}>
            
                      <CheckBar invitedUsers={gizComplete.invitedUsers} />
        
                      <UserFrame gizComplete={gizComplete} />
                  </div>
                </div>
                <div className={styles.gizButtons}>
                  {gizComplete.creatorUserName === currentUser?.displayName ? (
                    <div className={styles.accept}>
                      <EditButton
                        gizComplete={gizComplete}
                        // gizCompleteId={gizComplete?.id}
                        // decision={"accept"}
                      />
                    </div>
                  ) : (
                    <div className={styles.decline}>
                      <DeclineButton
                        gizCompleteId={gizComplete?.id}
                        decision={"decline"}
                        decisionText={"leave"}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </>
    );
};

export default StatusGiz;
