import { gql } from "@apollo/client";

export const GIZ_EDIT_SUBSCRIPTION = gql`
  subscription GizEditedSubscription($userUid: String!) {
    gizEditedSubscription(userUid: $userUid) {
      id
      title
      description
      date
      time
      creatorUserName
      usersToBeAdded {
        gizId
        userId
        userName
        profilePicture
        status
      }
      usersToBeRemoved {
        gizId
        userId
        userName
        profilePicture
        status
      }
    }
  }
`;

export const GIZ_EDIT_USER_INVITES_SUBSCRIPTION = gql`
  subscription GizEditUserInvitesSubscription($userUid: String!) {
    gizEditUserInvitesSubscription(userUid: $userUid) {
      id
      title
      description
      date
      time
      creatorUserName
      invitedUsers {
        gizId
        userId
        userName
        profilePicture
        status
      }
    }
  }
`;

export const GIZ_CREATED_SUBSCRIPTION = gql`
  subscription GizCreatedSubscription($userUid: String!) {
    gizCreatedSubscription(userUid: $userUid) {
      id
      title
      description
      date
      time
      creatorUserName
      invitedUsers {
        gizId
        userId
        userName
        profilePicture
        status
      }
    }
  }
`;

export const USER_CHANGED_PP_SUBSCRIPTION = gql`
  subscription UserChangedPpSubscription($userUid: String!) {
    userChangedPpSubscription(userUid: $userUid) {
      userId
      userName
      profilePicture
    }
  }
`;

export const GIZ_DELETED_SUBSCRIPTION = gql`
  subscription GizDeletedSubscription($userUid: String!) {
    gizDeletedSubscription(userUid: $userUid)
  }
`;

// export const USER_HANDLED_GIZ_INVITE_SUBSCRIPTION = gql`
//   subscription GizInvitesUpdated($userUid: String!) {
//     userHandledGizInvite(userUid: $userUid) {
//       gizId
//       userId
//       userName
//       profilePicture
//       status
//     }
//   }
// `;

export const USER_HANDLED_GIZ_INVITE_SUBSCRIPTION = gql`
  subscription UserHandledGizInvite($userUid: String!) {
    userHandledGizInvite(userUid: $userUid) {
      gizId
      userId
      userName
      profilePicture
      status
    }
  }
`;
