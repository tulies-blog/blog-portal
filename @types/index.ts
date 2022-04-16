import { AxiosRequestConfig } from "axios";

// 接口响应通用格式
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  [key: string]: any;
}
export interface PaginationResult<T = any> {
  list: T[];
  total: number;
  pageSize: number;
  pageNum: number;
  totalPage?: number;
  [key: string]: any;
}
export interface BlobFileResult {
  fileName?: string;
  blob: Blob;
  [key: string]: any;
}

interface ApiRequestHeaders {
  powercode?: string;
  subpower?: string;
  [key: string]: any;
}

export interface ApiRequestConfig extends Omit<AxiosRequestConfig, "headers"> {
  headers?: ApiRequestHeaders;
}
export interface SearchParams {
  pageNum?: number;
  pageSize?: number;
  [key: string]: any;
}
// 分页返回对象查询对象
// export interface Pagination {
//   total: number
//   pageSize?: number
//   pageNum?: number
//   [key: string]: any
// }

//把一个类型的属性都变为可选的
// export type Partical<T> = { [P in keyof T]?: T[P] }

export interface IGlobalRef {
  [key: string]: () => void;
}

export interface UserInfo {
  uid?: string;
}
