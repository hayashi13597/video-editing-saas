interface ApiErrorResponse {
  errorCode: string;
  message: string;
}

interface ApiError {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
    statusText?: string;
  };
  message?: string;
}
