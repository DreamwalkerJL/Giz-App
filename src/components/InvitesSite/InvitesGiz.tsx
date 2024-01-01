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
      opacity: 0,

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
        <motion.div key={gizComplete.id} className={styles.giz}>
          <motion.div
            className={styles.gizFrame}
            initial="out"
            animate="in"
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
            transition={{ duration: 0.3, delay: i * 0.2 }}
          >
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
                <div
                  className={styles.madeByT}
                >{`Made by ${gizComplete.creatorUserName}`}</div>
                <div className={styles.dateFrame}>
                  <div className={styles.dateIsT}>{`${checkIfTodayOrTomorrow(
                    gizComplete
                  )} - ${gizComplete.time}`}</div>
                  <div className={styles.dateHowLong}>
                    {getTimeUntil(gizComplete)}
                  </div>
                </div>
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
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

export default InvitesGiz;
