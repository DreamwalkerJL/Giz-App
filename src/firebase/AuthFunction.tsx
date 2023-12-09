import { getAuth, updateProfile } from "firebase/auth";

export const logCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log("User is signed in. User details:", user);
    console.log("User ID: ", user.uid);
    console.log("User Email: ", user.email);

  } else {
    console.log("No user is currently signed in.");
  }
};
