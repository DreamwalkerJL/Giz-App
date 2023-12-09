// registerUser.ts
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import axios from "axios";
import { photoUrls } from "../photoUrls";

interface RegisterUserProps {
  email: string;
  password: string;
  userName: string;
}

const getRandomImagePath = () => {
  const randomIndex = Math.floor(Math.random() * photoUrls.length);
  return photoUrls[randomIndex];
};

const registerUserInDb = async ({
  email,
  password,
  userName,
}: RegisterUserProps) => {
  const auth = getAuth();
  const profilePicture = getRandomImagePath();
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const response = await axios.post("http://localhost:8080/api/register", {
      uid: user.uid, // Firebase UID
      email: user.email,
      userName: userName,
      profilePicture: profilePicture,
    });

    return response.data;
  } catch (error) {
    console.error("Error during user registration", error);
    throw error;
  }
};

export default registerUserInDb;
