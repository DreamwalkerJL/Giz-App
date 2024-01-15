import { useMutation } from "@apollo/client";
import styles from "./InvitesGizButtons.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/Mutations";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useGizData } from "../GizDataContext";

type DeclineButtonProps = {
  gizCompleteId: number;
  decision: string;
  decisionText: string;
};

export const DeclineButton: React.FC<DeclineButtonProps> = ({
  gizCompleteId,
  decision,
  decisionText,
}) => {
  const [addGizEvent, { error }] = useMutation(GIZ_HANDLE_INVITE_MUTATION);
  const { setGizCompleteData } = useGizData();
  const auth = useAuth();
  const userName = auth.currentUser?.displayName;

  // Ensure userName is available, otherwise show an error and return null or a fallback UI
  if (!userName) {
    console.error("NO USERNAME FOUND");
    toast.error("ERROR - please contact support");
    return null;
  }



  // Call the useMutation hook at the top level


  if (error) {
    toast.error("ERROR - please contact support");
  }

  const handleDecline = () => {
    // Using setTimeout
    setTimeout(async () => {
      try {
        // Call the mutation inside setTimeout
        const response = await addGizEvent({
          variables: {
            userName,
            gizCompleteIdString: gizCompleteId.toString(),
            decision,
          },
        });
        // if (response.data.gizHandleInviteMutation.success) {
        //   // Update the profile picture in gizCompleteData
        //   setGizCompleteData((prevData) =>
        //     prevData.map((gizComplete) => ({
        //       ...gizComplete,
        //       invitedUsers: gizComplete.invitedUsers.map((user) => {
        //         if (user.userName === userName) {
        //           return { ...user, status: decision };
        //         }
        //         return user;
        //       }),
        //     }))
        //   );
        // } else {
        //   toast.error("Failed to update profile picture.");
        // }

        // Handle success here
      } catch (e) {
        console.error(e);
        // Handle error here
      }
    }, 1000); // Adjust the timeout duration as needed
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
    pressed: {
      scale: 0.94,
    },
  };

  return (
    <motion.button
      className={styles.declineButton}
      onClick={handleDecline}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="pressed"
    >
      <div className={styles.acceptButtonT}>
        {decisionText === "leave" ? "LEAVE" : "DECLINE"}
      </div>
    </motion.button>
  );
};
