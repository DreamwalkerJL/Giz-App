import { motion } from "framer-motion";
import { UserPublic } from "../apiServices/Apollo/Types";
import styles from './CheckBar.module.css';
import { useEffect, useState } from "react";
type CheckBarProps = {
    invitedUsers: UserPublic[];
  };

  export const CheckBar: React.FC<CheckBarProps> = 
    ({ invitedUsers}) => {
      const statusCounts = invitedUsers.reduce(
        (acc, user) => {
          // Check if the status is 'creator' and map it to 'accepted'
          const status = user.status === "creator" ? "accepted" : user.status;
          // Only increment if the status is one of the valid keys
          if (Object.prototype.hasOwnProperty.call(acc, status)) {
            acc[status as keyof typeof acc]++;
          }
          return acc;
        },
        {
          accepted: 0,
          declined: 0,
          invited: 0, // Renamed 'undecided' to 'invited'
        }
      );
      

      const total = invitedUsers.length; // Do not add 1 for the creator if they are already in invitedUsers
      const acceptedWidth =
        total > 0 ? (statusCounts.accepted / total) * 100 : 0;
      const declinedWidth =
        total > 0 ? (statusCounts.declined / total) * 100 : 0;
      const invitedWidth = total > 0 ? (statusCounts.invited / total) * 100 : 0;
      const acceptedWidthString = `${acceptedWidth}%`;
      const declinedWidthString = `${declinedWidth}%`;
      const invitedWidthString = `${invitedWidth}%`;

      const [acceptedWidthStringDelayed, setAcceptedWidthStringDelayed] = useState(acceptedWidthString);
      const [declinedWidthStringDelayed, setDeclinedWidthStringDelayed] = useState(declinedWidthString);
      const [invitedWidthStringDelayed, setInvitedWidthStringDelayed] = useState(invitedWidthString);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setAcceptedWidthStringDelayed(acceptedWidthString);
          setDeclinedWidthStringDelayed(declinedWidthString);
          setInvitedWidthStringDelayed(invitedWidthString);
        }, 5000); // Delay of 5 seconds
    
        return () => clearTimeout(timer);
      }, [invitedUsers, acceptedWidthString, declinedWidthString, invitedWidthString]);

      return (
        <div className={styles.checkBarFrame}>
        <motion.div className={styles.checkBar}>
          <motion.div
            className={styles.checkAccepted}
            animate={{ width: acceptedWidthString }}
            initial={{ width: acceptedWidthStringDelayed }}
            transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 1
            }}
          >
            <span>{statusCounts.accepted}</span>
          </motion.div>
          {declinedWidth > 0 && (
            <motion.div
              className={styles.checkDeclined}
              animate={{ width: declinedWidthString }}
              initial={{ width: declinedWidthStringDelayed }}
              transition={{        type: 'tween',
              ease: 'easeOut',
              duration: 1}}
            >
              <span>{statusCounts.declined}</span>
            </motion.div>
          )}
          {invitedWidth > 0 && (
            <motion.div
              className={styles.checkInvited}
              animate={{ width: invitedWidthString }}
              initial={{ width: invitedWidthStringDelayed }}
              transition={{        type: 'tween',
              ease: 'easeOut',
              duration: 1}}
            >
              <span>{statusCounts.invited}</span>
            </motion.div>
          )}
        </motion.div>
        </div>
      );
    }