import { axiosRequest } from "@/hooks/useAxios";
import { ResultObject } from "@/types/models";
import { LoginResponse, User } from "./types";
import { Event } from "../events/types";

export async function getUsersAsync() {
  return axiosRequest<ResultObject<User[]>, void>({
    url: "api/users",
    method: "GET",
    defaultErrorMessage: "Nie udało się pobrać użytkowników",
  });
}

export async function loginAsync(name: string, password: string) {
  return axiosRequest<LoginResponse, { name: string; password: string }>({
    url: "api/users/login",
    method: "POST",
    data: { name, password },
    defaultErrorMessage: "Nie udało się zalogować",
  });
}

export async function getUserEventsAsync(userId: string) {
  return axiosRequest<ResultObject<Event[]>, void>({
    url: `api/users/${userId}/events`,
    method: "GET",
    defaultErrorMessage: "Nie udało się pobrać wydarzeń użytkownika",
  });
}
