import axios from "axios";
import { createGizType } from "./CreateApiServices";

const BASE_URL = "http://localhost:8080";

interface invitesGizData {
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface invitesUsersData {
  id: number;
  userName: string;
  profilePicture: string;
  status: string
}



export interface gizInvitesData {
  id: number,
  title: string;
  description: string;
  date: string;
  time: string;
  creatorUserName: string;
  invitedUsers: invitesUsersData[]
}

export interface getGizInvitesResponseType {
  gizData: gizInvitesData[]
}


export const getGizInvites = async (
  idToken: string,
  userName: string
): Promise<getGizInvitesResponseType> => {
  const response = await axios.get<getGizInvitesResponseType>(
    `${BASE_URL}/api/invitesSite/invitedGiz`,
    {
      params: { userName },
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};
