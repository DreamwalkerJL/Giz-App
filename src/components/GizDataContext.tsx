// GizDataContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from "react";
import { useQuery, useSubscription } from "@apollo/client";

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
  GizCompleteSub,
  GizCreatedSubscriptionData,
  GizDeletedSubscriptionData,
  GizEditSubscriptionData,
  GizEditUserInvitesSubscriptionData,
  UserChangedPpSubscriptionData,
  UserHandledGizInviteSubscriptionData,
  UserPublic,
} from "../apiServices/Apollo/Types";
import { GIZ_COMPLETE_QUERY } from "../apiServices/Apollo/Querys";

// Define a type for your context state
type GizDataContextType = {
  gizCompleteData: GizComplete[]; // Replace `any` with a more specific type as needed
  loading: boolean;
  error: any; // Replace `any` with a more specific type as needed
  refetchGizData: () => void;
  setGizCompleteData: any;
  // ... other state or functions
};

// Provide a default value that matches the type
const defaultValue: GizDataContextType = {
  gizCompleteData: [],
  loading: false,
  error: null,
  refetchGizData: () => {}, // noop function
  setGizCompleteData: () => {},
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
  const userUid = currentUser?.uid;

  const [gizCompleteData, setGizCompleteData] = useState<GizComplete[]>([]);
  const { data, loading, error, refetch } = useQuery(GIZ_COMPLETE_QUERY, {
    variables: { userName, status },
    fetchPolicy: "network-only",
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
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      console.log("Refetching data...")
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [refetch]);

  // Handle query and subscription data updates...
  useEffect(() => {
    if (data?.gizCompleteQuery) {
      setGizCompleteData(data.gizCompleteQuery);
    }
  }, [data]);

  // Update state when query data is received
  useEffect(() => {
    if (data?.gizCompleteQuery) {
      setGizCompleteData(data.gizCompleteQuery);
    }
  }, [data]);

  // Update state when subscription data is received
  useEffect(() => {
    if (subscriptionData?.userHandledGizInvite) {
      if (subscriptionData.userHandledGizInvite.userName === userName) {
        const filteredData = gizCompleteData.filter(
          (gizComplete) =>
            !(
              gizComplete.id === subscriptionData.userHandledGizInvite.gizId &&
              gizComplete.invitedUsers.some(
                (user) => user.userName === userName
              )
            )
        );
        setGizCompleteData(filteredData);
      } else {
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
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (gizEditSubscriptionData?.gizEditedSubscription) {
      const editedGiz = gizEditSubscriptionData.gizEditedSubscription;

      setGizCompleteData((currentGizCompleteData) => {
        // Check if the current user is being added or removed
        const isCurrentUserAdded = editedGiz.usersToBeAdded.some(
          (user) => user.userName === userName
        );
        const isCurrentUserRemoved = editedGiz.usersToBeRemoved.some(
          (user) => user.userName === userName
        );

        // if (isCurrentUserAdded) {
        //   // Add the giz to gizCompleteData
        //   const newGiz: GizComplete = { ...editedGiz, invitedUsers: editedGiz.usersToBeAdded };
        //   return [...currentGizCompleteData, newGiz];
        // }

        if (isCurrentUserRemoved) {
          // Remove the giz from gizCompleteData
          return currentGizCompleteData.filter(
            (giz) => giz.id !== editedGiz.id
          );
        }
        // Update the existing gizComplete data
        return currentGizCompleteData.map((gizComplete) => {
          if (gizComplete.id === editedGiz.id) {
            let updatedGiz: GizComplete = { ...gizComplete };

            // Update the properties
            const keysToUpdate = Object.keys(editedGiz) as Array<
              keyof GizCompleteSub
            >;
            keysToUpdate.forEach((key) => {
              if (editedGiz[key] !== null && editedGiz[key] !== undefined) {
                (updatedGiz as any)[key] = editedGiz[key];
              }
            });

            // Update the invited users
            updatedGiz.invitedUsers = [
              ...updatedGiz.invitedUsers.filter(
                (user) =>
                  !editedGiz.usersToBeRemoved.some(
                    (u) => u.userId === user.userId
                  )
              ),
              ...editedGiz.usersToBeAdded.filter(
                (newUser) =>
                  !updatedGiz.invitedUsers.some(
                    (u) => u.userId === newUser.userId
                  )
              ),
            ];

            return updatedGiz;
          }
          return gizComplete;
        });
      });
    }
  }, [gizEditSubscriptionData, userName]);

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
      const editedGiz =
        gizEditUserInvitesSubscriptionData.gizEditUserInvitesSubscription;

      // Add the giz to gizCompleteData if it's not already present and if currentStatus matches
      if (status === "invited") {
        // Add this condition
        setGizCompleteData((prevGizCompleteData) => {
          const isGizAlreadyPresent = prevGizCompleteData.some(
            (giz) => giz.id === editedGiz.id
          );
          if (!isGizAlreadyPresent) {
            return [...prevGizCompleteData, editedGiz];
          }
          return prevGizCompleteData;
        });
      }
    }
  }, [gizEditUserInvitesSubscriptionData]); // Include currentStatus in the dependency array

  const contextValue = {
    gizCompleteData,
    setGizCompleteData,
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
