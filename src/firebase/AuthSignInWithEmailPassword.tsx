import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface SignInResult {
  success: boolean;
  error?: string;
}

export const signInWithEmailPassword = async (
  email: string,
  password: string
): Promise<SignInResult> => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    // Type assertion here
    const err = error as Error;
    return { success: false, error: err.message };
  }
};
