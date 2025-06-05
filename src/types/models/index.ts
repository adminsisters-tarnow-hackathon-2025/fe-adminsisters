export interface AxiosResultObject<TData> {
  isError: boolean;
  errors: AxiosResultObjectError[];
  value: TData;
}

export interface AxiosResultObjectError {
  title: string;
  description: string;
}

export interface ExceptionMessage {
  title: string;
  description: string;
}

export interface ExternalError {
  code: number;
  description: string;
  message: string;
}
export interface ExternalException {
  error: ExternalError;
}

export interface ResultObject<T> {
  data: T;
}
