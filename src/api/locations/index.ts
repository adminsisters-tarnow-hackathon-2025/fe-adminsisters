import { axiosRequest } from "@/hooks/useAxios";
import { CreateLocation, Location, LocationWithEvents } from "./types";
import { ResultObject } from "@/types/models";

export async function createLocationAsync(data: CreateLocation) {
  return axiosRequest<void, CreateLocation>({
    url: "/api/locations",
    method: "POST",
    data,
    defaultErrorMessage: "Nie udało się utworzyć lokalizacji",
    successMessage: "Lokalizacja została utworzona pomyślnie",
  });
}

export async function getLocationsAsync() {
  return axiosRequest<ResultObject<Location[]>, void>({
    url: "/api/locations",
    method: "GET",
    defaultErrorMessage: "Nie udało się pobrać lokalizacji",
  });
}
export async function getLocationsWithEventsAsync() {
  return axiosRequest<ResultObject<LocationWithEvents[]>, void>({
    url: "/api/locations/events",
    method: "GET",
    defaultErrorMessage: "Nie udało się pobrać lokalizacji",
  });
}

export async function deleteLocationAsync(id: string) {
  return axiosRequest<void>({
    url: `/api/locations/${id}`,
    method: "DELETE",
    defaultErrorMessage: "Nie udało się usunąć lokalizacji",
    successMessage: "Lokalizacja została usunięta pomyślnie",
  });
}
