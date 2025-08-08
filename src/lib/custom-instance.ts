import Axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

AXIOS_INSTANCE.interceptors.request.use(
  async config => {
    // Only try to get session on client side
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
    }
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

AXIOS_INSTANCE.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (Axios.isCancel(error)) {
      console.warn("Request cancelled:", error.message);
    } else {
      console.error("Request failed:", error);
    }
    return Promise.reject(error);
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token
  }).then(({ data }) => data);

  // @ts-expect-error Adding cancel method to the promise
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
