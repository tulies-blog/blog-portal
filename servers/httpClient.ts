import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { message } from "antd";
import { getUserInfo } from "@/utils/authority";
// import { apiConfig } from "@/configs/app.config";
// import { getUserInfo } from "@/utils/authority";
// import { ApiResponse } from "../@types";
// import { render } from '@testing-library/react'
/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status;
  /** notice text */
  let message = "Request Error";
  switch (code) {
    case 400:
      message = "Request Error";
      break;
    case 401:
      message = "登录失效，清重新登录";
      break;
    case 403:
      message = "拒绝访问";
      break;
    case 404:
      message = "访问资源不存在";
      break;
    case 408:
      message = "请求超时";
      break;
    case 500:
      message = "未知错误";
      break;
    case 501:
      message = "承载服务未实现";
      break;
    case 502:
      message = "网关错误";
      break;
    case 503:
      message = "服务暂不可用";
      break;
    case 504:
      message = "网关超时";
      break;
    case 505:
      message = "暂不支持的 HTTP 版本";
      break;
    default:
      message = "未知错误";
  }
  return message;
};

class ApiError {
  public code = 0;
  public message = "系统异常，请稍后再试";
  constructor({ code = -999, message = "系统异常，请稍后再试" }) {
    this.code = code;
    this.message = message;
  }
}
/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const service = axios.create({
  // baseURL: apiConfig.baseUrl,
  timeout: 30000,
  headers: {},
});
/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    // TODO 客户端渲染
    config.baseURL = process.env.NEXT_PUBLIC_BASE_API;
    // console.log(userinfo)
    const userinfo = getUserInfo();
    config.headers = {
      ...(config.headers || {}),
      authid: userinfo.uid || "",
    };
  } else {
    // TODO SSR渲染
    config.baseURL = process.env.BASE_API;
  }
  return config;
});

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    // console.log('response', response)
    if (response.status === 200) {
      // const responseData = response.data as ApiResponse;
      // // TODO  200状态下的一些特殊处理,暂时就只对401进行处理
      // if (responseData.code === 401) {
      //   console.error("登录凭证已过期，请重新登录");
      //   setTimeout(() => {
      //     window.location.replace("/login");
      //   });
      //   return Promise.reject(new ApiError({ message: "401: 请重新登录" }));
      // }
      return Promise.resolve(response.data);
    } else {
      // response.statusText
      const __text = getErrorCode2text(response);
      return Promise.reject(new ApiError({ message: __text }));
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    console.log("错误信息提示", error.message);
    // 错误信息的回调统一后期等api规范定好后再看怎么处理
    let errMsg: string = error.message || "";
    if (error.message) {
      errMsg = error.message;
    }
    if (error.response && error.response.status) {
      const __text = getErrorCode2text(error.response);
      errMsg = __text;
    }
    // timeout
    if (errMsg && errMsg.indexOf("timeout") >= 0) {
      errMsg = "timeout";
      console.error("请求超时");
      typeof window !== "undefined" && message.error("请求超时");
      return Promise.reject(new ApiError({ message: "接口请求超时" }));
    }

    if (error?.response?.status === 401) {
      // TODO 这边跳转登录页面
      // typeof window !== 'undefined' && message.error("登录凭证已过期，请重新登录");
      // setTimeout(() => {
      //   window.location.replace("/login");
      // });
      return Promise.reject(new ApiError({ message: "401: 请重新登录" }));
    }
    const apiError = new ApiError({ message: errMsg });
    console.error(apiError.message);
    typeof window !== "undefined" && message.error(apiError.message);
    return Promise.reject(apiError);
  }
);

// TODO 暂时我们不做扩展，直接返回axios对象
export default service;
