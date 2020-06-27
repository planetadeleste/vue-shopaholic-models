import { AxiosRequestConfig } from "axios";
import { UserModel } from "./user";

/**
 * API response
 */
export interface ApiListResponse {
  data: any[] | any;
}

export interface ApiLinksResponse {
  first: string;
  last: string;
  prev?: string;
  next?: string;
}

export interface ApiMetaResponse {
  current_page: number;
  last_page: number;
  path: string;
  per_page: number;
  total: number;
  from?: string;
  to?: string;
}

export interface ApiIndexResponse extends ApiListResponse {
  links: ApiLinksResponse[];
  meta: ApiMetaResponse[];
  status?: boolean;
}

export interface ApiConfig extends AxiosRequestConfig {
  preventAppendId?: boolean;
  loading?: boolean;
  flash?: boolean;
}

export interface ResponseError {
  error: any[];
}

export interface ResponseLogin {
  expires_in: number;
  token: string;
  user?: UserModel;
}
