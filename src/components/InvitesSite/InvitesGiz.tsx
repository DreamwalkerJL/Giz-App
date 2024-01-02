import { FunctionComponent, useState } from "react";
import styles from "./InvitesGiz.module.css";

import dayjs from "dayjs";
import { ApolloError } from "@apollo/client/core";
import { checkIfTodayOrTomorrow, getTimeUntil } from "./DateAndTimeCalc";
import { AcceptButton } from "./AcceptButton";
import { DeclineButton } from "./DeclineButton";
import { GizComplete } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";
import { CheckBar } from "../CheckBar";
import UserFrame from "../UserFrame";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
interface InvitesGizProps {
  gizCompleteQuery: GizComplete[] | undefined;
}

const InvitesGiz: FunctionComponent<InvitesGizProps> = ({
  gizCompleteQuery,
}) => {
  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0.3,

      y: "1.5%",
    },
    out2: {
      opacity: 0,
      x: "400px",
    },
    out3: {
      opacity: 0,
      x: "-400px",
    },
  };

  const declinedTextVariants = {
    hidden: {
      opacity: 1,
      scale: 1,

      rotate: -25,
    },
    visible: {
      opacity: 0,
      scale: 1,
      rotate: -25,
      transition: { duration: 0.5, delay: 0.5 },
    },
    visible2: {
      opacity: 0,
      scale: 1,
      rotate: -25,
      transition: { duration: 0.5, delay: 0.5 },
    },
  };

  const [itemsPendingAccepted, setItemsPendingAccepted] = useState<number>();
  const [itemsPendingDecline, setItemsPendingDecline] = useState<number>();
  const handleDeclineStart = async (gizId: number) => {
    // Start the animation
    await setItemsPendingDecline(gizId);
    await setTimeout(() => {
      setItemsPendingDecline(undefined);
    }, 2000);
  };

  const handleAcceptStart = async (gizId: number) => {
    // Start the animation
    await setItemsPendingAccepted(gizId);
    await setTimeout(() => {
      setItemsPendingAccepted(undefined);
    }, 2000);
  };
  const now = dayjs();
  const oneHour = 60 * 60 * 1000; // One hour in milliseconds

  const sortedGizCompleteQuery = [...(gizCompleteQuery ?? [])].sort((a, b) => {
    // Convert UTC times to local times before comparison
    const dateTimeALocal = dayjs
      .utc(`${a.date} ${a.time}`, "MMMM D, YYYY HH:mm")
      .local();
    const dateTimeBLocal = dayjs
      .utc(`${b.date} ${b.time}`, "MMMM D, YYYY HH:mm")
      .local();

    const timeDiffA = dateTimeALocal.diff(now);
    const timeDiffB = dateTimeBLocal.diff(now);

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
        // Parse the stored date and time as UTC
        const gizDateTimeUTC = dayjs.utc(
          `${gizComplete.date} ${gizComplete.time}`,
          "MMMM D, YYYY HH:mm"
        );
        const gizDateTimeLocal = gizDateTimeUTC.local();

        // Calculate time difference for determining status
        const timeDiff = dayjs().diff(gizDateTimeLocal);
        const isOngoing = timeDiff >= 0 && timeDiff <= oneHour;
        const isSoon = timeDiff < 0 && timeDiff > -oneHour;
        const isExpired = timeDiff > oneHour;
        return (
          <motion.div
            key={gizComplete.id}
            className={styles.giz}
            initial="out"
            exit="out"
            variants={pageTransition}
            whileInView={
              itemsPendingDecline === gizComplete.id
                ? {
                    ...pageTransition.out2,
                    transition: { duration: 0.5, delay: 0.5 },
                  }
                : itemsPendingAccepted === gizComplete.id
                ? {
                    ...pageTransition.out3,
                    transition: { duration: 0.5, delay: 0.5 },
                  }
                : "in"
            }
            transition={{ duration: 0.3, delay: (i + 0.25) * 0.15 }}
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
                  <div className={styles.invitesInformationFrame}>
                    {itemsPendingDecline === gizComplete.id && (
                      <motion.div
                        className={styles.declinedText}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={declinedTextVariants}
                      >
                        DECLINED
                      </motion.div>
                    )}
                    {itemsPendingAccepted === gizComplete.id && (
                      <motion.div
                        className={styles.acceptedText}
                        initial="hidden"
                        animate="visible2"
                        exit="hidden"
                        variants={declinedTextVariants}
                      >
                        ACCEPTED
                      </motion.div>
                    )}
                    <div className={styles.titleAndDescription}>
                      <i className={styles.titleT}>{gizComplete.title}</i>

                      <div className={styles.descriptionT}>
                        {gizComplete.description}
                      </div>
                    </div>

                    <div className={styles.dateFrame}>
                      <div className={styles.dateIsT}>
                        {" "}
                        {`${checkIfTodayOrTomorrow(
                          gizComplete
                        )} - ${gizDateTimeLocal.format("HH:mm")}`}
                      </div>
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
                        DONE
                      </div>
                    )}

                    <div
                      className={styles.madeByT}
                    >{`Made by ${gizComplete.creatorUserName}`}</div>
                  </div>
                  <div className={styles.invitesGizUsers}>
                    <CheckBar invitedUsers={gizComplete.invitedUsers} />

                    <UserFrame gizComplete={gizComplete} />
                  </div>
                </div>
                <div className={styles.gizButtons}>
                  <div
                    className={styles.accept}
                    onClick={() => handleAcceptStart(gizComplete.id)}
                  >
                    <AcceptButton
                      gizCompleteId={gizComplete?.id}
                      decision={"accept"}
                    />
                  </div>
                  <div
                    className={styles.decline}
                    onClick={() => handleDeclineStart(gizComplete.id)}
                  >
                    <DeclineButton
                      gizCompleteId={gizComplete?.id}
                      decision={"decline"}
                      decisionText={"decline"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default InvitesGiz;
