import { FunctionComponent } from "react";
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
            transition={{ duration: 0.3, delay: i * 0.2 }}
          >
            <div className={styles.gizFrame}>
              <div className={styles.gizInfoAndUsers}>
                <div className={styles.invitesInformationFrame}>
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
                <div className={styles.accept}>
                  <AcceptButton
                    gizCompleteId={gizComplete?.id}
                    decision={"accept"}
                  />
                </div>
                <div className={styles.decline}>
                  <DeclineButton
                    gizCompleteId={gizComplete?.id}
                    decision={"decline"}
                    decisionText={"decline"}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </>
    );
};

export default InvitesGiz;
