import { getAuth, signOut } from "firebase/auth";

export const signOutUser = async (): Promise<void> => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    const err = error as Error;
    console.error("Error signing out: ", err.message);
  }
};
