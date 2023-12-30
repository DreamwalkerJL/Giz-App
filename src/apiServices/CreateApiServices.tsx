import axios from "axios";

const BASE_URL = "http://localhost:8080";

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// api.interceptors.request.use(async (config) => {
//   const { idToken } = useAuth();
//   if (idToken) {
//     config.headers.Authorization = `Bearer ${idToken}`;
//   }
//   return config;
// });

export interface getUserResponseDataType {
  id: number;
  userName: string;
  profilePicture: string;
}
export interface createGizType {
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface createGizUserType {
  gizId: number;
  userId: number;
  status: string;
}

// GET User data based on Username
export const getUserData = async (
  idToken: string,
  userName: string
): Promise<getUserResponseDataType> => {
  const response = await axios.get<getUserResponseDataType>(
    `${BASE_URL}/api/createSite/userData`,
    {
      params: { userName },
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

// POST 
// create a new giz based on GizData 
// create a new gizUser based on us userName
// create multiple new gizUser based on the id from the Users which have been added(UserData)



// export const createGizAndGizUsers = async (
//   idToken: string,
//   gizData: createGizType,
//   creatorUserName: string ,
//   invitedUsersId: number[]
// ) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/createSite/createGizAndGizUsers",
//       {
//         gizData: {
//           title: gizData.title,
//           description: gizData.description,
//           date: gizData.date,
//           time: gizData.time,
//         },
//         creatorUserName: creatorUserName,
//         invitedUsersId: invitedUsersId
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// };





// POST a new Giz
// export const createGiz = async (idToken: string, title: string, description: string, date:string, time: string, ) => {
//   console.log(title, description, date, time)
//   const response = await axios.post(`${BASE_URL}/api/createSite/createGiz`, {
//     params: { title, description, date, time },
//     headers: {
//       Authorization: `Bearer ${idToken}`,
//     },
//   });
//   return response.data;
// };

// export const createGiz = async (
//   idToken: string,
//   { ...gizData }: createGizType
// ) => {
//   console.log(gizData.title, gizData.description);
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/createSite/createGiz",
//       {
//         title: gizData.title, // Firebase UID
//         description: gizData.description,
//         date: gizData.date,
//         time: gizData.time,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// };

// export const createGizUser = async (
//   idToken: string,
//   gizData: createGizUserType
// ) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/createSite/createGizUser",
//       {
//         gizId: gizData.gizId,
//         userId: gizData.userId,
//         status: gizData.status,
//         creator: gizData.creator,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error", error);
//     throw error;
//   }
// };

// GET User data based on Username
// export const getUserData = async (idToken: string, userName: getUserRequestDataType): Promise<getUserResponseDataType> => {
//     const response = await axios.post<getUserResponseDataType>(`${BASE_URL}/api/createSite/userData`, userName, {
//         headers: {
//             Authorization: `Bearer ${idToken}`
//         }
//     });
//     return response.data;
// };
