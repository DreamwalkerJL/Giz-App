import { FunctionComponent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./CreateSite.module.css";
import CreateGizInformationFrame from "../components/CreateSite/CreateInformationFrame";
import CreateGizUsers from "../components/CreateSite/CreateGizUsers";
import { logCurrentUser } from "../firebase/AuthFunction";
import dayjs from "dayjs";
import {

  createGizAndGizUsers,
  createGizType,

  createGizUserType,
  getUserData,
  getUserResponseDataType,
} from "../apiServices/CreateApiServices";
import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";

const CreateSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onOptionsStatusFrameClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const onOptionsInvitesFrameClick = useCallback(() => {
    navigate("/invites-site");
  }, [navigate]);

  const onCreateGizButton1Click = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  logCurrentUser();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs());
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  console.log(time.format("HH:mm:ss")); // Formats the date and time
  console.log(date.format("DD:MM:YYYY")); // Formats the date and time
  console.log(title); // Formats the date and time
  console.log(description); // Formats the date and time

  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<getUserResponseDataType[]>([]);
  const { idToken } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  function checkIfUserAlreadyAdded() {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].userName === userName) {
        return true;
      }
    }
  }

  const handleCreateGiz = async () => {
    const formattedTime = time.format("h:mm A");
    const formattedDate = date.format("MMMM D, YYYY");

    const gizData: createGizType = {
      title,
      description,
      date: formattedDate,
      time: formattedTime,
    };
    console.log(`OK ${title}, ${description}`);
    
    if (!idToken || !user || !user?.displayName) {
      console.error("No IdToken / Logged in User / Displayname to User assigned");
      return;
    }

    try {
      const addedUsersId = userData.map((user) => user.id);
      console.log(addedUsersId);
      const response = await createGizAndGizUsers(
        idToken,
        gizData,
        user?.displayName,
        addedUsersId
      );
      navigate("/status-site")
      console.log(response)
    } catch (e) {
      console.error(e);
    }

    // try {
    //   const response = await createGiz(idToken, { ...gizData });
    //   if (response.id && user?.displayName) {
    //     const userId = await getUserData(idToken, user.displayName);
    //     const gizUserData: createGizUserType = {
    //       gizId: response.id, // Assuming the returned data has an 'id' field
    //       userId: userId.id, // You should get this from the logged-in user data
    //       status: "accepted",
    //       creator: true, // or false, depending on your logic
    //     };
    //     const newGizUser = await createGizUser(idToken, gizUserData);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  logCurrentUser();
  const addUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!idToken) {
      console.error("Token doesnt exist");
      return;
    }

    if (checkIfUserAlreadyAdded()) {
      console.error("User has already been added");
      return;
    }

    if (userName === user?.displayName) {
      console.error("You cannot add yourself");
      return;
    }

    try {
      const userData = await getUserData(idToken, userName);
      console.log(userData);
      setUserData((prevUserData) => [...prevUserData, userData]);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <div className={styles.createSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options
        propBackgroundColor="#6b56a3"
        propBoxShadow="0px 4px 4px rgba(0, 0, 0, 0.25) inset"
        propBackgroundColor1="#302b4f"
        propBoxShadow1="unset"
        propBackgroundColor2="#302b4f"
        propBoxShadow2="unset"
        onOptionsStatusFrameClick={onOptionsStatusFrameClick}
        onOptionsInvitesFrameClick={onOptionsInvitesFrameClick}
      />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          <CreateGizInformationFrame
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
          />
          <CreateGizUsers
            userName={userName}
            setUserName={setUserName}
            addUser={addUser}
            userData={userData}
            setUserData={setUserData}
          />
          <div className={styles.createOrCancel}>
            <div className={styles.createGizButtonFrame}>
              <div
                className={styles.createGizButton}
                // onClick={onCreateGizButton1Click}
              >
                <div
                  className={styles.createGizButtonContainer}
                  onClick={handleCreateGiz}
                >
                  <b>CREATE</b>
                  <span className={styles.span}>{` `}</span>
                  <b>GIZ</b>
                </div>
              </div>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <div className={styles.cancelButton}>
                <b className={styles.createGizButtonContainer}>CANCEL</b>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </div>
    </div>
  );
};

export default CreateSite;
