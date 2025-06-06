import { axiosRequest } from "@/hooks/useAxios";
import { CreateLocation, Location, LocationWithEvents } from "./types";
import { ResultObject } from "@/types/models";

export async function createLocationAsync(data: CreateLocation) {
  return axiosRequest<void, CreateLocation>({
    url: "/api/locations",
    method: "POST",
    data,
    defaultErrorMessage: "Failed to create location",
    successMessage: "Location created successfully",
  });
}

export async function getLocationsAsync() {
  return axiosRequest<ResultObject<Location[]>, void>({
    url: "/api/locations",
    method: "GET",
    defaultErrorMessage: "Failed to fetch locations",
    successMessage: "Locations fetched successfully",
  });
}
export async function getLocationsWithEventsAsync() {
  return axiosRequest<ResultObject<LocationWithEvents[]>, void>({
    url: "/api/locations/events",
    method: "GET",
    defaultErrorMessage: "Failed to fetch locations",
    successMessage: "Locations fetched successfully",
  });
}

export async function deleteLocationAsync(id: string) {
  return axiosRequest<void>({
    url: `/api/locations/${id}`,
    method: "DELETE",
    defaultErrorMessage: "Failed to delete location",
    successMessage: "Location deleted successfully",
  });
}
