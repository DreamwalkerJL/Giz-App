import { gql } from "@apollo/client";

// export const GIZ_COMPLETE_EDIT_QUERY = gql`
//   query GizCompleteEditQuery($gizIdString: String) {
//     gizCompleteEditQuery(gizIdString: $gizIdString) {
//       id
//       title
//       description
//       date
//       time
//       creatorUserName
//       invitedUsers {
//         gizId
//         userId
//         userName
//         profilePicture
//         status
//       }
//     }
//   }
// `;

export const GIZ_COMPLETE_QUERY = gql`
  query GizCompleteQuery($userName: String, $status: String) {
    gizCompleteQuery(userName: $userName, status: $status) {
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

export const USER_PUBLIC_QUERY = gql`
  query UserPublicQuery($userName: String, $email: String) {
    userPublicQuery(userName: $userName, email: $email) {
      gizId
      userId
      userName
      profilePicture
      status
    }
  }
`;

export const IS_NOTIFICATION_ENABLED = gql`
  query IsNotificationEnabled($uid: String!) {
    isNotificationEnabled(uid: $uid)
  }
`;

export const USER_FAVORITES_QUERY = gql`
  query UserFavoritesQuery($uid: String!) {
    userFavoritesQuery(uid: $uid) {
      gizId
      userId
      userName
      profilePicture
      status
    }
  }
`;

