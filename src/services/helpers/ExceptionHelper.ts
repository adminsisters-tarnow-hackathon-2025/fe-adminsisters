import { ExceptionMessage, ExternalException } from "@/types/models";
import { AxiosError } from "axios";

interface NotifyFunctions {
  error: (message: string) => void;
}

export function exceptionHelper(notify?: NotifyFunctions) {
  function showExceptionMessage(
    error: AxiosError,
    message: string,
    additionalInternalMessage?: string
  ) {
    if (!error.response) {
      return;
    }
    if (isExceptionMessage(error.response?.data)) {
      if (notify) {
        notify.error(error.response.data.description);
      } else {
        console.log("Exception message:", error.response.data);
      }
      return;
    }

    if (isExternalException(error.response?.data)) {
      const internalMessage = additionalInternalMessage
        ? additionalInternalMessage
        : "";
      if (notify) {
        notify.error(
          error.response.data.error.description + " " + internalMessage
        );
      } else {
        console.log(
          "External exception:",
          error.response.data.error.description,
          internalMessage
        );
      }
      return;
    }
    if (notify) {
      notify.error(message);
    } else {
      console.log(
        "Unknown error format:",
        error.response.data,
        message,
        additionalInternalMessage
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isExceptionMessage(obj: any): obj is ExceptionMessage {
    return typeof obj.title === "string" && typeof obj.description === "string";
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isExternalException(obj: any): obj is ExternalException {
    return (
      typeof obj.error?.description === "string" &&
      typeof obj.error?.message === "string"
    );
  }

  return {
    showExceptionMessage,
  };
}
