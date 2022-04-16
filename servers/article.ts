import httpClient from "./httpClient";
import { ApiResponse, PaginationResult } from "../@types/index";

// export interface ArticleInteract {
//   isDigg: number;
//   isVisit: number;
// }
export interface Article {
  id: string;
  title: string;
  description: string;
  poster: string;
  tags: string;
  categoryId: number;
  category: Category;
  content: string;
  isOriginal: number;
  isTop: number;
  pv: number;
  diggCount: number;
  isDigg: number;
  commentCount: number;
  createTime: string;
  updateTime: string;
}
export interface Category {
  [x: string]: any;
  id: number;
  name: string;
  urlName: string;
  articleCount: number;
}
export interface Tag {
  id: number;
  name: string;
  cover: string;
  articleCount: number;
}
// 文章列表查询
export function getArticleList(params?: Record<string, any>): Promise<ApiResponse<PaginationResult<Article>>> {
  return httpClient.get("/app/article/list", { params });
}
// 文章推荐
export function getRelatedList(params?: Record<string, any>): Promise<ApiResponse<Article[]>> {
  return httpClient.get("/app/article/related", { params });
}

// 文章详情
export function getArticleInfo(id: string): Promise<ApiResponse<Article>> {
  return httpClient.get(`/app/article/info/${id}`);
}
// 分类列表
export function getCategoryList(params?: Record<string, any>): Promise<ApiResponse<Category[]>> {
  return httpClient.get("/app/category/list", { params });
}
// Tag列表查询
export function getTagList(params: Record<string, any>): Promise<ApiResponse<PaginationResult<Tag>>> {
  return httpClient.get("/app/tag/list", { params });
}

// // 分类文章count
// export function getCategoryArticleCount(): Promise<ApiResponse<Category[]>> {
//   return httpClient.get("/app/category/articleCount");
// }

//文章点赞
export function articleDigg(articleId: string, isDigg: number): Promise<ApiResponse> {
  return httpClient.post(`/app/article/digg/${articleId}/${isDigg}`);
}
//文章浏览数
export function articleVisit(articleId: string): Promise<ApiResponse> {
  return httpClient.post(`/app/article/visit/${articleId}`);
}
