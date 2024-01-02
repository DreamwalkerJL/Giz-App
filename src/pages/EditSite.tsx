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
import {
  GizComplete,
  UserPublicWithTypename,
} from "../apiServices/Apollo/Types";
import {
  CREATE_GIZ_AND_GIZ_USERS_MUTATION,
  GIZ_DELETE_MUTATION,
  GIZ_EDIT_MUTATION,
} from "../apiServices/Apollo/Mutations";
import {
  GIZ_COMPLETE_QUERY,
  USER_PUBLIC_QUERY,
} from "../apiServices/Apollo/Querys";
import { motion } from "framer-motion";
const EditSite: FunctionComponent = () => {
  const navigate = useNavigate();
  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onCancelButtonClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  logCurrentUser();
  const location = useLocation();
  // const [gizData, setGizData] = useState<GizComplete>();

  // Now you can use the data object
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
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
  const [gizCompleteData, setGizCompleteData] = useState<GizComplete[]>([]);
  const { data, loading, error, refetch } = useQuery(GIZ_COMPLETE_QUERY, {
    variables: { userName: user?.displayName, status: "accepted" },
    fetchPolicy: "network-only",
  });

  const gizData = gizCompleteData.find((giz) => giz.id === gizId); // Find the giz
  useEffect(() => {
    if (gizData) {
      if (
        location.state.isRegroup &&
        location.state.isRegroup === true &&
        user?.displayName
      ) {
        setCreatorUserName(user.displayName);
      } else {
        setCreatorUserName(gizData.creatorUserName);
      }
      setGizId(gizData.id);
      setTitle(gizData.title || "");
      setDescription(gizData.description || "");
      // Create dayjs objects from string
      const timeFromStateUTC = dayjs.utc(
        `${gizData.date} ${gizData.time}`,
        "MMMM D, YYYY HH:mm"
      );
      const timeFromStateLocal = timeFromStateUTC.local();

      if (!location.state.isRegroup && !location.state.isRegroup === true) {
 
        setTime(timeFromStateLocal);
        setDate(timeFromStateLocal);
      } // This is now in local time


      const updatedUsers = gizData.invitedUsers.map((userData) => ({
        ...userData,
        status: userData.userName === user?.displayName ? "creator" : "invited",
      }));
      if (location.state.isRegroup && location.state.isRegroup === true) {
        setUserData(updatedUsers);
      } else {
        setUserData(gizData.invitedUsers);
      } // This is now in local time

      console.log(userData);
      setIsLoading(false); // Set loading to false
    }
  }, [gizData]);
  useEffect(() => {
    if (data?.gizCompleteQuery) {
      setGizCompleteData(data.gizCompleteQuery);
    }
  }, [data]);
  useEffect(() => {
    // setGizData(location.state.gizComplete);
    if (data?.gizCompleteQuery) {
      setGizCompleteData(data.gizCompleteQuery);
      setGizId(location.state.gizComplete.id);
      console.log(location.state);
      console.log("MONSTER");
    }
  }, [location.state.gizComplete, location, gizData, data]);

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
    const userDateTimeUTC = dayjs(
      `${date.format("YYYY-MM-DD")}T${time.format("HH:mm")}`
    ).utc();

    const formattedTime = userDateTimeUTC.format("HH:mm");
    const formattedDate = userDateTimeUTC.format("MMMM D, YYYY");
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
            creatorUserName: user.displayName,
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
        fetchPolicy: "network-only",
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
      setUserData((prevUserData) => {
        // Add the new user if not already in the list
        if (
          !prevUserData.some(
            (user) => user.userId === userPublicData.userPublicQuery.userId
          )
        ) {
          return [...prevUserData, userPublicData.userPublicQuery];
        }
        return prevUserData;
      });
      setUserName("");

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
  const handleGizDelete = async () => {
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

  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: "-1.5%",
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.04,
    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  if (isLoading) {
    return (
      <div className={styles.editSite}>
        <Header />
      </div>
    ); // Or any other loading indicator
  }

  return (
    <div className={styles.editSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <motion.div
        className={styles.giz}
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
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
              <motion.button
                className={styles.confirmChangeGizButton}
                onClick={handleCreateGiz}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
              >
                <b className={styles.confirmGizButton}>CONFIRM CHANGE</b>
              </motion.button>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <motion.button
                className={styles.cancelButton}
                onClick={handleGizDelete}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
              >
                <b className={styles.confirmGizButton}>DELETE</b>
              </motion.button>
              <motion.button
                className={styles.cancelButton}
                onClick={onCancelButtonClick}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
              >
                <b className={styles.confirmGizButton}>CANCEL</b>
              </motion.button>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </motion.div>
    </div>
  );
};
export default EditSite;
