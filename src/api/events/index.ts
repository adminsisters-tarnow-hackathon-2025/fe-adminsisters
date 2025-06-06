import { axiosRequest } from "@/hooks/useAxios";
import { CreateEvent, Event } from "./types";
import { ResultObject } from "@/types/models";

export async function getEventsAsync() {
  return await axiosRequest<ResultObject<Event[]>, void>({
    url: "/api/events",
    method: "GET",
    defaultErrorMessage: "Failed to fetch events.",
  });
}

export async function createEventAsync(data: CreateEvent) {
  return await axiosRequest<void, CreateEvent>({
    url: `/api/events`,
    method: "POST",
    data,
    defaultErrorMessage: "Failed to create event.",
  });
}

export async function getEventByIdAsync(id: string) {
  return await axiosRequest<ResultObject<Event>, void>({
    url: `/api/events/${id}`,
    method: "GET",
    defaultErrorMessage: "Failed to fetch event.",
  });
}

export async function deleteEventAsync(id: string) {
  return await axiosRequest<void, void>({
    url: `/api/events/${id}`,
    method: "DELETE",
    defaultErrorMessage: "Failed to delete event.",
  });
}
