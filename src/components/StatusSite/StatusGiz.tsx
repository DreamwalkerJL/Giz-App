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
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { CheckBar } from "../CheckBar";
import UserFrame from "../UserFrame";
import dayjs from "dayjs";

interface StatusGizProps {
  gizCompleteQuery: GizComplete[] | undefined;
  editToggleMap: { [key: string]: boolean };
  toggleEditForGiz: (gizId: string) => void;
  soonGizIds: number[];
  ongoingGizIds: number[];
  expiredGizIds: number[];
  loading: boolean;
}

const StatusGiz: FunctionComponent<StatusGizProps> = ({
  gizCompleteQuery,
  editToggleMap,
  toggleEditForGiz,
  soonGizIds,
  ongoingGizIds,
  expiredGizIds,
  loading,
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

  const sortByNewest = (a: GizComplete, b: GizComplete): number => {
    return (
      dayjs(`${b.date} ${b.time}`).unix() - dayjs(`${a.date} ${a.time}`).unix()
    );
  };

  const now = dayjs();
  const oneHour = 60 * 60 * 1000; // One hour in milliseconds

  const sortedGizCompleteQuery = [...(gizCompleteQuery ?? [])].sort((a, b) => {
    const dateTimeA = dayjs(`${a.date} ${a.time}`);
    const dateTimeB = dayjs(`${b.date} ${b.time}`);
    const timeDiffA = dateTimeA.diff(now);
    const timeDiffB = dateTimeB.diff(now);

    // Determine categories for 'a' and 'b'
    const categoryA =
      timeDiffA <= 0 && timeDiffA > -oneHour
        ? 1 // Ongoing
        : timeDiffA > 0 && timeDiffA <= oneHour
        ? 2 // Upcoming in next hour
        : timeDiffA > oneHour
        ? 3 // Future beyond next hour
        : 4; // Expired more than an hour ago

    const categoryB =
      timeDiffB <= 0 && timeDiffB > -oneHour
        ? 1
        : timeDiffB > 0 && timeDiffB <= oneHour
        ? 2
        : timeDiffB > oneHour
        ? 3
        : 4;

    // First, sort by category
    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    // Within the same category, sort by closeness to now
    return Math.abs(timeDiffA) - Math.abs(timeDiffB);
  });

  return (
    <>
      {sortedGizCompleteQuery.map((gizComplete: GizComplete, i: number) => {
        const gizDateTime = dayjs(`${gizComplete.date} ${gizComplete.time}`);
        const timeDiff = now.diff(gizDateTime);
        const isOngoing = timeDiff >= 0 && timeDiff <= oneHour;

        const isSoon = timeDiff < 0 && timeDiff > -oneHour;
        const isExpired = timeDiff > +oneHour;
        return (
          <motion.div
            key={gizComplete.id}
            className={styles.giz}
            initial="out"
            whileInView="in"
            exit="out"
            variants={pageTransition}
            transition={{ duration: 0.3, delay: i * 0.15 }}
          >
            <div
              className={`${styles.gizFrameBorderBackground} ${
                isOngoing
                  ? styles.rainbowBorder
                  : isSoon
                  ? styles.pulsatingBorder
                  : isExpired
                  ? styles.expiredBorder
                  : styles.defaultBorder
              }`}
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

                    <div className={styles.dateFrame}>
                      <div
                        className={styles.dateIsT}
                      >{`${checkIfTodayOrTomorrow(gizComplete)} - ${
                        gizComplete.time
                      }`}</div>
                    </div>
                    {isOngoing && (
                      <div
                        className={`${styles.timeStatus} ${styles.rainbowText}`}
                      >
                        ONGOING
                      </div>
                    )}
                    {isSoon && (
                      <div className={styles.timeStatus}>
                        {getTimeUntil(gizComplete)}
                      </div>
                    )}
                    {isExpired && (
                      <div className={`${styles.timeStatus} ${styles.expired}`}>
                        EXPIRED
                      </div>
                    )}

                    <div
                      className={styles.madeByT}
                    >{`Made by ${gizComplete.creatorUserName}`}</div>
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
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default StatusGiz;
