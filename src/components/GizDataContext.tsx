
// GizDataContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from "react";
import {useQuery, useSubscription } from "@apollo/client";
import { useAuth } from "../firebase/AuthContext";
import {
  GIZ_CREATED_SUBSCRIPTION,
  GIZ_DELETED_SUBSCRIPTION,
  GIZ_EDIT_SUBSCRIPTION,
  GIZ_EDIT_USER_INVITES_SUBSCRIPTION,
  USER_CHANGED_PP_SUBSCRIPTION,
  USER_HANDLED_GIZ_INVITE_SUBSCRIPTION,
} from "../apiServices/Apollo/Subscriptions";
import {
  GizComplete,

  GizCreatedSubscriptionData,
  GizDeletedSubscriptionData,
  GizEditSubscriptionData,
  GizEditUserInvitesSubscriptionData,
  UserChangedPpSubscriptionData,
  UserHandledGizInviteSubscriptionData,
  UserPublic,
} from "../apiServices/Apollo/Types";
import { GIZ_COMPLETE_QUERY, IS_NOTIFICATION_ENABLED, USER_FAVORITES_QUERY } from "../apiServices/Apollo/Querys";
// Define a type for your context state
type GizDataContextType = {
  gizCompleteData: GizComplete[]; // Replace `any` with a more specific type as needed
  notificationData: boolean;
  userFavorites: UserPublic[];
  loading: boolean;
  error: unknown; // or a more specific error type
  refetchGizData: () => void;
  setGizCompleteData: React.Dispatch<React.SetStateAction<GizComplete[]>>;
  setNotificationData: React.Dispatch<React.SetStateAction<boolean>>;
  setUserFavorites: React.Dispatch<React.SetStateAction<UserPublic[]>>;
  // ... other state or functions
};
// Provide a default value that matches the type
const defaultValue: GizDataContextType = {
  gizCompleteData: [],
  notificationData: false,
  userFavorites: [],
  loading: false,
  error: null,
  refetchGizData: () => {}, // noop function
  setGizCompleteData: () => {},
  setNotificationData: () => {},
  setUserFavorites: () => {},
  // ... other default values
};
const GizDataContext = createContext<GizDataContextType>(defaultValue);
export const useGizData = () => useContext(GizDataContext);
interface GizDataProviderProps {
  children: React.ReactNode; // Correct type for children
  status: string; // Add this line
}



