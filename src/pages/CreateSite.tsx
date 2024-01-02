import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./CreateSite.module.css";
import CreateGizInformationFrame from "../components/CreateSite/CreateInformationFrame";
import CreateGizUsers from "../components/CreateSite/CreateGizUsers";
import { logCurrentUser } from "../firebase/AuthFunction";
import dayjs from "dayjs";
import {
  createGizType,
  createGizUserType,
  getUserData,
} from "../apiServices/CreateApiServices";
import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UserPublic } from "../apiServices/Apollo/Types";
import { CREATE_GIZ_AND_GIZ_USERS_MUTATION } from "../apiServices/Apollo/Mutations";
import { USER_PUBLIC_QUERY } from "../apiServices/Apollo/Querys";
import { motion } from "framer-motion";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const CreateSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onCancelButtonClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  logCurrentUser();

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<dayjs.Dayjs>(dayjs());
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<UserPublic[]>([]);
  const { idToken } = useAuth();
  const auth = getAuth();

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const user = auth.currentUser;
  function checkIfUserAlreadyAdded() {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].userName === userName) {
        console.log("User already added:", userName);
        return true;
      }
    }
    console.log("User not in list, adding:", userName);
    return false;
  }

  // Initialize the mutation with Apollo Client
  const [createGizAndGizUsersMutation, { loading, error }] = useMutation(
    CREATE_GIZ_AND_GIZ_USERS_MUTATION
  );

  const handleCreateGiz = async () => {
    const userDateTime = dayjs(
      `${date.format("YYYY-MM-DD")}T${time.format("HH:mm")}`
    );

    // Convert to UTC
    const userDateTimeUTC = userDateTime.utc();

    // Format date and time
    const formattedDate = userDateTimeUTC.format("MMMM D, YYYY"); // Date in "MMMM D, YYYY" format
    const formattedTime = userDateTimeUTC.format("HH:mm"); // Time in "HH:mm" format


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
      // Execute the mutation
      const { data } = await createGizAndGizUsersMutation({
        variables: {
          gizData: {
            title,
            description,
            date: formattedDate,
            time: formattedTime,
          },
          creatorUserName: user?.displayName,
          invitedUsersId: userData.map((user) => user.userId),
        },
      });

      navigate("/status-site");
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
        fetchPolicy: "network-only", // Always fetch fresh data
      });
      
      setRefreshUserData((prev) => !prev);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  // Handling the received data
  useEffect(() => {
    if (userPublicData) {
      setUserData(prevUserData => {
        // Add the new user if not already in the list
        if (!prevUserData.some(user => user.userId === userPublicData.userPublicQuery.userId)) {
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
      transition: {
        duration: 0.2,
      },
    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  return (
    <div className={styles.createSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options activeTab={"CREATE"} />
      <motion.div
        className={styles.giz}
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
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
            userNameRef={userNameRef}
            userName={userName}
            setUserName={setUserName}
            addUser={addUser}
            userData={userData}
            setUserData={setUserData}
          />
          <div className={styles.createOrCancel}>
            <div className={styles.createGizButtonFrame}>
              <motion.button
                className={styles.createGizButton}
                onClick={handleCreateGiz}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
              >
                <div className={styles.createGizButtonContainer}>
                  <b className={styles.create}>CREATE</b>
                  <b className={styles.create}>GIZ</b>
                </div>
              </motion.button>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <motion.button
                className={styles.cancelButton}
                onClick={onCancelButtonClick}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
              >
                <b className={styles.cancelButtonT}>CANCEL</b>
              </motion.button>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </motion.div>
    </div>
  );
};

export default CreateSite;
