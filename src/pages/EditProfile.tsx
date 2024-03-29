import { FunctionComponent, useCallback, useState } from "react";
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

  const onCancelButtonContainerClick = useCallback(() => {
    navigate("/menu-site");
  }, [navigate]);

  const { setGizCompleteData} = useGizData();

  const [
    changePp,
    {  error: changePpError},
  ] = useMutation(CHANGE_PP_MUTATION);

  const [windowWidth] = useState(window.innerWidth);
  const [selectedUsers, setSelectedUsers] = useState<number>();
  const { currentUser } = useAuth();
  const handleUserClick = (index: number) => {
    if (selectedUsers === index) {
      setSelectedUsers(undefined);
    } else {
      setSelectedUsers(index);
    }
  };


  const handleChangePp = async (index: number | undefined) => {
    if (currentUser && index !== undefined) {
      const chosenPp = allPps[index];
      try {
        const response = await changePp({
          variables: { userName: currentUser.displayName, newPp: chosenPp },
        });
  
        // Check if mutation was successful before updating the state
        if (response.data.changePpMutation.success) {
          // Update the profile picture in gizCompleteData
          setGizCompleteData(prevData => prevData.map(gizComplete => ({
            ...gizComplete,
            invitedUsers: gizComplete.invitedUsers.map(user => {
              if (user.userName === currentUser.displayName) {
                return { ...user, profilePicture: chosenPp };
              }
              return user;
            })
          })));
  
          toast.success("Profile picture updated");
          navigate("/status-site");
        } else {
          toast.error("Failed to update profile picture.");
        }
      } catch (e) {
        console.error(changePpError);
        toast.error("ERROR - Please contact support");
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

  // const getImagePath = (profilePicture: string) => {
  //   const folder = windowWidth > 800 ? 'ImageUrlsDesktop' : 'ImageUrlsMobile';
  //   return `public/${folder}/${profilePicture}`;
  // };

  const getImagePath = (profilePicture: string) => {
    const folder = windowWidth > 800 ? 'ImageUrlsDesktop' : 'ImageUrlsMobile';
    return `/${folder}/${profilePicture}`;
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
                animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, y: 0 }}
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
