import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./InvitesSite.module.css";
import InvitesGizButtons from "../components/InvitesSite/InvitesGizButtons";

import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import InvitesGiz from "../components/InvitesSite/InvitesGiz";

import {
  GIZ_COMPLETE_QUERY,
  gizCompleteQuery,
} from "../apiServices/Apollo/GizCompleteQuery";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  GIZ_HANDLE_INVITE_MUTATION,
  gizHandleInviteMutation,
} from "../apiServices/Apollo/GizHandleInviteMutation";

const InvitesSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onOptionsStatusFrameClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const onOptionsInvitesFrameClick = useCallback(() => {
    navigate("/invites-site");
  }, [navigate]);

  const auth = useAuth();
  const userName = auth.currentUser?.displayName;

  // gizCompleteQuery -> InvitesGiz
  const status = "invited";

  const {
    data: gizCompleteQuery,
    loading: gizCompleteLoading,
    error: gizCompleteError,
  } = useQuery<gizCompleteQuery>(GIZ_COMPLETE_QUERY, {
    variables: { userName, status },
  });
  if (gizCompleteQuery) console.log(gizCompleteQuery);
  if (gizCompleteLoading) console.log(gizCompleteLoading);
  if (gizCompleteError) console.log(gizCompleteError);
  if (gizCompleteError) return <p>gizCompleteError</p>;
  if (gizCompleteLoading) return <p>...gizCompleteLoading</p>;

  // gizHandleInviteMutation -> InvitesGiz -> InvitesGizButton
  const [gizCompleteIds, setGizCompleteIds] = useState<number[] | undefined>();

  useEffect(() => {
    if (gizCompleteQuery) {
      const newGizCompleteIds = gizCompleteQuery.gizCompleteQuery.map(
        (item) => item.id
      );
      setGizCompleteIds(newGizCompleteIds);
    }
  }, [gizCompleteQuery]);


  console.log(gizCompleteIds);

  // const HELLO_QUERY = gql`
  //   query Hello($something: String!) {
  //     hello(something: $something)
  //   }
  // `;

  // function HelloWorld() {
  //   const something = "lol";
  //   const { loading, error, data } = useQuery(HELLO_QUERY, {
  //     variables: { something: something },
  //   });
  //   if (data) console.log(data);
  //   if (error) console.log("NOPE");
  //   if (error) console.log(error);
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error :(</p>;

  //   return <div>{data.hello}</div>;
  // }

  return (
    <div className={styles.invitesSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options
        propBackgroundColor="#302b4f"
        propBoxShadow="unset"
        propBackgroundColor1="#302b4f"
        propBoxShadow1="unset"
        propBackgroundColor2="#6b56a3"
        propBoxShadow2="0px 4px 4px rgba(0, 0, 0, 0.25) inset"
        onOptionsStatusFrameClick={onOptionsStatusFrameClick}
        onOptionsInvitesFrameClick={onOptionsInvitesFrameClick}
      />

      {/* <SubGizInvitesComponent userName={user.displayName} idToken={idToken}/> */}
      {/* <PingComponent/> */}
      {/* <HelloWorld /> */}
      <InvitesGiz gizCompleteQuery={gizCompleteQuery}  gizCompleteIds={gizCompleteIds}/>
      <div className={styles.space} />
    </div>
  );
};

export default InvitesSite;
