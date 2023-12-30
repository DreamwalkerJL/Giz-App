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

  if (gizCompleteQuery) console.log(gizCompleteQuery);
  if (gizCompleteQuery)
    return (
      <>
        {gizCompleteQuery.map((gizComplete, i) => (
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
                      {" "}
                      {getTimeUntil(gizComplete)}
                    </div>
                  </div>
                </div>
                <div className={styles.invitesGizUsers}>
                  <div className={styles.checkBarFrame}>
                    <CheckBar invitedUsers={gizComplete.invitedUsers} />
                  </div>
                  <div className={styles.invitedUsers}>
                    {gizComplete.invitedUsers.map((user, k) => (
                      <motion.div
                        key={user.userId}
                        className={styles.userFrame}
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                        transition={{ duration: 0.3, delay: k * 0.15 }}
                      >
                        <img
                          className={styles.userImageIcon}
                          alt={user.userName}
                          src={user.profilePicture}
                        />
                        <div className={styles.userNameT}>{user.userName}</div>
                      </motion.div>
                    ))}
                  </div>
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