export const GizDataProvider: FunctionComponent<GizDataProviderProps> = ({
  children,
  status,
}) => {
  const { currentUser } = useAuth();

  const userName = currentUser?.displayName;
  const userUid = currentUser?.uid
  const [gizCompleteData, setGizCompleteData] = useState<GizComplete[]>([]);
  const { data, loading, error, refetch } = useQuery(GIZ_COMPLETE_QUERY, {
    variables: { userName, status },
    skip: !currentUser || !currentUser.displayName, // Skip the query if conditions are not met
    fetchPolicy: "cache-first"
  });

  const [notificationData, setNotificationData] = useState<boolean>(false);

  const { data: notificationDataQuery } = useQuery(IS_NOTIFICATION_ENABLED, {
    variables: { uid: userUid },
    fetchPolicy: "cache-first",
    // fetchPolicy: "network-only", // Ensures fresh data on each component mount
  });

  const [userFavorites, setUserFavorites] = useState<UserPublic[]>([]);

  const { data: userFavoritesData } = useQuery(USER_FAVORITES_QUERY, {
    variables: { uid: userUid },
    fetchPolicy: "cache-first"
  });

  const { data: userChangedPpSubscriptionData } =
    useSubscription<UserChangedPpSubscriptionData>(
      USER_CHANGED_PP_SUBSCRIPTION,
      {
        variables: { userUid },
      }
    );
  const { data: gizDeletedSubscriptionData } =
    useSubscription<GizDeletedSubscriptionData>(GIZ_DELETED_SUBSCRIPTION, {
      variables: { userUid },
    });
  const { data: gizEditUserInvitesSubscriptionData } =
    useSubscription<GizEditUserInvitesSubscriptionData>(
      GIZ_EDIT_USER_INVITES_SUBSCRIPTION,
      {
        variables: { userUid },
      }
    );
  const { data: gizCreatedSubscriptionData } =
    useSubscription<GizCreatedSubscriptionData>(GIZ_CREATED_SUBSCRIPTION, {
      variables: { userUid },
    });
  const { data: gizEditSubscriptionData } =
    useSubscription<GizEditSubscriptionData>(GIZ_EDIT_SUBSCRIPTION, {
      variables: { userUid },
    });
  const { data: subscriptionData } =
    useSubscription<UserHandledGizInviteSubscriptionData>(
      USER_HANDLED_GIZ_INVITE_SUBSCRIPTION,
      { variables: { userUid } }
    );
  // Refetch data every 1 minute
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();

  //   }, 60000); // 60000 milliseconds = 1 minute
  //   return () => clearInterval(interval); // Clear interval on component unmount
  // }, [refetch]);

  // Update state when query data is received




  useEffect(() => {
    if (data?.gizCompleteQuery) {
      setGizCompleteData(data.gizCompleteQuery);
    }
  }, [data]);

  useEffect(() => {
    if (notificationDataQuery?.isNotificationEnabled) {
      setNotificationData(notificationDataQuery.isNotificationEnabled);
    }
  }, [notificationDataQuery]);

  useEffect(() => {

    if (userFavoritesData?.userFavoritesQuery) {
      setUserFavorites(userFavoritesData.userFavoritesQuery);
    }
  }
  , [userFavoritesData]);

  // Update state when subscription data is received
  useEffect(() => {
    if (subscriptionData?.userHandledGizInvite) {
      

        // Otherwise, update the invitedUsers array as before
        const updatedData = gizCompleteData.map((gizComplete) => {
          if (gizComplete.id === subscriptionData.userHandledGizInvite.gizId) {
            return {
              ...gizComplete,
              invitedUsers: gizComplete.invitedUsers.map((user) => {
                if (
                  user.userId === subscriptionData.userHandledGizInvite.userId
                ) {
                  // Assuming you want to update the user data here
                  return subscriptionData.userHandledGizInvite;
                }
                return user;
              }),
            };
          }
          return gizComplete;
        });
        setGizCompleteData(updatedData);

    }
  }, [subscriptionData]);
  useEffect(() => {
    if (gizEditSubscriptionData?.gizEditedSubscription) {
      const editedGizSub = gizEditSubscriptionData.gizEditedSubscription;
  
      setGizCompleteData((currentData) => {
        return currentData.map((giz) => {
          if (giz.id === editedGizSub.id) {
            // Merge existing giz data with the updated fields from the subscription
            // Only update fields that are defined in the subscription data
            const updatedGiz: GizComplete = { ...giz };
            
            if (editedGizSub.title !== null) updatedGiz.title = editedGizSub.title;
            if (editedGizSub.description !== null) updatedGiz.description = editedGizSub.description;
            if (editedGizSub.date !== null) updatedGiz.date = editedGizSub.date;
            if (editedGizSub.time !== null) updatedGiz.time = editedGizSub.time;
            if (editedGizSub.creatorUserName !== null) updatedGiz.creatorUserName = editedGizSub.creatorUserName;
  
            // Handle usersToBeAdded and usersToBeRemoved arrays
            // Assuming you want to add new users and remove the specified users
            if (editedGizSub.usersToBeAdded) {
              updatedGiz.invitedUsers = [
                ...updatedGiz.invitedUsers,
                ...editedGizSub.usersToBeAdded.filter(userToAdd =>
                  !updatedGiz.invitedUsers.some(user => user.userId === userToAdd.userId)
                )
              ];
            }
  
            if (editedGizSub.usersToBeRemoved) {
              updatedGiz.invitedUsers = updatedGiz.invitedUsers.filter(user =>
                !editedGizSub.usersToBeRemoved.some(userToRemove => userToRemove.userId === user.userId)
              );
            }
  
            return updatedGiz;
          }
          return giz;
        });
      });
    }
  }, [gizEditSubscriptionData]);

  useEffect(() => {
    if (gizCreatedSubscriptionData) {
      const newGiz = gizCreatedSubscriptionData.gizCreatedSubscription;
      if (status === "invited") {
        // Check current status
        setGizCompleteData((prevGizCompleteData) => [
          ...prevGizCompleteData,
          newGiz,
        ]);
      }
    }
  }, [gizCreatedSubscriptionData]); // Add currentStatus to dependency array
  useEffect(() => {
    if (gizDeletedSubscriptionData) {
      const deletedGizId = gizDeletedSubscriptionData.gizDeletedSubscription;
      setGizCompleteData((prevGizCompleteData) =>
        prevGizCompleteData.filter(
          (gizComplete) => gizComplete.id.toString() !== deletedGizId
        )
      );
    }
  }, [gizDeletedSubscriptionData]);
  useEffect(() => {
    if (userChangedPpSubscriptionData) {
      const updatedUserData =
        userChangedPpSubscriptionData.userChangedPpSubscription;
      setGizCompleteData((prevGizCompleteData) =>
        prevGizCompleteData.map((gizComplete) => {
          // Check if the updated user is part of the invited users of this gizComplete
          const isUserPartOfGiz = gizComplete.invitedUsers.filter(
            (user) => user.userId === updatedUserData.userId
          );
          if (isUserPartOfGiz) {
            // Update the profile picture of the user in this gizComplete
            return {
              ...gizComplete,
              invitedUsers: gizComplete.invitedUsers.map((user) =>
                user.userId === updatedUserData.userId
                  ? { ...user, profilePicture: updatedUserData.profilePicture }
                  : user
              ),
            };
          }
          return gizComplete;
        })
      );
    }
  }, [userChangedPpSubscriptionData]);
  useEffect(() => {
    if (gizEditUserInvitesSubscriptionData?.gizEditUserInvitesSubscription) {


      const editedGiz = gizEditUserInvitesSubscriptionData.gizEditUserInvitesSubscription;
  
      setGizCompleteData((prevGizCompleteData) => {
        const updatedGizCompleteData = prevGizCompleteData.map((giz) => {
          if (giz.id === editedGiz.id) {
            return {
              ...giz,
              invitedUsers: giz.invitedUsers.map((user) => {
                const editUser = editedGiz.invitedUsers.find(editUser => editUser.userId === user.userId);
                return editUser ? { ...user, status: editUser.status } : user;
              }),
            };
          }
          return giz;
        });
  
        const isGizAlreadyPresent = updatedGizCompleteData.some(giz => giz.id === editedGiz.id);
        
        if (!isGizAlreadyPresent) {
          return [...updatedGizCompleteData, editedGiz];
        } 
        
        return updatedGizCompleteData;
      });
  
    }
  }, [gizEditUserInvitesSubscriptionData]);
  const contextValue = {
    gizCompleteData,
    setGizCompleteData,
    notificationData,
    setNotificationData,
    userFavorites,
    setUserFavorites,
    loading,
    error,
    refetchGizData: refetch,
    // any other state or functions you want to expose
  };
  return (
    <GizDataContext.Provider value={contextValue}>
      {children}
    </GizDataContext.Provider>
  );
};
