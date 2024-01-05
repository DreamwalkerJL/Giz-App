import { useMutation } from "@apollo/client";
import styles from "./InvitesGizButtons.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/Mutations";
import { HandleGizInviteMutationVariable } from "../../apiServices/Apollo/Types";
import { motion } from "framer-motion";

type AcceptButtonProps = {
  gizCompleteId: number;
  decision: string;
};

export const AcceptButton: React.FC<AcceptButtonProps> = ({
  gizCompleteId,
  decision,
}) => {
  const auth = useAuth();
  const userName = auth.currentUser?.displayName;

  // `useMutation` hook called at the top level
  const [addGizEvent, { loading, error }] =
    useMutation<HandleGizInviteMutationVariable>(GIZ_HANDLE_INVITE_MUTATION);

  if (!userName) {
    console.error("NO USERNAME FOUND");
    return null; // Return null or some fallback UI
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleAccept = () => {
    // Using setTimeout
    setTimeout(async () => {
      try {
        // Call the mutation inside setTimeout
        await addGizEvent({
          variables: {
            userName,
            gizCompleteIdString: gizCompleteId.toString(),
            decision,
          },
        });

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
    },
    pressed: {
      scale: 0.94,
    },
  };

  return (
    <motion.button
      className={styles.acceptButton}
      onClick={handleAccept}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="pressed"
    >
      <div className={styles.acceptButtonT}>ACCEPT</div>
    </motion.button>
  );
};
