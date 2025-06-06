import { axiosRequest } from "@/hooks/useAxios";
import { CreateEvent, Event } from "./types";
import { ResultObject } from "@/types/models";

export async function getEventsAsync() {
  return await axiosRequest<ResultObject<Event[]>, void>({
    url: "/api/events",
    method: "GET",
    defaultErrorMessage: "Nie udało się pobrać wydarzeń.",
  });
}

export async function createEventAsync(data: CreateEvent) {
  return await axiosRequest<void, CreateEvent>({
    url: `/api/events`,
    method: "POST",
    data,
    defaultErrorMessage: "Nie udało się utworzyć wydarzenia.",
  });
}

export async function getEventByIdAsync(id: string) {
  return await axiosRequest<ResultObject<Event>, void>({
    url: `/api/events/${id}`,
    method: "GET",
    defaultErrorMessage: "Nie udało się pobrać wydarzenia.",
  });
}

export async function deleteEventAsync(id: string) {
  return await axiosRequest<void, void>({
    url: `/api/events/${id}`,
    method: "DELETE",
    defaultErrorMessage: "Nie udało się usunąć wydarzenia.",
  });
}
