import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";
export interface userPublic {
  id: number;
  userName: string;
  profilePicture: string;
  status: string;
}

export interface gizComplete {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  creatorUserName: string;
  invitedUsers: userPublic[];
}

export interface getGizCompleteResponseType {
  gizData: gizComplete[];
}

const GET_GIZ_INVITES_QUERY = gql`
  query GetGizInvites($userName: String, $status: String) {
    gizCompleteQuery(userName: $userName, status: $status) {
      id
      title
      description
      date
      time
      creatorUserName
      invitedUsers {
        id
        userName
        profilePicture
        status
      }
    }
  }
`;

interface gizCompleteQueryVariables {
  userName: string;
  status: string;
}

export const gizCompleteQuery = (userName: string, status: string) => {
  console.log(status)
  const { data, loading, error } = useQuery<gizComplete[]>(GET_GIZ_INVITES_QUERY, {
    variables: { userName, status },
  });
console.log(data)
  // Optionally, you can handle side effects, logging, or error handling here
  // Remember that hooks themselves should not return anything other than
  // what they are designed to (in this case, the object containing { data, loading, error })

  return { data, loading, error };
};

const GIZ_INVITES_SUBSCRIPTION = gql`
  subscription OnGizInvitesUpdated($userName: String!) {
    gizInvitesUpdated(userName: $userName) {
      gizData {
        id
        title
        description
        date
        time
        creatorUserName
        invitedUsers {
          id
          userName
          profilePicture
          status
        }
      }
    }
  }
`;

export const SubGizInvitesComponent: React.FC<gizCompleteQueryVariables> = ({
  userName,
}) => {
  const { data, loading, error } = useSubscription<getGizCompleteResponseType>(
    GIZ_INVITES_SUBSCRIPTION,
    {
      variables: { userName },
    }
  );
  if (loading) console.log("TEST");
  if (data) {
    console.log(data);
  }
  if (loading) return <p>Subscription is loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  // Your subscription data will be updated here
  return (
    <div>
      <p>456</p>
    </div>
  );
};

// Define the GraphQL subscription
const PING_SUBSCRIPTION = gql`
  subscription {
    ping
  }
`;

export const PingComponent = () => {
  // Use the useSubscription hook to listen for pings
  const { data, loading, error } = useSubscription(PING_SUBSCRIPTION);
  if (data) console.log("PINGED");
  if (loading) return <p>Connecting to ping subscription...</p>;
  if (error) return <p>Error in ping subscription: {error.message}</p>;

  // The data object will be updated every time a new "ping" message is received
  return (
    <div>
      <p>Last ping: {data ? data.ping : "Waiting for pings..."}</p>
    </div>
  );
};
