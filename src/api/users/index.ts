import { axiosRequest } from "@/hooks/useAxios";
import { ResultObject } from "@/types/models";
import { LoginResponse, User } from "./types";

export async function getUsersAsync() {
  return axiosRequest<ResultObject<User[]>, void>({
    url: "api/users",
    method: "GET",
    defaultErrorMessage: "Failed to fetch users",
  });
}

export async function loginAsync(name: string, password: string) {
  return axiosRequest<LoginResponse, { name: string; password: string }>({
    url: "api/users/login",
    method: "POST",
    data: { name, password },
    defaultErrorMessage: "Failed to login",
  });
}
