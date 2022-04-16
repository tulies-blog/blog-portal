import httpClient from "./httpClient";
import { ApiResponse, PaginationResult } from "../@types/index";
export interface CommentTopic {
  id: number;
  tid: string;
  title: string;
  url: string;
  type: string;
  repliedCount: number;
  checkMode: number;
  status: number;
}
export interface CommentReply {
  id: number;
  tid: string;
  content: string;
  /** 层级 */
  grade: number;
  checkStatus: number;
  status: number;
  userid: string;
  username: string;
  email: string;
  website: string;
  diggCount: number;
  parentid: number;
  rootid: number;
  createTime: string;
  updateTime: string;

  /** 评论主题 */
  topic?: CommentTopic;
  parent?: CommentReply;
  root?: CommentReply;
  replyCount?: number;
  replyList?: CommentReply[];
  // 是否点赞过
  isDigg?: number;
}
// 获取主评论
export function getCommentList(params?: Record<string, any>): Promise<ApiResponse<PaginationResult<CommentReply>>> {
  return httpClient.get("/app/comment/list", { params });
}
/**
 * 发表主评论
 * @param data Partial<CommentReply>
 * @returns
 */
export function commentPublish(data: Partial<CommentReply>): Promise<ApiResponse<CommentReply>> {
  return httpClient.post("/app/comment/publish", data);
}

/**
 * 获取子评论列表
 * @param params
 * @returns
 */
export function getReplyList(params?: Record<string, any>): Promise<ApiResponse<PaginationResult<CommentReply>>> {
  return httpClient.get("/app/reply/list", { params });
}

/**
 * 发表子评论
 * @param data Partial<CommentReply>
 * @returns
 */
export function replyPublish(data: Partial<CommentReply>): Promise<ApiResponse<CommentReply>> {
  return httpClient.post("/app/reply/publish", data);
}

/**
 * 初始化评论主题
 * @param data Partial<CommentReply>
 * @returns
 */
export function initCommentTopic(data: Partial<CommentTopic>): Promise<ApiResponse<CommentTopic>> {
  return httpClient.post("/app/comment/topic", data);
}

//文章点赞
export function commentDigg(commentId: number, isDigg: number): Promise<ApiResponse> {
  return httpClient.post(`/app/comment/digg/${commentId}/${isDigg}`);
}
