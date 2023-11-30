import app from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = (onSuccess: () => void): void => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in");
      console.log(result.user);
      auth.currentUser?.getIdToken(true).then((idToken) => {
        console.log(idToken);
      });
      onSuccess();
    })
    .catch((error) => {
      console.error("Error during Google sign-in: ", error.message);
    });
};
