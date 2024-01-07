import app from "./firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  getAdditionalUserInfo,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function generateRandomUsername(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const signInWithGoogle = (onSuccess: () => void): void => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // Use getAdditionalUserInfo to check if it's the first time the user is signing in
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        // Generate a random username
        const randomUsername = generateRandomUsername(100);

        // Set the random username as the display name
        await updateProfile(result.user, { displayName: randomUsername });

        // Additional first-time user logic goes here
      }

      onSuccess();
    })
    .catch((error) => {
      console.error("Error during Google sign-in: ", error.message);
    });
};
