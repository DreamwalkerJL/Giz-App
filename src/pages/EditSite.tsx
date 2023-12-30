import {
  FunctionComponent,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./EditSite.module.css";
import { logCurrentUser } from "../firebase/AuthFunction";
import dayjs from "dayjs";
import { createGizType, getUserData } from "../apiServices/CreateApiServices";
import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import CreateGizUsers from "../components/CreateSite/CreateGizUsers";
import CreateGizInformationFrame from "../components/CreateSite/CreateInformationFrame";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { useGizData } from "../components/GizDataContext";
import { UserPublicWithTypename } from "../apiServices/Apollo/Types";
import {
  CREATE_GIZ_AND_GIZ_USERS_MUTATION,
  GIZ_DELETE_MUTATION,
  GIZ_EDIT_MUTATION,
} from "../apiServices/Apollo/Mutations";
import { USER_PUBLIC_QUERY } from "../apiServices/Apollo/Querys";
const EditSite: FunctionComponent = () => {
  const navigate = useNavigate();
  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  logCurrentUser();
  const location = useLocation();
  // const [gizData, setGizData] = useState<GizComplete>();

  // Now you can use the data object
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const [gizId, setGizId] = useState<number>();
  const [creatorUserName, setCreatorUserName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs());
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<UserPublicWithTypename[]>([]);
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
  console.log(userData);

  const { gizCompleteData, loading, error, refetchGizData } = useGizData();
  const gizData = gizCompleteData.find((giz) => giz.id === gizId); // Find the giz
  useEffect(() => {
    if (gizData) {
      console.log(gizData);
      setCreatorUserName(gizData.creatorUserName);
      setGizId(gizData.id);
      setTitle(gizData.title || "");
      setDescription(gizData.description || "");
      // Create dayjs objects from string
      const timeFromState = dayjs(gizData.time, "h:mm A");
      const dateFromState = dayjs(gizData.date, "MMMM D, YYYY");
      setTime(timeFromState);
      setDate(dateFromState);
      setUserData(gizData.invitedUsers);
      console.log(userData);
    }
  }, [gizData]);

  useEffect(() => {
    // setGizData(location.state.gizComplete);
    setGizId(location.state.gizComplete.id);
  }, [location.state.gizComplete, location, gizData]);

  // Initialize the mutation with Apollo Client
  const [createGizAndGizUsersMutation, {}] = useMutation(
    CREATE_GIZ_AND_GIZ_USERS_MUTATION
  );
  // Inside your component or function
  const [
    gizEdit,
    { data: gizEditData, loading: gizEditLoading, error: gizEditError },
  ] = useMutation(GIZ_EDIT_MUTATION);
  const handleCreateGiz = async () => {
    const formattedTime = time.format("h:mm A");
    const formattedDate = date.format("MMMM D, YYYY");
    const gizData: createGizType = {
      title,
      description,
      date: formattedDate,
      time: formattedTime,
    };
    if (!idToken || !user || !user?.displayName) {
      console.error(
        "No IdToken / Logged in User / Displayname to User assigned"
      );
      return;
    }
    try {
      gizEdit({
        variables: {
          gizCompleteInput: {
            id: gizId,
            title,
            description,
            date: formattedDate,
            time: formattedTime,
            creatorUserName,
            invitedUsers: userData.map(({ __typename, ...rest }) => rest), // Remove __typename from each object
          },
        },
      }).then(() => {
        console.log(gizEditData);
        navigate("/status-site");
      });
    } catch (error) {
      console.error("Error executing mutation", error);
    }
  };
  logCurrentUser();
  const [
    getUser,
    {
      loading: userPublicLoading,
      error: userPublicError,
      data: userPublicData,
    },
  ] = useLazyQuery(USER_PUBLIC_QUERY);

  const [refreshUserData, setRefreshUserData] = useState(false);

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
      // Execute the query
      getUser({
        variables: { userName },
      });
      setRefreshUserData((prev) => !prev);
      console.log(userPublicData);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  
  // Handling the received data
  useEffect(() => {
    if (userPublicData) {
      setUserData((prevUserData) => [
        ...prevUserData,
        userPublicData.userPublicQuery,
      ]);
      setUserName("");
      console.log(userName);
      if (userNameRef.current) {
        userNameRef.current.focus();
      }
    }
    if (error) {
      console.error("Error fetching user data", error);
    }
  }, [refreshUserData, error, userPublicData]);

  const [
    gizDelete,
    {
      data: gizDeleteResponse,
      loading: gizDeleteLoading,
      error: gizDeleteError,
    },
  ] = useMutation(GIZ_DELETE_MUTATION);
  const handleGizDelete  = async () => {
    if (gizId) {
      try {
        const gizIdString = gizId.toString();
        await gizDelete({ variables: { gizIdString } });
        console.log(gizDeleteResponse);
        navigate("/status-site");
      } catch (error) {
        console.log(error);
        console.log(gizDeleteError);
      }
    } else {
      console.log("gizId does not exist");
    }
  };
  return (
    <div className={styles.editSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          <div className={styles.titleTWrapper}>
            <div className={styles.titleT}>EDIT GIZ</div>
          </div>
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
            userNameRef={userNameRef}
            userName={userName}
            setUserName={setUserName}
            addUser={addUser}
            userData={userData}
            setUserData={setUserData}
          />
          <div className={styles.editOrCancel}>
            <div className={styles.confirmChangeGizButtonFram}>
              <button
                className={styles.confirmChangeGizButton}
                onClick={handleCreateGiz}
              >
                <b className={styles.confirmGizButton}>CONFIRM CHANGE</b>
              </button>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <button className={styles.cancelButton} onClick={handleGizDelete}>
                <b className={styles.confirmGizButton}>DELETE GIZ</b>
              </button>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <button className={styles.cancelButton}>
                <b className={styles.confirmGizButton}>CANCEL</b>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </div>
    </div>
  );
};
export default EditSite;
