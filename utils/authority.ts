import { UserInfo } from "@/@types";
import { v4 as uuidv4 } from "uuid";
// 获取用户信息
export function getUserInfo(): UserInfo {
  const userinfo = localStorage.getItem("_u");
  if (!userinfo) {
    // userinfo = { uid: uuidv4() };
    const u = { uid: uuidv4() };
    setUserInfo(u);
    return u;
  }
  try {
    return JSON.parse(userinfo);
  } catch (e) {
    return {};
  }
}
// 设置用户信息
export function setUserInfo(userinfo: UserInfo) {
  return localStorage.setItem("_u", JSON.stringify(userinfo));
}
// 清除用户信息
export function clearUserInfo() {
  return localStorage.removeItem("_u");
}
