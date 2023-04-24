import type { Post } from "lib/types/postValidator";

export interface PostsInfo {
  currentPage: number;
  totalPosts: number;
  postsFound: number;
  pageSize: number;
  startIndex: number;
  totalPages: number;
}

export interface PostsCRUD {
  postsInfo: PostsInfo;
  postsData: Post[];
  queryParams: string;
}
