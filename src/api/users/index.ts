import { axiosRequest } from "@/hooks/useAxios";
import { ResultObject } from "@/types/models";
import { User } from "./types";

export async function getUsersAsync() {
  return axiosRequest<void, ResultObject<User[]>>({
    url: "api/users",
    method: "GET",
    defaultErrorMessage: "Failed to fetch users",
  });
}
