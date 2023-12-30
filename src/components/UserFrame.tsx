import React, { CSSProperties } from "react";
import styles from "./UserFrame.module.css";
import { motion } from "framer-motion";
import { GizComplete } from "../apiServices/Apollo/Types";

interface StatusVariant {
  borderColor: string;
  opacity: number;
  y: string
}

const statusVariants: Record<string, StatusVariant> = {
  creator: {
    borderColor: "#72FF80",
    opacity: 1,
    y: "0%",
  },
  accepted: {
    borderColor: "#72FF80",
    opacity: 1,
    y: "0%",
  },
  declined: {
    borderColor: "#FF5B5B",
    opacity: 1,
    y: "0%",
  },
  invited: {
    borderColor: "#696969",
    opacity: 0.7,
    y: "0%",
  },
};

interface UserFrameProps {
  gizComplete: GizComplete;
}

const UserFrame: React.FC<UserFrameProps> = ({ gizComplete }) => {
  return (
    <div className={styles.invitedUsers}>
      {gizComplete.invitedUsers
        .sort((a, b) => {
          const statusValues: { [key: string]: number } = {
            creator: 1,
            accepted: 2,
            declined: 3,
            invited: 4,
          };

          statusValues[a.status] - statusValues[b.status];

          return statusValues[a.status] - statusValues[b.status];
        })
        .map((user, k) => {
        const userStatusVariant = statusVariants[user.status] || {};

        return (
          <motion.div
            key={user.userId}
            className={styles.userFrame}
            initial={{ opacity: 0.5, y: "3%"}}
            animate={userStatusVariant}
   
            transition={{ duration: 0.3, delay: k * 0.15 }}
          >
            <motion.div
              className={styles.userImageBorder}
              style={{ "--borderColor": userStatusVariant.borderColor } as CSSProperties}
            >
              <img
                className={styles.userImageIcon}
                alt={user.userName}
                src={user.profilePicture}
              />
            </motion.div>
            <div className={styles.userNameTFrame}>
              <div className={styles.userNameT}>{user.userName}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UserFrame;
