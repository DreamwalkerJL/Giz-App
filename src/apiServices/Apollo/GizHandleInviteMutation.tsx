import { gql, useMutation, useQuery } from "@apollo/client";

export const GIZ_HANDLE_INVITE_MUTATION = gql`
  mutation GizHandleInviteMutation($userName: String, $status: String) {
    gizHandleInviteMutation(userName: $userName, status: $status) {
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

export interface gizHandleInviteMutation {
  userName: string;
  status: string;
}

export interface AddGizEventVariables {
  title: String;
  description: String;
  date: String;
  time: String;
  creatorUserName: String;
}

export const gizHandleInviteMutation = (
  userName: string,
  gizCompleteIds: number[] | undefined,
  decision: string
) => {
  const [addGizEvent, { data, loading, error }] =
    useMutation<gizHandleInviteMutation>(GIZ_HANDLE_INVITE_MUTATION, {
      variables: { userName, gizCompleteIds, decision },
    });

  const handleAddEvent = async (variables: AddGizEventVariables) => {
    try {
      const response = await addGizEvent({ variables });
      console.log(response.data);
      // Handle success
    } catch (e) {
      console.error(e);
      // Handle error
    }
  };

  return { handleAddEvent, data, loading, error };
};


