import { useMutation } from "@apollo/client";
import styles from "./InvitesGizButtons.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/Mutations";
import { HandleGizInviteMutationVariable } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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
  const auth = useAuth();
  const userName = auth.currentUser?.displayName;
  const [addGizEvent, { error }] = useMutation<HandleGizInviteMutationVariable>(GIZ_HANDLE_INVITE_MUTATION);
  // Ensure userName is available, otherwise show an error and return null or a fallback UI
  if (!userName) {
    console.error("NO USERNAME FOUND");
    toast.error("ERROR - please contact support");
    return null;
  }

  const gizCompleteIdString = gizCompleteId.toString();

  // Call the useMutation hook at the top level


  if (error) {
    toast.error("ERROR - please contact support");
  }

  const handleDecline = () => {
    try {
      // Use setTimeout within the handler function
      setTimeout(() => {
        addGizEvent({
          variables: { userName, gizCompleteIdString, decision },
        });
      }, 1000); // Duration should match your exit animation
    } catch (e) {
      console.error(e);
      toast.error("ERROR - please contact support");
    }
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
