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

  const handleAccept = async (variables: HandleGizInviteMutationVariable) => {
    try {
      const response = await addGizEvent({ variables });
      console.log(response.data);
      // Handle success
    } catch (e) {
      console.error(e);
      // Handle error
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
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
      className={styles.acceptButton}
      onClick={() => handleAccept({ userName, gizCompleteIdString, decision })}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="pressed"
    >
      <div className={styles.acceptButtonT}>ACCEPT</div>
    </motion.button>
  );
};
