import { useMutation } from "@apollo/client";
import styles from "./InvitesGizButtons.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/Mutations";

import { motion } from "framer-motion";
import { useGizData } from "../GizDataContext";
import { toast } from "react-toastify";

type AcceptButtonProps = {
  gizCompleteId: number;
  decision: string;
};

export const AcceptButton: React.FC<AcceptButtonProps> = ({
  gizCompleteId,
  decision,
}) => {
  const auth = useAuth();
  const { currentUser } = useAuth();
  const userName = auth.currentUser?.displayName;
  const {setGizCompleteData } = useGizData();
  // `useMutation` hook called at the top level
  const [addGizEvent] = useMutation(GIZ_HANDLE_INVITE_MUTATION);

  if (!userName) {
    console.error("NO USERNAME FOUND");
    return null; // Return null or some fallback UI
  }



  const handleAccept = async () => {
    setTimeout(async () => {
      if (currentUser) {
        // Check if mutation was successful before updating the state

        // Update the profile picture in gizCompleteData
        // setGizCompleteData((prevData) =>
        //   prevData.map((gizComplete) => ({
        //     ...gizComplete,
        //     invitedUsers: gizComplete.invitedUsers.map((user) => {
        //       if (user.userName === currentUser.displayName) {

        //         return { ...user, status: "accepted" };
        //       }

        //       return user;
        //     }),
        //   }))
        // );

        addGizEvent({
          variables: {
            userName,
            gizCompleteIdString: gizCompleteId.toString(),
            decision,
          },
        });

      } else {
        toast.error("Error accepting invite");
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
