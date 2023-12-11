import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./InvitesSite.module.css";
import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import { gizCompleteQuery } from "../apiServices/Apollo/GizCompleteQuery";
import { gql, useQuery } from "@apollo/client";

export const InvitesSite: FunctionComponent = () => {
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

  const { idToken } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!idToken || !user || !user?.displayName) {
    console.error("No IdToken / Logged in User / Displayname to User assigned");
    return;
  }

  const { data, loading, error } = gizCompleteQuery(
    user?.displayName,
    "invited"
  );
  console.log(data);

  // const [gizComplete, setgizComplete] = useState<gizComplete[] | undefined>();
  // useEffect(() => {
  //   // Define an async function inside the useEffect
  //   const fetchData = async () => {
  //     if (!idToken || !user || !user?.displayName) {
  //       console.error(
  //         "No IdToken / Logged in User / Displayname to User assigned"
  //       );
  //       return;
  //     }
  //     try {
  //       const response = getGizComplete(user.displayName, "invites");
  //       setgizComplete(response); // Set the state with the resolved data
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching giz invites data:", error);
  //     }
  //   };
  //   // Call the async function
  //   fetchData();
  // }, []);
  // Define your GraphQL query
  // React component to fetch and display data
  const HELLO_QUERY = gql`
    query Hello($something: String!) {
      hello(something: $something)
    }
  `;

  function HelloWorld() {
    const something = "lol";
    const { loading, error, data } = useQuery(HELLO_QUERY, {
      variables: { something: something },
    });
    if (data) console.log(data);
    if (error) console.log("NOPE");
    if (error) console.log(error);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <div>{data.hello}</div>;
  }

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
      <HelloWorld />
      {/* <InvitesGiz gizCompleteData={data} loading={loading} error={error}/> */}
      <div className={styles.space} />
    </div>
  );
};
