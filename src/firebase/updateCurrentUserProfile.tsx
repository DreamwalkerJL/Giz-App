import { getAuth, updateProfile, User } from "firebase/auth";
import { toast } from "react-toastify";

export const updateCurrentUserProfile = async (userName: string) => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        displayName: userName,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
        toast.error("ERROR - Please contact support")
      } else {
        console.error("An unexpected error occurred");
        toast.error("ERROR - Please contact support")
      }
    }
  } else {
    console.error("User does not exist");
    toast.error("ERROR - Please contact support")
  }
};
