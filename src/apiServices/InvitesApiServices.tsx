// import axios from "axios";
// import { createGizType } from "./CreateApiServices";

// const BASE_URL = "http://localhost:8080";

// export interface userPublic {
//   id: number;
//   userName: string;
//   profilePicture: string;
//   status: string;
// }

// export interface gizComplete {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   creatorUserName: string;
//   invitedUsers: userPublic[];
// }

// export interface getGizCompleteResponseType {
//   gizData: gizComplete[];
// }

// export const getGizComplete = async (
//   idToken: string,
//   userName: string
// ): Promise<gizComplete[]> => {
//   const response = await axios.get<gizComplete[]>(
//     `${BASE_URL}/api/invitesSite/invitedGiz`,
//     {
//       params: { userName },
//       headers: {
//         Authorization: `Bearer ${idToken}`,
//       },
//     }
//   );
//   return response.data;
// };
