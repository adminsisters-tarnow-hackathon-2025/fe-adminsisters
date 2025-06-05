import { axiosRequest } from "@/hooks/useAxios";
import { CreateLocation } from "./types";

export async function createLocationAsync(data: CreateLocation) {
  return axiosRequest<void, CreateLocation>({
    url: "/api/locations",
    method: "POST",
    data,
    defaultErrorMessage: "Failed to create location",
    successMessage: "Location created successfully",
  });
}
