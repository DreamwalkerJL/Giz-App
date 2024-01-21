import React, { CSSProperties, useState } from "react";
import styles from "./UserFrame.module.css";
import { motion } from "framer-motion";
import { GizComplete, UserPublic } from "../apiServices/Apollo/Types";
import { useMutation } from "@apollo/client";
import { USER_FAVORITES_MUTATION } from "../apiServices/Apollo/Mutations";
import { useAuth } from "../firebase/AuthContext";
import { useGizData } from "./GizDataContext";

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
  const [windowWidth] = useState(window.innerWidth);
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;

  const { userFavorites, setUserFavorites } = useGizData();

  const [favoritesMutation] = useMutation(USER_FAVORITES_MUTATION);

  function isFavourite(userId: number) {
    return userFavorites?.some((user)=> user.userId === userId)
  }

  function toggleFavorite(user: UserPublic) {
    // Update this function to work with UserPublicData
    if(user.userName === currentUser?.displayName) {
      return;
    }

    favoritesMutation({
      variables: { uid: uid, userId: user.userId },
    });
    setUserFavorites((prev) => {
      const isAlreadyFavorite = prev.some((favUser) => favUser.userId === user.userId);
      if (isAlreadyFavorite) {
        return prev.filter((favUser) => favUser.userId !== user.userId);
      } else {
        return [...prev, user];
      }
    });
  }

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
    const folder = windowWidth > 800 ? "ImageUrlsDesktop" : "ImageUrlsMobile";
    return `/${folder}/${profilePicture}`;
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
              style={
                {
                  "--borderColor":
                    hoveredUserId === user.userId
                      ? borderColor
                      : userStatusVariant.borderColor,
                } as CSSProperties
              }
              whileHover={{
                opacity: 1,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
                y: "-1.2%",
                transition: { duration: 0.2 },
                cursor: "pointer",
              }}
              onClick={() => {

                toggleFavorite(user);
              }}
            >
              <div
                className={styles.starOverlay}
                style={{ color: isFavourite(user.userId) ? "gold" : "white" }}
              >
                {currentUser?.displayName === user.userName ? "" : isFavourite(user.userId) ? "★" : "☆"}
              </div>
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
