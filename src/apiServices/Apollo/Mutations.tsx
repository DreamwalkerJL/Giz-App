import { gql } from "@apollo/client";

export const CHANGE_PP_MUTATION = gql`
  mutation ChangePpMutation($userName: String!, $newPp: String!) {
    changePpMutation(userName: $userName, newPp: $newPp) {
      success
      message
    }
  }
`;

export const CREATE_GIZ_AND_GIZ_USERS_MUTATION = gql`
  mutation CreateGizAndGizUsersMutation(
    $gizData: CreateGizData!
    $creatorUserName: String!
    $invitedUsersId: [Int!]!
  ) {
    createGizAndGizUsersMutation(
      createGizInput: {
        gizData: $gizData
        creatorUserName: $creatorUserName
        invitedUsersId: $invitedUsersId
      }
    ) {
      success
      message
    }
  }
`;

export const GIZ_DELETE_MUTATION = gql`
  mutation GizDeleteMutation($gizIdString: String!) {
    gizDeleteMutation(gizIdString: $gizIdString) {
      success
      message
    }
  }
`;

export const GIZ_EDIT_MUTATION = gql`
  mutation GizEditMutation($gizCompleteInput: GizCompleteInput!) {
    gizEditMutation(gizCompleteInput: $gizCompleteInput) {
      success
      message
    }
  }
`;

export const GIZ_HANDLE_INVITE_MUTATION = gql`
  mutation GizHandleInviteMutation(
    $userName: String
    $gizCompleteIdString: String
    $decision: String
  ) {
    gizHandleInviteMutation(
      userName: $userName
      gizCompleteIdString: $gizCompleteIdString
      decision: $decision
    ) {
      success
      message
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation($userDto: UserDto!) {
    registerUserMutation(userDto: $userDto) {
      success
      message
    }
  }
`;

export const REFRESH_FCM_TOKEN_MUTATION = gql`
  mutation RefreshFcmTokenMutation($fcmToken: String, $uid: String!) {
    refreshFcmTokenMutation(fcmToken: $fcmToken, uid: $uid) {
      success
      message
    }
  }
`;
