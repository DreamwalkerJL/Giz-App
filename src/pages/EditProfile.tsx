import { FunctionComponent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./EditProfile.module.css";
import { useMutation } from "@apollo/client";

import { allPps } from "../components/AllPps";
import { useAuth } from "../firebase/AuthContext";
import { CHANGE_PP_MUTATION } from "../apiServices/Apollo/Mutations";
import { motion } from "framer-motion";
import { useGizData } from "../components/GizDataContext";
import { toast } from "react-toastify";

const EditProfile: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMenuContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const onCreateGizButton1Click = useCallback(() => {
    navigate("/status-site");
  }, [navigate]);

  const onCancelButtonContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const { gizCompleteData, loading, error, refetchGizData } = useGizData();

  const [
    changePp,
    { loading: changePpLoading, error: changePpError, data: changePpResponse },
  ] = useMutation(CHANGE_PP_MUTATION);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedUsers, setSelectedUsers] = useState<number>();
  const { currentUser } = useAuth();
  const handleUserClick = (index: number) => {
    if (selectedUsers === index) {
      setSelectedUsers(undefined);
    } else {
      setSelectedUsers(index);
    }
  };

  const handleChangePp = (index: number | undefined) => {
    if (currentUser && index !== undefined) {
      // Explicitly check for undefined
      try {
        const chosenPp = allPps[index];
        changePp({
          variables: { userName: currentUser.displayName, newPp: chosenPp },
        });
        refetchGizData()
        console.log(changePpResponse);
        navigate("/status-site");
      } catch (e) {
        console.log(e);
        console.log(changePpError);
        toast.error("ERROR - please contact support");
      }
    } else {
      console.error("No new Profile Picture has been chosen");
      toast.error("No new Profile Picture has been chosen");
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.04,

    },
    pressed: {
      scale: 0.94, // Slightly smaller scale when pressed
    },
  };

  const getImagePath = (profilePicture: string) => {
    const folder = windowWidth > 800 ? 'ImageUrlsDesktop' : 'ImageUrlsMobile';
    return `public/${folder}/${profilePicture}`;
  };

  return (
    <div className={styles.editProfile}>
      <Header />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          <div className={styles.users}>
            <motion.div
              className={styles.titleT}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              CHOOSE A NEW PROFILE PICTURE
            </motion.div>
            <div className={styles.profilePictures}>
              {allPps.map((pp, index) => (
                <motion.img
                  key={index} // It's good practice to provide a unique key for each item in a list
                  className={styles.userImageIcon}
                  alt={`Profile ${index}`} // Providing a meaningful alt text
                  initial={{ opacity: 0, y: "-5%" }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    boxShadow: "0 0 20px #ffffffcc",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, delay: index * 0.05 },
                  }}
                  src={getImagePath(pp)}
                  style={{
                    border:
                      selectedUsers == index
                        ? "2px solid #72FF80"
                        : "2px solid #303030bf",
                  }}
                  onClick={() => handleUserClick(index)}
                />
              ))}
            </div>
          </div>
          <div className={styles.createOrCancel}>
            <div className={styles.createGizButtonFrame}>
              <motion.div
                className={styles.createGizButton}
                onClick={() => handleChangePp(selectedUsers)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
                initial={{ opacity: 0, y: "-15%" }}
                animate={{ opacity: 1, y: 0,  }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <b className={styles.cancelButtonT}>ACCEPT</b>
              </motion.div>
            </div>
            <div className={styles.cancelGizButtonFrame}>
              <motion.div
                className={styles.cancelButton}
                onClick={onCancelButtonContainerClick}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
                initial={{ opacity: 0, y: "-15%" }}
                animate={{ opacity: 1, y: 0,  }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <b className={styles.cancelButtonT}>CANCEL</b>
              </motion.div>
            </div>
          </div>
        </div>
        <div className={styles.space} />
      </div>
    </div>
  );
};

export default EditProfile;
