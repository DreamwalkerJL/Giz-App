import { FunctionComponent } from "react";
import styles from "./InvitesGiz.module.css";
import { gizInvitesData } from "../../apiServices/InvitesApiServices";
import InvitesGizButtons from "./InvitesGizButtons";
import dayjs from "dayjs";

interface InvitesGizInfoAndUsersProps {
  gizInvitesData: gizInvitesData[] | undefined;
}

const InvitesGizInfoAndUsers: FunctionComponent<
  InvitesGizInfoAndUsersProps
> = ({ gizInvitesData }) => {

  // const formattedTime = gizInvitesData.time.format("HH:mm:ss");
  // const formattedDate = date.format("DD:MM:YYYY");
  function checkIfTodayOrTomorrow(invite: gizInvitesData) {
    // Parse the date from invite
    const inviteDate = dayjs(invite.date);
    const now = dayjs().format('YYYY-MM-DD'); // same (current date) but with day.js

    const isToday = dayjs(inviteDate.format('YYYY-MM-DD')).isSame(now); // dayjs() return current date 
    const isTomorrow = dayjs(inviteDate.format('YYYY-MM-DD')).isSame(dayjs().add(1, 'day').format('YYYY-MM-DD'))
    if(isToday) {
      return "Today"
    } else if(isTomorrow) {
      return "Tomorrow"
    } else return invite.date
 
  }

  function getTimeUntil(invite: gizInvitesData) {
    const now = dayjs();
    const dateFormat = "MMMM D, YYYY"; // Format for invite.date
    const timeFormat = "h:mm A"; // Format for invite.time
  
    // Combine date and time into a single string
    const dateTimeString = `${invite.date} ${invite.time}`;
    let targetDateTime = dayjs(dateTimeString, `${dateFormat} ${timeFormat}`);
  
    // Check if the target time is valid and for today
    if (!targetDateTime.isValid() || !now.isSame(targetDateTime, 'day')) {
      return ""; // Return an empty string if it's not valid or not today
    }
  
    // Calculate the difference in minutes
    let diffInMinutes = targetDateTime.diff(now, 'minute');
  
    // Return an empty string if the time is in the past
    if (diffInMinutes < 0) {
      return "";
    }
  
    // Format output
    if (diffInMinutes < 60) {
      // If less than an hour, show in minutes
      return `(In ${diffInMinutes} minutes)`;
    } else {
      // If an hour or more, show in hours and minutes
      let hours = Math.floor(diffInMinutes / 60);
      let minutes = diffInMinutes % 60;
      return `In ${hours} hour(s) and ${minutes} minute(s)`;
    }
  }
  
  
  return (<>
      {gizInvitesData && gizInvitesData.map((invite) => (
    <div className={styles.giz}>
    <div className={styles.gizFrame}>
      <div className={styles.gizInfoAndUsers}>
        <div className={styles.invitesInformationFrame}>
          <div className={styles.titleAndDescription}>
            <i className={styles.titleT}>{invite.title}</i>
            <div className={styles.descriptionT}>
            {invite.description}
            </div>
          </div>
          <div className={styles.madeByT}>{`Made by ${invite.creatorUserName}`}</div>
          <div className={styles.dateFrame}>
            <div className={styles.dateIsT}>{`${checkIfTodayOrTomorrow(invite)} - ${invite.time}`}</div>
            <div className={styles.dateHowLong}> {getTimeUntil(invite)}</div>
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
          {invite.invitedUsers.map((user) => (
            <div className={styles.userFrame}>
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
      <InvitesGizButtons />
    </div>
  </div>
         ))}
    </>
  );
};

export default InvitesGizInfoAndUsers;
