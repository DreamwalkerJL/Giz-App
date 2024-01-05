import { getAuth} from "firebase/auth";

export const logCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log("User is signed in. User details:", user);
  } else {
    console.log("No user is currently signed in.");
  }
};
