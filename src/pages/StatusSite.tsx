import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Options from "../components/Options";
import styles from "./StatusSite.module.css";
import StatusGizUsers from "../components/StatusSite/StatusGizUsers";
import StatusInformationFrame from "../components/StatusSite/StatusInformationFrame";
import StatusGizButtons from "../components/StatusSite/StatusGizButtons";
import axios from "axios";
import {

  getStatusGizData,
  getStatusGizUsers,
  getStatusGizUsersData,
  StatusGizDataT,
  StatusGizUsersDataT,
  StatusGizIdsT
} from "../apiServices/StatusApiServices";
import { useAuth } from "../firebase/AuthContext";
const StatusSite: FunctionComponent = () => {
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

  // const [statusGizIds, setStatusGizIds] = useState<string[]>([]);
  const [statusGizIds, setStatusGizIds] = useState<StatusGizIdsT>();
  const [statusGizInformation, setStatusGizInformation] = useState<
    StatusGizDataT[]
  >([]);
  const [statusGizUsers, setStatusGizUsers] = useState<string[]>([]);
  const [statusGizUsersData, setStatusGizUsersData] = useState<
    StatusGizUsersDataT[]
  >([]);
  const { idToken } = useAuth();



// In your StatusSite component

// useEffect(() => {
//   const fetchData = async () => {
//     if (idToken) {
//       try {
//         const gizIds = await getStatusGizIds(idToken);
//         setStatusGizIds(gizIds);
//         console.log(gizIds)
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     }
//   };

//   fetchData();
// }, [idToken]);


          // if (gizIds.gizIds.length > 0) {
        //   setStatusGizIds(gizIds.gizIds);
        //   const gizData = await getStatusGizData(gizIds.gizIds);
        //   setStatusGizInformation(gizData);
        //   const gizUsers = await getStatusGizUsers(gizIds.gizIds);
        //   setStatusGizUsers(gizUsers.userNames);
        //   const gizUsersData = await getStatusGizUsersData(gizUsers.userNames);
        //   setStatusGizUsersData(gizUsersData);
        //   console.log(`Giz ids: ${gizIds}`);
        //   console.log(`Giz information: ${gizData}`);
        //   console.log(`Giz users: ${gizUsers}`);
        // }

  return (
    <div className={styles.statusSite}>
      <Header onMenuContainerClick={onMenuContainerClick} />
      <Options
        onOptionsStatusFrameClick={onOptionsStatusFrameClick}
        onOptionsInvitesFrameClick={onOptionsInvitesFrameClick}
      />
      <div className={styles.giz}>
        <div className={styles.gizFrame}>
          {statusGizInformation.length > 0 &&
            statusGizInformation.map((info, index) => (
              <StatusInformationFrame
                key={index}
                title={info.title}
                description={info.description}
                date={info.date}
              />
            ))}
          {statusGizUsersData.length > 0 &&
            statusGizUsersData.map((user, index) => (
              <StatusGizUsers
                key={index}
                userName={user.userName}
                profilePicture={user.profilePicture}
              />
            ))}
          <StatusGizButtons />
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};
export default StatusSite;
