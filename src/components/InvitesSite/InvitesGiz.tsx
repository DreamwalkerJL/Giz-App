import { FunctionComponent } from "react";
import styles from "./InvitesGiz.module.css";
import {
  gizComplete,
  gizCompleteQuery,
} from "../../apiServices/Apollo/GizCompleteQuery";
import InvitesGizButtons from "./InvitesGizButtons";
import dayjs from "dayjs";
import { ApolloError } from "@apollo/client/core";
import { checkIfTodayOrTomorrow, getTimeUntil } from "./DateAndTimeCalc";

interface InvitesGizProps {
  gizCompleteQuery: gizCompleteQuery | undefined;
  gizCompleteIds: number[] | undefined
}

const InvitesGiz: FunctionComponent<InvitesGizProps> = ({
  gizCompleteQuery,
  gizCompleteIds

}) => {



  

  if (gizCompleteQuery)
    return (
      <>
        {gizCompleteQuery.gizCompleteQuery.map((gizComplete) => (
          <div key={gizComplete.id} className={styles.giz}>
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
                    <div className={styles.checkBar}>
                      <div className={styles.checkAccepted}>
                        <div className={styles.dateIsT}>1</div>
                      </div>
                      <div className={styles.checkDeclined}>
                        <div className={styles.dateIsT}>1</div>
                      </div>
                      <div className={styles.checkUndecided}>
                        <div className={styles.dateIsT}>4</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.invitedUsers}>
                    {gizComplete.invitedUsers.map((user) => (
                      <div key={user.id} className={styles.userFrame}>
                        <img
                          className={styles.userImageIcon}
                          alt={user.userName}
                          src={user.profilePicture}
                        />
                        <div className={styles.userNameT}>MASTERking</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <InvitesGizButtons  gizCompleteIds={gizCompleteIds}/>
            </div>
          </div>
        ))}
      </>
    );
};

export default InvitesGiz;
