import { getAuth, updateProfile, User } from "firebase/auth";

export const updateCurrentUserProfile = async (userName: string) => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        displayName: userName,
      });
      console.log("Profile updated!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  } else {
    console.log("User does not exist");
  }
};
