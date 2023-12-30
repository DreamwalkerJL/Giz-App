import { useMutation } from "@apollo/client";
import styles from "./InvitesGizButtons.module.css";

import { useAuth } from "../../firebase/AuthContext";
import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/Mutations";
import { HandleGizInviteMutationVariable } from "../../apiServices/Apollo/Types";

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
      const response = await addGizEvent({ variables });
      console.log(response.data);
      // Handle success
    } catch (e) {
      console.error(e);
      // Handle error
    }
  };

  return (
    <div
      className={styles.declineButton}
      onClick={() => handleDecline({ userName, gizCompleteIdString, decision })}
    >
      <div className={styles.acceptButtonT}>
        {decisionText == "leave" ? "LEAVE" : "DECLINE"}
      </div>
    </div>
  );
};
