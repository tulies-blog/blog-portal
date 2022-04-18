import { ApiResponse } from "@/@types";
import httpClient from "./httpClient";

// 获取微信jssdk参数
export function wxJsapiSignature(data?: Record<string, any>): Promise<ApiResponse<any>> {
  return httpClient.post("/app/wx/wxJsapiSignature", { ...data });
}
