import { getAuth, signOut } from "firebase/auth";

export const signOutUser = async (): Promise<void> => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error: any) {
    console.error("Error signing out: ", error.message);
  }
};
