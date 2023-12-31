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
import dayjs from "dayjs";
import { useAuth } from "../firebase/AuthContext";
import { getAuth } from "firebase/auth";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UserPublic } from "../apiServices/Apollo/Types";
import { CREATE_GIZ_AND_GIZ_USERS_MUTATION } from "../apiServices/Apollo/Mutations";
import { USER_PUBLIC_QUERY } from "../apiServices/Apollo/Querys";
import { motion } from "framer-motion";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onCancelButtonClick = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);


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
        toast.error("User already added");
        return true;
      }
    }
    return false;
  }

  // Initialize the mutation with Apollo Client
  const [createGizAndGizUsersMutation, { error }] = useMutation(
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

    if (!idToken || !user || !user?.displayName) {
      console.error(
        "No IdToken / Logged in User / Displayname to User assigned"
      );
      toast.error("ERROR - please contact support");
      return;
    }

    try {
      // Execute the mutation
      await createGizAndGizUsersMutation({
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
      toast.error("ERROR - please contact support");
    }
  };


  const [getUser, { data: userPublicData }] = useLazyQuery(USER_PUBLIC_QUERY);
  const [refreshUserData, setRefreshUserData] = useState(false);

  const addUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!idToken) {
      console.error("Token doesn't exist");
      toast.error("ERROR - please contact support");
      return;
    }
    if (checkIfUserAlreadyAdded()) {
      toast.error("User has already been added");
      setUserName("");
      userNameRef.current?.focus();
      return;
    }
    if (userName === user?.displayName) {
      toast.error("You cannot add yourself");
      setUserName("");
      userNameRef.current?.focus();
      return;
    }
    try {
      // Execute the query and wait for the result
      const response = await getUser({
        variables: { userName },
        fetchPolicy: "cache-and-network",
        // fetchPolicy: "network-only",
      });

      // Check if the userPublicQuery data is not null
      if (response.data && response.data.userPublicQuery !== null) {

        // Update the state or perform other actions as needed
        setRefreshUserData((prev) => !prev);
      } else {
        console.error("User does not Exist");
        toast.error("ERROR - User does not exist");
        userNameRef.current?.focus();
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      toast.error("ERROR - User does not exist");
    }
  };

  // Handling the received data
  useEffect(() => {
    // Check if userPublicData is not null and has the required structure
    if (userPublicData && userPublicData.userPublicQuery) {
      setUserData((prevUserData) => {
        // Add the new user if not already in the list
        const isUserAlreadyAdded = prevUserData.some(
          (user) => user.userId === userPublicData.userPublicQuery.userId
        );

        if (!isUserAlreadyAdded) {
          return [...prevUserData, userPublicData.userPublicQuery];
        }
        return prevUserData;
      });

      // Reset the userName and refocus the input field, if applicable
      setUserName("");
      userNameRef.current?.focus();
    }

    // Handle errors
    if (error) {
      console.error("Error fetching user data", error);
      toast.error("ERROR - User does not exist");
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
