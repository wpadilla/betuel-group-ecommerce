import { IServiceMethodProperties } from '@services/BaseService';
import { IResponseError } from '@interfaces/error.interface';

export type CallbackType<T> = (data?: T | T[], isCached?: boolean) => void;
export type HandleErrorType = (error: IResponseError) => any;
export interface AbstractBaseService<T> {
  get: (
    properties: IServiceMethodProperties<T>,
    callBack: CallbackType<T>,
    handleError: HandleErrorType,
    enableCache?: boolean,
    cacheLifeTime?: number
  ) => {};
  add: (
    data: T,
    properties: IServiceMethodProperties<T>,
    handleError: HandleErrorType,
    enableCache?: boolean,
    cacheLifeTime?: number
  ) => {};
  update: (
    data: { _id: string } & Partial<T>,
    handleError: HandleErrorType,
    enableCache?: boolean,
    cacheLifeTime?: number
  ) => {};
  remove: (
    id: string,
    handleError: HandleErrorType,
    enableCache?: boolean,
    cacheLifeTime?: number
  ) => {};
}
