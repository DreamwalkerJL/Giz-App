import { getAuth, updateProfile, User } from "firebase/auth";
import { photoUrls } from "../photoUrls";

export const updateCurrentUserProfile = async (userName: string) => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const getRandomImagePath = () => {
    const randomIndex = Math.floor(Math.random() * photoUrls.length);
    return photoUrls[randomIndex];
  };

  if (user) {
    try {
      await updateProfile(user, {
        displayName: userName,
        photoURL: getRandomImagePath(),
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
    console.log;
  }
};
