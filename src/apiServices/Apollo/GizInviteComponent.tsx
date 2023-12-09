import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSubscription } from '@apollo/client';
export interface invitesUsersData {
  id: number;
  userName: string;
  profilePicture: string;
  status: string
}



export interface gizInvitesData {
  id: number,
  title: string;
  description: string;
  date: string;
  time: string;
  creatorUserName: string;
  invitedUsers: invitesUsersData[]
}

export interface getGizInvitesResponseType {
  gizData: gizInvitesData[]
}


const GET_GIZ_INVITES_QUERY = gql`
  query GetGizInvites($userName: String) {
    getGizInvites(userName: $userName) {
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


interface GizInvitesComponentProps {
  idToken: string;
  userName: string;
}

export const GizInvitesComponent: React.FC<GizInvitesComponentProps> = ({ userName }) => {
  console.log(userName)
  const { data, loading, error } = useQuery<getGizInvitesResponseType>(GET_GIZ_INVITES_QUERY, {
    variables: { userName },
  });

  // useEffect removed since you should use the `data` directly
  // console.log("123")
  // console.log(data)
  if (error) console.log(error);
  if (loading) return <p>Loading...</p>;
  if (loading) console.log(loading)
  if (data) console.log(data)
  if (error) return <p>Error :</p>;

  // Once the data is loaded, pass it to the InvitesGizInfoAndUsers component
  return (
    <div>
      123
    </div>
  );
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


export const SubGizInvitesComponent: React.FC<GizInvitesComponentProps> = ({ userName }) => {
  const { data, loading, error } = useSubscription<getGizInvitesResponseType>(GIZ_INVITES_SUBSCRIPTION, {
    variables: { userName }
  });

  if(data){ console.log(`SUB ${data}`)}
  if (loading) return <p>Subscription is loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  // Your subscription data will be updated here
  return (
    <div>
<p>456</p>
    </div>
  );
}


