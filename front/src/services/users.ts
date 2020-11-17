import Axios from "axios";
import { APIErrorResponse } from "../shared/types/APIErrorResponse";
import { User } from "../shared/types/User";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await Axios.get(`${baseUrl}/users`);

    if (users.data?.length) {
      return users.data;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const createUser = async (
  user: User
): Promise<User | APIErrorResponse> => {
  try {
    return Axios.post(`${baseUrl}/users`, user);
  } catch (err) {
    console.error(err);

    return { success: false, message: err.message };
  }
};
