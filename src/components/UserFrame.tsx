import React, { CSSProperties, useState } from "react";
import styles from "./UserFrame.module.css";
import { motion } from "framer-motion";
import { GizComplete } from "../apiServices/Apollo/Types";

interface StatusVariant {
  borderColor: string;
  opacity: number;
  y: string;
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const sortedInvitedUsers = [...gizComplete.invitedUsers].sort((a, b) => {
    const statusValues: { [key: string]: number } = {
      creator: 1,
      accepted: 2,
      declined: 3,
      invited: 4,
    };

    // First, compare by status
    const statusDifference = statusValues[a.status] - statusValues[b.status];
    if (statusDifference !== 0) {
      return statusDifference;
    }

    // If statuses are the same, then sort by userId
    return a.userId - b.userId;
  });

  const [hoveredUserId, setHoveredUserId] = React.useState<number | null>(null);
  const [borderColor, setBorderColor] = React.useState<string>("");
  const handleMouseEnter = (userId: number, color: string) => {
    setHoveredUserId(userId);
    setBorderColor(color); // Set the borderColor to white or any hover color
  };

  const handleMouseLeave = () => {
    setHoveredUserId(null);
  };

  const getImagePath = (profilePicture: string) => {
    const folder = windowWidth > 800 ? 'ImageUrlsDesktop' : 'ImageUrlsMobile';
    return `public/${folder}/${profilePicture}`;
  };

  return (
    <div className={styles.invitedUsers}>
      {sortedInvitedUsers.map((user, k) => {
        const isHovered = user.userId === hoveredUserId;
        const userStatusVariant = statusVariants[user.status] || {};

        return (
          <motion.div
            key={user.userId}
            className={styles.userFrame}
            initial={isHovered ? {} : { opacity: 0.5, y: "3%" }}
            exit={{ opacity: 0.5, y: "3%" }}
            whileInView={
              isHovered
                ? { opacity: 1, transition: { duration: 0, delay: 0 } }
                : {
                    ...userStatusVariant,
                    transition: { duration: 0.3, delay: k * 0.1 },
                  }
            }
          >
            <motion.div
              className={styles.userImageBorder}
              onMouseEnter={() => handleMouseEnter(user.userId, "#ffffff")}
              onMouseLeave={handleMouseLeave}
              style={{
                "--borderColor": hoveredUserId === user.userId ? borderColor : userStatusVariant.borderColor
              } as CSSProperties}
              whileHover={{
                opacity: 1,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
                y: "-1.2%",
                transition: { duration: 0.2 },
              }}
            >
              <motion.img
                className={styles.userImageIcon}
                alt={user.userName}
                src={getImagePath(user.profilePicture)}
              />
              <motion.span
                className={styles.userNameOverlay}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.p className={styles.userNameOverlayT}>
                  {user.userName}
                </motion.p>
              </motion.span>
            </motion.div>
            <motion.div className={styles.userNameTFrame}>
              <div className={styles.userNameT}>{user.userName}</div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UserFrame;
