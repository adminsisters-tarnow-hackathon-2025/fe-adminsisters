import { axiosRequest } from "@/hooks/useAxios";
import { CreateEvent, Event } from "./types";

export async function getPostsAsync() {
  return await axiosRequest<Event[]>({
    url: "/api/events",
    method: "GET",
    defaultErrorMessage: "Failed to fetch events.",
  });
}

export async function createEventAsync(data: CreateEvent) {
  return await axiosRequest<void, CreateEvent>({
    url: "/api/events",
    method: "POST",
    data,
    defaultErrorMessage: "Failed to create event.",
  });
}
