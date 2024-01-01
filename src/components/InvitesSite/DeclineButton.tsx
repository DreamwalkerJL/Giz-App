import { useMutation } from "@apollo/client";
import styles from "./InvitesGizButtons.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/Mutations";
import { HandleGizInviteMutationVariable } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";

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

  if (!userName) {
    console.error("NO USERNAME FOUND");
    return;
  }

  const gizCompleteIdString = gizCompleteId.toString();

  const [addGizEvent, { data, loading, error }] =
    useMutation<HandleGizInviteMutationVariable>(GIZ_HANDLE_INVITE_MUTATION, {
      variables: { userName, gizCompleteIdString, decision },
    });
  if (data) console.log(data);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  const handleDecline = async (variables: HandleGizInviteMutationVariable) => {


    try {

    // Wait for the exit animation to complete before removing the item
    setTimeout(() => {
      const response = addGizEvent({ variables });
    }, 1000); // Duration should match your exit animation
  } catch (e) {
    console.error(e);
    // Immediately call onDeclineEnd in case of error

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
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };


  return (
    <motion.button
      className={styles.declineButton}
      onClick={() => handleDecline({ userName, gizCompleteIdString, decision })}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="pressed"
    >
      <div className={styles.acceptButtonT}>
        {decisionText == "leave" ? "LEAVE" : "DECLINE"}
      </div>
      
    </motion.button>
  );
};
