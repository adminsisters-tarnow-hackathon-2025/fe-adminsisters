import { axiosRequest } from "@/hooks/useAxios";
import { ResultObject } from "@/types/models";
import { User } from "./types";

export async function getUsersAsync() {
  return axiosRequest<ResultObject<User[]>, void>({
    url: "api/users",
    method: "GET",
    defaultErrorMessage: "Failed to fetch users",
  });
}
