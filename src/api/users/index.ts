import { axiosRequest } from "@/hooks/useAxios";
import { API_PATH } from "../utils";
import { User } from "./types";

export async function getUsersAsync() {
  return axiosRequest<void, User[]>({
    url: `${API_PATH}/users`,
    method: "GET",
    defaultErrorMessage: "Failed to fetch users",
  });
}
