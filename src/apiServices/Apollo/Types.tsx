export interface HandleGizInviteMutationVariable {
  userName: string;
  gizCompleteIdString: string;
  decision: string;
}

export interface UserPublic {
  gizId: number | null;
  userId: number;
  userName: string;
  profilePicture: string;
  status: string;
}

export interface GizComplete {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  creatorUserName: string;
  invitedUsers: UserPublic[];
}

export interface GizCompleteQueryData {
  gizCompleteQuery: GizComplete[];
}

export type UserPublicWithTypename = UserPublic & { __typename?: string };

export interface UserHandledGizInviteSubscriptionData {
  userHandledGizInvite: UserPublic;
}

export interface GizEditSubscriptionData {
  gizEditedSubscription: GizCompleteSub;
}

export interface GizEditUserInvitesSubscriptionData {
  gizEditUserInvitesSubscription: GizComplete;
}

export interface GizCreatedSubscriptionData {
  gizCreatedSubscription: GizComplete;
}

export interface GizDeletedSubscriptionData {
  gizDeletedSubscription: string;
}

export interface UserChangedPpSubscriptionData {
  userChangedPpSubscription: UserChangedPpSubscription
}

export interface UserChangedPpSubscription {
  userId: number
  userName: string
  profilePicture: string
}


export interface GizCompleteSub {
  id: Number;
  title: string;
  description: string;
  date: string;
  time: string;
  creatorUserName: string;
  usersToBeAdded: [UserPublic];
  usersToBeRemoved: [UserPublic];
}

export interface UserDto {
  uid: string;
  email: string;
  userName: string;
  profilePicture: string;
}
