import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCode } from '@interfaces/REST.interface';
import { toast } from 'react-toastify';
import { IResponseError } from '@interfaces/error.interface';
import { ClientEntity } from '@shared/entities/ClientEntity';
import { ClientService } from '@services/clientService';

const headers: Readonly<Record<string, string | boolean>> = {
  // Accept: 'application/json',
  // 'Content-Type': 'application/json; charset=utf-8',
  // 'access-control-allow-credentials': true,
  // 'access-control-allow-origin': '*',
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const authService = new ClientService();
    const authString = localStorage.getItem(authService.localStorageKey.add);
    const authData = JSON.parse(authString || '{}') as ClientEntity;
    const { token } = authData;

    if (token != null) {
      if (config.headers) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error);
  }
};

export class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers,
      // withCredentials: true,
    });

    http.interceptors.request.use(injectToken as any, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      },
    );

    this.instance = http;
    return http;
  }

  request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  // eslint-disable-next-line
  private handleError(error: IResponseError) {
    const { status } = error || {};
    const errorMessage = error?.data?.message || (error?.data as any)?.error;
    switch (status) {
      case StatusCode.InternalServerError: {
        console.log('error', error);
        toast(`Server: ${errorMessage}`, {
          autoClose: false,
          type: 'error',
        });
        // Handle InternalServerError
        break;
      }
      case StatusCode.NotFound: {
        toast(`Not Found: ${error.data.message || error.data}`, {
          autoClose: false,
          type: 'error',
        });
        // Handle Not Found
        break;
      }
      case StatusCode.BadRequest: {
        toast(`Bad Request: ${errorMessage}`, {
          autoClose: false,
          type: 'error',
        });
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        toast(`Forbidden: ${errorMessage}`, {
          autoClose: false,
          type: 'error',
        });
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        toast(`Unauthorized: ${errorMessage}`, {
          autoClose: false,
          type: 'error',
        });
        break;
      }
      case StatusCode.TooManyRequests:
        toast(`Too many requests: ${errorMessage}`, {
          autoClose: false,
          type: 'error',
        });
        // Handle TooManyRequests
        break;
      case StatusCode.Conflict:
        // toast(`Conflicto: ${errorMessage}`, {
        //   autoClose: false,
        //   type: 'error',
        // });
        // Handle TooManyRequests
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
