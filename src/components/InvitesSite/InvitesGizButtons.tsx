// import { FunctionComponent } from "react";
// import styles from "./InvitesGizButtons.module.css";
// import { GIZ_HANDLE_INVITE_MUTATION } from "../../apiServices/Apollo/GizHandleInviteMutation";
// import { useMutation } from "@apollo/client";
// import { useAuth } from "../../firebase/AuthContext";
// import { AcceptButton } from "./AcceptButton";

// type InvitesGizButtonsProps = {
//   gizCompleteIds: number[];
//   gizCompleteId: number
  
// };



// const InvitesGizButtons: FunctionComponent<InvitesGizButtonsProps> = ({ gizCompleteIds, gizCompleteId }) => {
//   const auth = useAuth();
//   const userName = auth.currentUser?.displayName;
//   if (!userName) {
//     console.error("NO USERNAME FOUND")
//     return
//   }

//   // const [addGizEvent, { loading: gizHandleInviteLoading, error: gizHandleInviteError }] =
//   //   useMutation<gizHandleInviteMutation>(GIZ_HANDLE_INVITE_MUTATION, {
//   //     variables: { userName, gizCompleteIds, decision },
//   //   });
//   //   if (gizHandleInviteLoading) console.log(gizHandleInviteLoading);
//   //   if (gizHandleInviteError) console.log(gizHandleInviteError);
//   //   if (gizHandleInviteError) return <p>gizHandleInviteError</p>;
//   //   if (gizHandleInviteLoading) return <p>...gizHandleInviteLoading</p>;
  
//   return (
//     <div className={styles.gizButtons}>
//       <div className={styles.accept}>
//     <AcceptButton gizCompleteId={gizCompleteId} decision={"accept"}/>
//       </div>
//       <div className={styles.decline}>
//         {/* <div className={styles.declineButton} onClick={()=> gizHandleInviteMutation(userName, gizCompleteId, "decline")}>
//           <div className={styles.acceptButtonT}>DECLINE</div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default InvitesGizButtons;
